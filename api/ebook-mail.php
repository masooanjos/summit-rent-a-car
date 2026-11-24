<?php
/*
 * Envio dos ebooks por e-mail (substitui o FormSubmit).
 *
 * Por que no servidor: o FormSubmit deixava o e-mail de destino exposto no JS,
 * com captcha desligado e "_cc" definido pelo visitante — qualquer pessoa podia
 * usar o endpoint para disparar e-mails (spam/phishing) em nome da Summit.
 *
 * Aqui: só aceita POST JSON do próprio site, valida tudo, limita a frequência
 * por IP e por e-mail, e os links dos ebooks são fixos (não vêm do navegador).
 */
declare(strict_types=1);

// ===================== CONFIGURAÇÃO =====================
// Dados de e-mail (SMTP, remetente e destinatário dos leads): api/mail-config.php
require __DIR__ . '/mailer.php';
$MAILER = SummitMailer::fromConfigFile();

const SITE_URL       = 'https://www.summitorlando.com.br';
const ALLOWED_HOSTS  = ['www.summitorlando.com.br', 'summitorlando.com.br'];
// Limites anti-abuso
const RATE_IP_MAX       = 5;      // envios por IP...
const RATE_IP_WINDOW    = 3600;   // ...por hora
const RATE_EMAIL_MAX    = 3;      // envios para o mesmo e-mail...
const RATE_EMAIL_WINDOW = 86400;  // ...por dia
const MAX_BODY_BYTES    = 4096;

const EBOOKS = [
    'guia-de-bolso-orlando' => [
        'pt' => ['title' => 'Guia de Bolso: O que fazer em Orlando?', 'file' => 'guia-de-bolso-orlando.pdf'],
        'en' => ['title' => 'Pocket Guide: What to do in Orlando?', 'file' => 'orlando-pocket-guide-en.pdf'],
    ],
];
// ========================================================

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

function respond(int $code, bool $ok, string $msg = ''): void
{
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}

function host_of(string $url): string
{
    $h = parse_url($url, PHP_URL_HOST);
    return is_string($h) ? strtolower($h) : '';
}

function rate_ok(string $bucket, int $max, int $window): bool
{
    $dir = __DIR__ . '/.data';
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0700, true)) {
            return true;
        }
        @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    }
    $file = $dir . '/' . hash('sha256', $bucket) . '.json';
    $fp = @fopen($file, 'c+');
    if (!$fp) {
        return true;
    }
    flock($fp, LOCK_EX);
    $data = json_decode((string) stream_get_contents($fp), true);
    $now = time();
    $data = array_values(array_filter(is_array($data) ? $data : [], function ($t) use ($now, $window) {
        return is_int($t) && $t > $now - $window;
    }));
    $ok = count($data) < $max;
    if ($ok) {
        $data[] = $now;
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    // Limpeza ocasional de registros antigos
    if (mt_rand(1, 50) === 1) {
        foreach (glob($dir . '/*.json') ?: [] as $f) {
            if (@filemtime($f) < $now - RATE_EMAIL_WINDOW) {
                @unlink($f);
            }
        }
    }
    return $ok;
}

function clean_text($v, int $max): string
{
    if (!is_string($v)) {
        return '';
    }
    $v = preg_replace('/[\x00-\x1F\x7F\x{200B}-\x{200F}\x{202A}-\x{202E}]+/u', ' ', $v);
    if ($v === null) {
        return ''; // UTF-8 inválido
    }
    $v = trim((string) preg_replace('/\s+/u', ' ', $v));
    return mb_strlen($v, 'UTF-8') > $max ? '' : $v;
}

function send_mail(string $to, string $subject, string $body, string $replyTo = ''): bool
{
    global $MAILER;
    return $MAILER->send($to, $subject, $body, $replyTo);
}

// ---------- 1. Método, origem e formato ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed');
}

