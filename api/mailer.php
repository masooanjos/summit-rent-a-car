<?php
/*
 * Envio de e-mail da Summit: SMTP autenticado (sem dependências externas),
 * com fallback para o mail() do PHP enquanto o SMTP não estiver configurado.
 *
 * As configurações ficam em api/mail-config.php (veja mail-config.example.php).
 * Este arquivo não é acessível pela web (api/.htaccess).
 */
declare(strict_types=1);

final class SummitMailer
{
    private const PLACEHOLDER = 'COLOQUE_';

    /** @var array<string,mixed> */
    private array $cfg;
    /** @var resource|null */
    private $sock = null;
    private string $lastError = '';

    /** @param array<string,mixed> $cfg */
    public function __construct(array $cfg)
    {
        $this->cfg = $cfg;
    }

    /** Carrega api/mail-config.php (ou o exemplo, se ainda não existir). */
    public static function fromConfigFile(): self
    {
        $file = __DIR__ . '/mail-config.php';
        if (!is_file($file)) {
            error_log('[summit-mail] api/mail-config.php não encontrado - usando mail-config.example.php');
            $file = __DIR__ . '/mail-config.example.php';
        }
        $cfg = require $file;
        return new self(is_array($cfg) ? $cfg : []);
    }

    public function get(string $key, string $default = ''): string
    {
        $v = $this->cfg[$key] ?? $default;
        return is_string($v) ? $v : $default;
    }

    public function lastError(): string
    {
        return $this->lastError;
    }

    /** @return array<string,mixed> */
    public function rawConfig(): array
    {
        return $this->cfg;
    }

    /** SMTP selecionado e com credenciais preenchidas. */
    public function smtpReady(): bool
    {
        $s = $this->cfg['smtp'] ?? [];
        if (($this->cfg['transport'] ?? 'smtp') !== 'smtp' || !is_array($s)) {
            return false;
        }
        foreach (['host', 'username', 'password'] as $k) {
            $v = (string) ($s[$k] ?? '');
            if ($v === '' || strpos($v, self::PLACEHOLDER) === 0) {
                return false;
            }
        }
        return true;
    }

    public function send(string $to, string $subject, string $body, string $replyTo = ''): bool
    {
        $this->lastError = '';
        $from = $this->get('from_email');
        if (!$this->validAddr($to) || !$this->validAddr($from) || ($replyTo !== '' && !$this->validAddr($replyTo))) {
            $this->lastError = 'endereço de e-mail inválido';
            return false;
        }

        if ($this->smtpReady()) {
            try {
                $ok = $this->sendSmtp($to, $subject, $body, $replyTo);
            } catch (\Throwable $e) {
                $this->lastError = 'exceção: ' . $e->getMessage();
                $ok = false;
            }
            $this->close();
            if (!$ok) {
                error_log('[summit-mail] SMTP falhou: ' . $this->lastError);
            }
            return $ok;
        }

        if (($this->cfg['transport'] ?? 'smtp') === 'smtp') {
            error_log('[summit-mail] SMTP não configurado em api/mail-config.php - usando mail() do PHP');
        }
        return $this->sendNative($to, $subject, $body, $replyTo);
    }

    // ------------------------------------------------------------------

    private function validAddr(string $a): bool
    {
        return $a !== '' && !preg_match('/[\r\n<>]/', $a) && filter_var($a, FILTER_VALIDATE_EMAIL) !== false;
    }

    private function fromHeader(): string
    {
        return mb_encode_mimeheader($this->get('from_name', 'Summit Rent a Car'), 'UTF-8', 'B') . ' <' . $this->get('from_email') . '>';
    }

    private function domain(): string
    {
        $d = substr((string) strrchr($this->get('from_email'), '@'), 1);
        return $d !== '' ? $d : 'localhost';
    }

    private function encodedBody(string $body): string
    {
        $body = str_replace(["\r\n", "\r"], "\n", $body);
        return rtrim(chunk_split(base64_encode(str_replace("\n", "\r\n", $body)), 76, "\r\n"));
    }

