<?php
/*
 * Templates HTML dos e-mails (layout em <table> + estilos inline,
 * compatível com Gmail, Outlook, Apple Mail, Yahoo e Hotmail).
 * Cores e tipografia seguem o site (assets/css/styles.css).
 * Não acessível pela web (api/.htaccess).
 */
declare(strict_types=1);

const EMAIL_SITE = 'https://www.summitorlando.com.br';
const EMAIL_LOGO = EMAIL_SITE . '/assets/img/logo-summit-light.png';
const EMAIL_WA   = 'https://wa.me/16893278539';
const EMAIL_IG   = 'https://www.instagram.com/summitorlando';

function e_h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/** Botão "à prova de balas" (funciona até no Outlook desktop). */
function e_button(string $href, string $label, string $bg, string $color, string $border): string
{
    return '<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate;">'
        . '<tr><td align="center" bgcolor="' . $bg . '" style="border-radius:999px;background:' . $bg . ';border:1px solid ' . $border . ';">'
        . '<a href="' . e_h($href) . '" target="_blank" style="display:inline-block;padding:14px 28px;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;font-weight:700;line-height:18px;color:' . $color . ';text-decoration:none;border-radius:999px;white-space:nowrap;">'
        . $label . '</a></td></tr></table>';
}

/** Estrutura comum: fundo, cabeçalho noturno com logo, corpo branco e rodapé. */
function e_layout(string $lang, string $preheader, string $eyebrow, string $title, string $content, string $footerNote): string
{
    $fontText = "Inter,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    $fontDisplay = "Fraunces,Georgia,'Times New Roman',serif";
    $year = date('Y');

    return '<!DOCTYPE html>
<html lang="' . ($lang === 'en' ? 'en' : 'pt-BR') . '" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>' . e_h($title) . '</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
  @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;600;700&display=swap");
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
  @media only screen and (max-width:620px){
    .container{width:100%!important}
    .px{padding-left:22px!important;padding-right:22px!important}
    .h1{font-size:26px!important;line-height:32px!important}
    .stack{display:block!important;width:100%!important;padding:0 0 12px 0!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f1f0f8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">' . e_h($preheader) . '&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f1f0f8" style="background:#f1f0f8;">
<tr><td align="center" style="padding:28px 12px;">
  <!--[if mso]><table role="presentation" width="600" border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
  <table role="presentation" class="container" width="600" border="0" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,71,.08);">

    <!-- Cabeçalho -->
    <tr><td bgcolor="#15164f" class="px" align="center" style="padding:36px 40px 34px;background:#15164f;background-image:linear-gradient(180deg,#070b26 0%,#0f1747 52%,#1c2675 100%);">
      <a href="' . EMAIL_SITE . '" target="_blank"><img src="' . EMAIL_LOGO . '" width="200" height="44" alt="Summit Rent a Car" style="display:block;width:200px;height:auto;margin:0 auto 26px;color:#ffffff;font-family:' . $fontText . ';font-size:18px;font-weight:700;"></a>
      <p style="margin:0 0 12px;font-family:' . $fontText . ';font-size:12px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d9a940;">&#10022;&nbsp; ' . e_h($eyebrow) . ' &nbsp;&#10022;</p>
      <h1 class="h1" style="margin:0;font-family:' . $fontDisplay . ';font-size:30px;line-height:38px;font-weight:600;color:#ffffff;">' . $title . '</h1>
    </td></tr>
    <!-- Faixa dourada -->
    <tr><td height="4" bgcolor="#d9a940" style="height:4px;line-height:4px;font-size:0;background:#d9a940;background-image:linear-gradient(90deg,#f3dc9a,#d9a940 55%,#c0912c);">&nbsp;</td></tr>

    <!-- Conteúdo -->
    <tr><td class="px" style="padding:36px 40px 12px;font-family:' . $fontText . ';font-size:16px;line-height:26px;color:#121733;">
      ' . $content . '
    </td></tr>

    <!-- Rodapé -->
    <tr><td bgcolor="#070b26" class="px" align="center" style="padding:28px 40px;background:#070b26;font-family:' . $fontText . ';">
      <p style="margin:0 0 6px;font-family:' . $fontDisplay . ';font-size:18px;font-weight:600;color:#f1dca6;">Summit Rent a Car</p>
      <p style="margin:0 0 14px;font-size:13px;line-height:20px;color:#a9acc7;">Orlando, Florida &middot; ' . ($lang === 'en' ? 'Service in Portuguese and English' : 'Atendimento 100% em português') . '</p>
      <p style="margin:0 0 16px;font-size:13px;">
        <a href="' . EMAIL_SITE . '" target="_blank" style="color:#d9a940;text-decoration:none;font-weight:600;">summitorlando.com.br</a>
        <span style="color:#3b3f66;">&nbsp;|&nbsp;</span>
        <a href="' . EMAIL_IG . '" target="_blank" style="color:#d9a940;text-decoration:none;font-weight:600;">Instagram</a>
        <span style="color:#3b3f66;">&nbsp;|&nbsp;</span>
        <a href="' . EMAIL_WA . '" target="_blank" style="color:#d9a940;text-decoration:none;font-weight:600;">WhatsApp</a>
      </p>
      <p style="margin:0;font-size:11px;line-height:17px;color:#6d7196;">' . $footerNote . '<br>&copy; ' . $year . ' Ride Pro Solutions Corp.</p>
    </td></tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>';
}

/**
 * E-mail para o cliente com os links dos ebooks.
 * @param array<int,array{title:string,file:string}> $books
 */
function email_ebook_client(string $lang, string $nome, array $books): string
{
    $en = $lang === 'en';
    $first = e_h(explode(' ', $nome)[0]);
    $font = "Inter,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    $fontDisplay = "Fraunces,Georgia,'Times New Roman',serif";

    $cards = '';
    foreach ($books as $b) {
        $url = EMAIL_SITE . '/assets/ebooks/' . rawurlencode($b['file']);
        $cards .= '
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:0 0 14px;border:1px solid #e7e4ef;border-radius:14px;background:#fbf9f4;">
        <tr>
          <td width="64" valign="middle" align="center" style="padding:18px 0 18px 18px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>
              <td width="48" height="48" align="center" valign="middle" bgcolor="#15164f" style="width:48px;height:48px;border-radius:12px;background:#15164f;background-image:linear-gradient(135deg,#15164f,#2c3fa0);font-size:24px;line-height:48px;">&#128214;</td>
            </tr></table>
          </td>
          <td valign="middle" style="padding:18px 16px;font-family:' . $font . ';">
            <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94701f;">' . ($en ? 'Ebook &middot; PDF' : 'Ebook &middot; PDF') . '</p>
            <p style="margin:0;font-family:' . $fontDisplay . ';font-size:18px;line-height:24px;font-weight:600;color:#15164f;">' . e_h($b['title']) . '</p>
          </td>
          <td valign="middle" align="right" class="stack" style="padding:18px 18px 18px 0;">
            ' . e_button($url, $en ? 'Download &darr;' : 'Baixar &darr;', '#d9a940', '#1d1503', '#c0912c') . '
          </td>
        </tr>
      </table>';
    }

    $perks = $en
        ? [['&#128172;', 'Service in Portuguese'], ['&#128737;', 'Insurance included'], ['&#128663;', 'No deposit']]
        : [['&#128172;', 'Atendimento em português'], ['&#128737;', 'Seguro incluso'], ['&#128663;', 'Sem caução']];
    $perkCells = '';
    foreach ($perks as $p) {
        $perkCells .= '<td class="stack" width="33%" align="center" valign="top" style="padding:0 6px;">
          <p style="margin:0 0 6px;font-size:24px;line-height:28px;">' . $p[0] . '</p>
          <p style="margin:0;font-family:' . $font . ';font-size:13px;line-height:18px;font-weight:600;color:#15164f;">' . $p[1] . '</p>
        </td>';
    }

    $content = '
      <p style="margin:0 0 22px;">' . ($en
            ? 'Your Orlando trip just got easier. Here are the guides you requested &mdash; tap to download and take them with you:'
            : 'Sua viagem para Orlando acabou de ficar mais fácil. Aqui estão os guias que você pediu &mdash; é só tocar para baixar e levar com você:') . '</p>
      ' . $cards . '

      <!-- Destaques -->
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:26px 0 8px;">
        <tr><td style="padding:22px 12px;border-radius:14px;background:#f1f0f8;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"><tr>' . $perkCells . '</tr></table>
        </td></tr>
      </table>

      <!-- CTA WhatsApp -->
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:22px 0 26px;">
        <tr><td align="center">
          <p style="margin:0 0 6px;font-family:' . $fontDisplay . ';font-size:22px;line-height:28px;font-weight:600;color:#15164f;">' . ($en ? 'Need a car in Orlando?' : 'Vai precisar de carro em Orlando?') . '</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:22px;color:#5b5e74;">' . ($en ? 'Talk to us and get a quote in minutes.' : 'Fale com a gente e receba sua cotação em minutos.') . '</p>
          ' . e_button(EMAIL_WA, ($en ? 'Talk on WhatsApp' : 'Falar no WhatsApp'), '#25d366', '#073e22', '#25d366') . '
        </td></tr>
      </table>';

    return e_layout(
        $lang,
        $en ? 'Your Orlando guides are ready to download.' : 'Seus guias de Orlando estão prontos para baixar.',
        $en ? 'A gift for your trip' : 'Presente para sua viagem',
        ($en ? 'Hi, ' : 'Olá, ') . $first . '!<br>' . ($en ? 'Your guides are here.' : 'Seus guias chegaram.'),
        $content,
        $en ? 'You received this email because you requested our ebooks on summitorlando.com.br.'
            : 'Você recebeu este e-mail porque solicitou nossos ebooks em summitorlando.com.br.'
    );
}