$selfHost = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin === '') {
    $origin = (string) ($_SERVER['HTTP_REFERER'] ?? '');
}
$originHost = host_of($origin);
if ($originHost === '' || ($originHost !== $selfHost && !in_array($originHost, ALLOWED_HOSTS, true))) {
    respond(403, false, 'Forbidden');
}

if (stripos((string) ($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) {
    respond(415, false, 'Unsupported media type');
}

$raw = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($raw) > MAX_BODY_BYTES) {
    respond(413, false, 'Payload too large');
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, false, 'Invalid request');
}

// ---------- 2. Honeypot (robôs preenchem o campo invisível) ----------
if (!empty($in['website'])) {
    respond(200, true);
}

// ---------- 3. Validação ----------
$nome     = clean_text($in['nome'] ?? '', 80);
$email    = clean_text($in['email'] ?? '', 120);
$telefone = clean_text($in['telefone'] ?? '', 30);
$idioma   = (($in['idioma'] ?? '') === 'en') ? 'en' : 'pt';
$keys     = is_array($in['ebooks'] ?? null) ? $in['ebooks'] : [];

$errors = [];
if (!preg_match("/^[\\p{L}\\p{M}' .-]{2,80}$/u", $nome)) {
    $errors[] = 'nome';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if (!preg_match('/^[0-9+()\-. ]{6,30}$/', $telefone) || preg_match_all('/\d/', $telefone) < 6) {
    $errors[] = 'telefone';
}
$books = [];
foreach ($keys as $k) {
    if (is_string($k) && isset(EBOOKS[$k]) && !isset($books[$k])) {
        $books[$k] = EBOOKS[$k][$idioma];
    }
}
if (!$books) {
    $errors[] = 'ebooks';
}
if ($errors) {
    respond(422, false, 'Invalid fields: ' . implode(',', $errors));
}

// ---------- 4. Limite de frequência ----------
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (!rate_ok('ip|' . $ip, RATE_IP_MAX, RATE_IP_WINDOW)
    || !rate_ok('email|' . strtolower($email), RATE_EMAIL_MAX, RATE_EMAIL_WINDOW)) {
    respond(429, false, 'Too many requests');
}

// ---------- 5. Envio ----------
$links = '';
foreach ($books as $b) {
    $links .= '• ' . $b['title'] . "\n  " . SITE_URL . '/assets/ebooks/' . rawurlencode($b['file']) . "\n\n";
}

if ($idioma === 'en') {
    $subject = 'Your Summit Rent a Car ebooks';
    $body = "Hi, {$nome}!\n\nHere are the ebooks you asked for. Just open the links below to download them:\n\n"
        . $links
        . "Need a car in Orlando? Talk to us on WhatsApp: https://wa.me/16893278539\n\n"
        . "Summit Rent a Car\n" . SITE_URL . "\n";
} else {
    $subject = 'Seus ebooks da Summit Rent a Car';
    $body = "Olá, {$nome}!\n\nAqui estão os ebooks que você pediu. É só abrir os links abaixo para baixar:\n\n"
        . $links
        . "Vai precisar de carro em Orlando? Fale com a gente no WhatsApp: https://wa.me/16893278539\n\n"
        . "Summit Rent a Car\n" . SITE_URL . "\n";
}

$sent = send_mail($email, $subject, $body);

$ownerBody = "Novo lead de ebook pelo site\n\n"
    . "Nome: {$nome}\nE-mail: {$email}\nTelefone: {$telefone}\nIdioma: {$idioma}\n"
    . 'Ebooks: ' . implode(', ', array_keys($books)) . "\n"
    . 'Data: ' . gmdate('Y-m-d H:i:s') . " UTC\n"
    . 'E-mail ao cliente: ' . ($sent ? 'enviado' : 'FALHOU') . "\n";
$owner = $MAILER->get('owner_email');
if ($owner !== '') {
    send_mail($owner, 'Novo lead de ebook - ' . $nome, $ownerBody, $email);
}

if (!$sent) {
    respond(502, false, 'Mail failed');
}
respond(200, true);

