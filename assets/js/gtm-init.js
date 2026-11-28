/*
 * Google Consent Mode v2 + Google Tag Manager.
 * Fica em arquivo externo (e não inline no HTML) para respeitar a
 * Content-Security-Policy do .htaccess (script-src 'self', sem 'unsafe-inline').
 * Carregado de forma síncrona no <head>, antes de qualquer outro script.
 */

// Consent Mode: tudo negado por padrão até o aceite no banner
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
(function () {
  var accepted = false;
  try { accepted = localStorage.getItem('summit_consent') === 'accepted'; } catch (e) {}
  var v = accepted ? 'granted' : 'denied';
  gtag('consent', 'default', {
    analytics_storage: v,
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    functionality_storage: 'granted',
    security_storage: 'granted'
  });
})();

// Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-W9N7584C');