/** Aviso interno de novo lead. */
function email_ebook_owner(string $nome, string $email, string $telefone, string $idioma, array $bookKeys, bool $sent): string
{
    $font = "Inter,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    $rows = [
        'Nome'     => e_h($nome),
        'E-mail'   => '<a href="mailto:' . e_h($email) . '" style="color:#1f218c;font-weight:600;">' . e_h($email) . '</a>',
        'Telefone' => e_h($telefone),
        'Idioma'   => $idioma === 'en' ? 'Inglês' : 'Português',
        'Ebooks'   => e_h(implode(', ', $bookKeys)),
        'Data'     => gmdate('d/m/Y H:i') . ' UTC',
        'E-mail ao cliente' => $sent
            ? '<span style="color:#1a8a4a;font-weight:700;">&#10003; enviado</span>'
            : '<span style="color:#c0392b;font-weight:700;">&#10007; FALHOU</span>',
    ];
    $tr = '';
    foreach ($rows as $k => $v) {
        $tr .= '<tr>
          <td width="38%" style="padding:12px 14px;border-bottom:1px solid #e7e4ef;font-family:' . $font . ';font-size:13px;font-weight:700;color:#5b5e74;text-transform:uppercase;letter-spacing:.5px;">' . $k . '</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e7e4ef;font-family:' . $font . ';font-size:15px;color:#121733;">' . $v . '</td>
        </tr>';
    }
    $digits = preg_replace('/\D+/', '', $telefone);

    $content = '
      <p style="margin:0 0 18px;">Um novo visitante baixou ebooks pelo site. Dados do lead:</p>
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border:1px solid #e7e4ef;border-radius:12px;border-collapse:separate;overflow:hidden;margin:0 0 24px;">' . $tr . '</table>
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:0 0 26px;"><tr><td align="center">
        ' . e_button('https://wa.me/' . $digits, 'Chamar no WhatsApp', '#25d366', '#073e22', '#25d366') . '
      </td></tr></table>';

    return e_layout(
        'pt',
        'Novo lead: ' . $nome . ' (' . $email . ')',
        'Novo lead do site',
        e_h(explode(' ', $nome)[0]) . ' baixou seus ebooks',
        $content,
        'Aviso automático do formulário de ebooks do site. Responda este e-mail para falar direto com o lead.'
    );
}
