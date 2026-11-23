/*
 * Envio dos ebooks por e-mail via endpoint próprio (api/ebook-mail.php).
 * O destinatário interno, a validação e o anti-spam ficam no servidor —
 * nada sensível é exposto no navegador. Para desligar o envio, remova a tag
 * <script> deste arquivo do index.html (o download continua funcionando).
 */
(function () {
  "use strict";

  var ENDPOINT = "api/ebook-mail.php";

  // lead: { nome, email, telefone, idioma }; books: [{ key }]
  function send(lead, books) {
    var hp = document.getElementById("e-website");
    var body = {
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      idioma: lead.idioma === "en" ? "en" : "pt",
      ebooks: books.map(function (b) { return b.key; }),
      website: hp ? hp.value : ""
    };

    return fetch(ENDPOINT, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || j.success !== true) throw new Error(j.message || "send failed");
      });
    });
  }

  window.SummitEbookMail = { send: send };
})();
