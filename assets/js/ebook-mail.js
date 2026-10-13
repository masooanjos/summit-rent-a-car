/*
 * Envio dos ebooks por e-mail — TESTE via FormSubmit (https://formsubmit.co).
 * Tudo o que diz respeito ao e-mail fica neste arquivo. Para trocar de serviço,
 * basta reescrever SummitEbookMail.send; para desligar o envio, remova a tag
 * <script> deste arquivo do index.html (o formulário continua salvando o lead).
 */
(function () {
  "use strict";

  var ENDPOINT = "https://formsubmit.co/ajax/masooanjos@gmail.com";
  var PDF_DIR = "assets/ebooks/";

  // lead: { nome, email, telefone, idioma }; books: [{ key, title }]
  function send(lead, books) {
    var en = lead.idioma === "en";
    var body = {
      _subject: en ? "Your Summit Rent a Car ebooks" : "Seus ebooks da Summit Rent a Car",
      _template: "box",
      _captcha: "false",
      _cc: lead.email
    };
    body[en ? "Message" : "Mensagem"] = en
      ? "Hi, " + lead.nome + "! Here are the ebooks you asked for. Just open the links below to download them."
      : "Olá, " + lead.nome + "! Aqui estão os ebooks que você pediu. É só abrir os links abaixo para baixar.";
    books.forEach(function (b) {
      body[b.title] = new URL(PDF_DIR + b.key + ".pdf", document.baseURI).href;
    });
    body[en ? "Name" : "Nome"] = lead.nome;
    body["E-mail"] = lead.email;
    body[en ? "Phone" : "Telefone"] = lead.telefone;

    return fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (String(j.success) !== "true") throw new Error(j.message || "send failed");
    });
  }

  window.SummitEbookMail = { send: send };
})();