    private function sendNative(string $to, string $subject, string $body, string $replyTo): bool
    {
        $headers = [
            'From: ' . $this->fromHeader(),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        if ($replyTo !== '') {
            $headers[] = 'Reply-To: ' . $replyTo;
        }
        $ok = @mail(
            $to,
            mb_encode_mimeheader($subject, 'UTF-8', 'B'),
            $this->encodedBody($body),
            implode("\r\n", $headers),
            '-f' . $this->get('from_email')
        );
        if (!$ok) {
            $this->lastError = 'mail() retornou false';
            error_log('[summit-mail] mail() falhou');
        }
        return $ok;
    }

    private function sendSmtp(string $to, string $subject, string $body, string $replyTo): bool
    {
        $s = $this->cfg['smtp'];
        $host = (string) $s['host'];
        $secure = strtolower((string) ($s['secure'] ?? 'tls'));
        $port = (int) ($s['port'] ?? ($secure === 'ssl' ? 465 : 587));
        $timeout = (int) ($s['timeout'] ?? 15);
        $verify = (bool) ($s['verify_cert'] ?? true);
        $from = $this->get('from_email');

        $ctx = stream_context_create([
            'ssl' => [
                'verify_peer' => $verify,
                'verify_peer_name' => $verify,
                'allow_self_signed' => !$verify,
                'peer_name' => $host,
                'SNI_enabled' => true,
            ]
        ]);
        $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
        $sock = @stream_socket_client($remote, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $ctx);
        if (!$sock) {
            $this->lastError = "conexão com {$remote} falhou ({$errno} {$errstr})";
            return false;
        }
        $this->sock = $sock;
        stream_set_timeout($sock, $timeout);

        if (!$this->expect(220, 'saudação')) {
            return false;
        }
        $ehlo = 'EHLO ' . $this->domain();
        if (!$this->cmd($ehlo, 250)) {
            return false;
        }

        if ($secure === 'tls') {
            if (!$this->cmd('STARTTLS', 220)) {
                return false;
            }
            $method = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                $method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            }
            if (!@stream_socket_enable_crypto($sock, true, $method)) {
                $this->lastError = 'falha ao iniciar TLS (STARTTLS)';
                return false;
            }
            if (!$this->cmd($ehlo, 250)) {
                return false;
            }
        }

        // AUTH LOGIN (as credenciais nunca vão para o log)
        if (
            !$this->cmd('AUTH LOGIN', 334)
            || !$this->cmd(base64_encode((string) $s['username']), 334, 'usuário')
            || !$this->cmd(base64_encode((string) $s['password']), 235, 'senha')
        ) {
            $this->lastError = 'autenticação SMTP recusada - confira usuário/senha. ' . $this->lastError;
            return false;
        }

        if (
            !$this->cmd('MAIL FROM:<' . $from . '>', 250)
            || !$this->cmd('RCPT TO:<' . $to . '>', [250, 251])
            || !$this->cmd('DATA', 354)
        ) {
            return false;
        }

        $headers = [
            'Date: ' . date('r'),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $this->domain() . '>',
            'From: ' . $this->fromHeader(),
            'To: <' . $to . '>',
            'Subject: ' . mb_encode_mimeheader($subject, 'UTF-8', 'B'),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        if ($replyTo !== '') {
            $headers[] = 'Reply-To: <' . $replyTo . '>';
        }
        $data = implode("\r\n", $headers) . "\r\n\r\n" . $this->encodedBody($body);
        $data = preg_replace('/^\./m', '..', $data); // dot-stuffing
        if (!$this->cmd($data . "\r\n.", 250, 'envio da mensagem')) {
            return false;
        }
        $this->write('QUIT');
        return true;
    }

    private function write(string $line): bool
    {
        return $this->sock !== null && @fwrite($this->sock, $line . "\r\n") !== false;
    }

    /** @param int|int[] $codes */
    private function cmd(string $line, $codes, string $label = ''): bool
    {
        if (!$this->write($line)) {
            $this->lastError = 'falha ao escrever no socket';
            return false;
        }
        $label = $label !== '' ? $label : strtok($line, ' :');
        return $this->expect($codes, (string) $label);
    }

    /** @param int|int[] $codes */
    private function expect($codes, string $label): bool
    {
        $resp = '';
        while ($this->sock !== null && ($l = fgets($this->sock, 1024)) !== false) {
            $resp .= $l;
            if (strlen($l) < 4 || $l[3] === ' ') {
                break;
            }
        }
        $code = (int) substr($resp, 0, 3);
        if (!in_array($code, (array) $codes, true)) {
            $this->lastError = "resposta inesperada em {$label}: " . ($resp !== '' ? trim($resp) : 'sem resposta/timeout');
            return false;
        }
        return true;
    }

    private function close(): void
    {
        if ($this->sock !== null) {
            @fclose($this->sock);
            $this->sock = null;
        }
    }
}
