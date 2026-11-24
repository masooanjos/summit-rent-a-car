<?php
/*
 * MODELO de configuração de e-mail. Copie para "mail-config.php" (mesma pasta)
 * e preencha com os dados reais. O mail-config.php fica fora do Git (.gitignore)
 * e não é acessível pela web (api/.htaccess).
 *
 * Enquanto o SMTP não estiver preenchido, o site usa o mail() do PHP.
 *
 * ---- Exemplos de servidor SMTP ----
 * HostGator (conta criada no cPanel > Contas de E-mail):
 *   host 'mail.summitorlando.com.br' | port 465 | secure 'ssl'
 *   (se der erro de certificado, use o host do servidor que aparece em
 *    cPanel > Contas de E-mail > Connect Devices, ex.: 'br123.hostgator.com.br')
 * Gmail / Google Workspace (precisa de "Senha de app", com verificação em 2 etapas):
 *   host 'smtp.gmail.com' | port 587 | secure 'tls'
 *   e o from_email deve ser o mesmo e-mail do username.
 */
return [
    // 'smtp' (recomendado) ou 'mail' (mail() do PHP)
    'transport' => 'smtp',

    'smtp' => [
        'host'        => 'mail.summitorlando.com.br',
        'port'        => 465,
        'secure'      => 'ssl',            // 'ssl' (porta 465) ou 'tls' (porta 587)
        'username'    => 'no-reply@summitorlando.com.br',
        'password'    => 'COLOQUE_A_SENHA_AQUI',
        'timeout'     => 15,               // segundos
        'verify_cert' => true,             // só mude para false se o certificado do servidor não bater com o host
    ],

    // Remetente dos e-mails (use o mesmo e-mail do username do SMTP)
    'from_email' => 'no-reply@summitorlando.com.br',
    'from_name'  => 'Summit Rent a Car',

    // Quem recebe o aviso de cada novo lead do ebook
    'owner_email' => 'masooanjos@gmail.com',
];
