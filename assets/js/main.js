(function () {
  "use strict";

  var WHATSAPP_NUMBER = "16893278539";
  var WHATSAPP_LINK = "https://wa.me/message/4N75YRONU7H5L1";

  var GTM_ID = "GTM-XXXXXXX";
  var GA4_ID = "G-XXXXXXXXXX";
  var META_PIXEL_ID = "XXXXXXXXXXXXXXX";

  function isSet(id) {
    return id && id.indexOf("XXX") === -1;
  }

  function loadGTM(id) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = document.getElementsByTagName("script")[0];
    var j = document.createElement("script");
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
    f.parentNode.insertBefore(j, f);
    var n = document.createElement("noscript");
    var ifr = document.createElement("iframe");
    ifr.src = "https://www.googletagmanager.com/ns.html?id=" + id;
    ifr.height = "0";
    ifr.width = "0";
    ifr.style.display = "none";
    ifr.style.visibility = "hidden";
    n.appendChild(ifr);
    document.body.insertBefore(n, document.body.firstChild);
  }

  function loadGA4(id) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }

  function loadMetaPixel(id) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  var CONSENT_KEY = "summit_consent";
  var analyticsStarted = false;

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
  }
  function initAnalytics() {
    if (analyticsStarted) return;
    analyticsStarted = true;
    if (isSet(GTM_ID)) loadGTM(GTM_ID);
    if (isSet(GA4_ID)) loadGA4(GA4_ID);
    if (isSet(META_PIXEL_ID)) loadMetaPixel(META_PIXEL_ID);
  }

  var consentBox = document.getElementById("consent");
  if (getConsent() === "accepted") {
    initAnalytics();
  } else if (getConsent() !== "rejected" && consentBox) {
    consentBox.hidden = false;
    document.body.classList.add("consent-open");
  }
  function closeConsent() {
    if (consentBox) consentBox.hidden = true;
    document.body.classList.remove("consent-open");
  }
  var acceptBtn = document.getElementById("consentAccept");
  var rejectBtn = document.getElementById("consentReject");
  if (acceptBtn) acceptBtn.addEventListener("click", function () { setConsent("accepted"); initAnalytics(); closeConsent(); });
  if (rejectBtn) rejectBtn.addEventListener("click", function () { setConsent("rejected"); closeConsent(); });

  function trackLead(label) {
    if (window.dataLayer) window.dataLayer.push({ event: "lead_whatsapp", cta: label });
    if (window.gtag) window.gtag("event", "generate_lead", { method: "whatsapp", cta: label });
    if (window.fbq) window.fbq("track", "Lead", { content_name: label });
  }

  function lang() { return (window.I18N && window.I18N.lang) || "pt"; }
  function tr(key) { return window.I18N ? window.I18N.t(key) : key; }
  function pick(o, base) { return lang() === "en" ? o[base + "En"] : o[base + "Pt"]; }

  var fleet = [
    { cat: "Econômico", catEn: "Economy", price: 55, tagPt: "Mais econômico", tagEn: "Best value", seats: 5, bags: 2, img: "economico-car.jpg",
      descPt: "Econômico no combustível e perfeito para a cidade e passeios do dia a dia.", descEn: "Fuel-efficient and perfect for the city and day-to-day outings." },
    { cat: "SUV", catEn: "SUV", price: 75, tagPt: "Mais procurado", tagEn: "Most popular", seats: 5, bags: 4, img: "suv-car.jpg",
      descPt: "Espaço e conforto para a família com bastante porta-malas para as compras.", descEn: "Space and comfort for the family, with plenty of trunk room for the shopping." },
    { cat: "SUV Premium", catEn: "Premium SUV", price: 99, tagPt: "Conforto extra", tagEn: "Extra comfort", seats: 7, bags: 5, img: "suv-premium-car.jpg",
      descPt: "SUV maior, com mais lugares e sofisticação para viagens em grupo.", descEn: "A larger SUV with more seats and sophistication for group trips." },
    { cat: "Premium", catEn: "Premium", price: 90, tagPt: "Experiência superior", tagEn: "Premium experience", seats: 5, bags: 3, img: "premium-car.jpg",
      descPt: "Acabamento premium e aquele toque a mais de conforto na sua viagem.", descEn: "Premium finish and that extra touch of comfort on your trip." },
    { cat: "Minivan", catEn: "Minivan", price: 95, tagPt: "Para grupos", tagEn: "For groups", seats: 7, bags: 6, img: "minivan-car.jpg",
      descPt: "Ideal para famílias grandes e muita bagagem com espaço de sobra.", descEn: "Ideal for large families and plenty of luggage with room to spare." },
    { cat: "Conversível", catEn: "Convertible", price: 110, tagPt: "Estilo", tagEn: "Style", seats: 4, bags: 2, img: "conversivel-car.jpg",
      descPt: "Para sentir o clima da Flórida com o vento no rosto e muito estilo.", descEn: "To feel the Florida vibe with the wind in your hair and a lot of style." }
  ];

  function ico(path) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  }
  var icoSeat = '<path d="M5 18v-5a2 2 0 012-2h6M7 11V6a2 2 0 012-2h4a2 2 0 012 2v9M5 18h14"/>';
  var icoBag = '<path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2M4 7h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V7z"/>';
  var icoGear = '<path d="M4 7h10M4 12h16M8 17h12M4 7l3-3M8 17l-3 3"/>';

  function waCarMessage(name, price) {
    var txt = lang() === "en"
      ? "Hi! I'm interested in renting the *" + name + "* (from $" + price + "/day) in Orlando. Could you send me availability and prices?"
      : "Olá! Tenho interesse no aluguel do carro *" + name + "* (a partir de $" + price + "/dia) em Orlando. Pode me passar disponibilidade e valores?";
    return WHATSAPP_LINK + "?text=" + encodeURIComponent(txt);
  }

  var fleetEl = document.getElementById("fleet");
  function renderFleet() {
    if (!fleetEl) return;
    fleetEl.innerHTML = "";
    fleet.forEach(function (c) {
      var name = lang() === "en" ? c.catEn : c.cat;
      var art = document.createElement("article");
      art.className = "car reveal in";
      art.innerHTML =
        '<div class="car__media">' +
          '<span class="car__tag">' + pick(c, "tag") + "</span>" +
          '<img src="assets/img/' + c.img + '" alt="' + name + ' - Summit Rent a Car Orlando" width="800" height="530" loading="lazy" decoding="async">' +
        "</div>" +
        '<div class="car__body">' +
          "<h3>" + name + "</h3>" +
          '<div class="car__meta">' +
            "<span>" + ico(icoSeat) + c.seats + " " + tr("unit_seats") + "</span>" +
            "<span>" + ico(icoBag) + c.bags + " " + tr("unit_bags") + "</span>" +
            "<span>" + ico(icoGear) + tr("trans_auto") + "</span>" +
          "</div>" +
          '<p class="car__desc">' + pick(c, "desc") + "</p>" +
          '<div class="car__price"><span class="from">' + tr("car_from") + '</span><b>$' + c.price + "</b><small>" + tr("car_day") + "</small></div>" +
          '<a class="btn btn--primary btn--block" target="_blank" rel="noopener" data-cta="car-' +
            c.cat.toLowerCase().replace(/\s+/g, "-") + '" href="' + waCarMessage(name, c.price) + '">' + tr("car_book") + " " + name + "</a>" +
        "</div>";
      fleetEl.appendChild(art);
    });
  }

  var feats = [
    { tPt: "Atendimento 100% em português", tEn: "Friendly bilingual service", dPt: "Do primeiro contato ao último dia da viagem, você é atendido no seu idioma.", dEn: "From the first contact to your last day, you're helped in your own language.",
      p: '<path d="M3 5h12v9H8l-4 4v-4H3z" /><path d="M21 9v10l-4-4h-6"/>' },
    { tPt: "Não cobramos caução", tEn: "No deposit required", dPt: "Sem bloqueio de valor alto no cartão. Menos burocracia para você viajar tranquilo.", dEn: "No large hold on your card. Less hassle so you can travel with peace of mind.",
      p: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>' },
    { tPt: "Seguro de automóvel incluso", tEn: "Car insurance included", dPt: "Você roda protegido, com seguro já incluído na sua locação.", dEn: "You drive protected, with insurance already included in your rental.",
      p: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>' },
    { tPt: "Tag E-Pass incluso", tEn: "E-Pass toll tag included", dPt: "Passe pelos pedágios sem parar e sem dor de cabeça. Já vai no carro.", dEn: "Breeze through tolls without stopping. It already comes in the car.",
      p: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>' },
    { tPt: "Sem filas", tEn: "No lines", dPt: "Processo ágil e organizado na retirada. Seu tempo de viagem não se perde em balcão.", dEn: "A quick, organized pick-up. Your trip time isn't wasted at a counter.",
      p: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
    { tPt: "Suporte durante toda a viagem", tEn: "Support throughout your trip", dPt: "Qualquer dúvida, é só chamar no WhatsApp. A gente acompanha você o tempo todo.", dEn: "Any question, just message us on WhatsApp. We're with you the whole way.",
      p: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>' }
  ];

  var featsEl = document.getElementById("feats");
  function renderFeats() {
    if (!featsEl) return;
    featsEl.innerHTML = "";
    feats.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "feat reveal in";
      div.innerHTML =
        '<div class="feat__ico">' + ico(f.p) + "</div>" +
        "<h3>" + pick(f, "t") + "</h3><p>" + pick(f, "d") + "</p>";
      featsEl.appendChild(div);
    });
  }

  var extras = [
    { key: "cadeirinha", nPt: "Cadeirinha infantil", nEn: "Child car seat", dPt: "Segurança e conforto para os pequenos durante todos os passeios.", dEn: "Safety and comfort for the little ones on every outing.", price: "",
      p: '<path d="M8 3h8a2 2 0 012 2v8H6V5a2 2 0 012-2z"/><path d="M4 13h16v3a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M8 18v3M16 18v3"/>' },
    { key: "condutor", nPt: "Condutor adicional", nEn: "Additional driver", dPt: "Divida a direção com quem viaja com você, com tudo regularizado.", dEn: "Share the driving with your travel companion, all properly covered.", price: "",
      p: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M18 8v6M15 11h6"/>' },
    { key: "gps", nPt: "GPS", nEn: "GPS", dPt: "Chegue aos parques, outlets e restaurantes sem depender do celular.", dEn: "Get to the parks, outlets and restaurants without relying on your phone.", price: "",
      p: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>' },
    { key: "wifi", nPt: "Wi-Fi móvel", nEn: "Mobile Wi-Fi", dPt: "Internet para toda a família, no carro e nos passeios.", dEn: "Internet for the whole family, in the car and on the go.", price: "",
      p: '<path d="M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0"/><circle cx="12" cy="19.5" r="1"/>' }
  ];

  function waExtraMessage(name) {
    var txt = lang() === "en"
      ? "Hi! I'd like to add the extra *" + name + "* to my rental in Orlando. Could you send me prices and availability?"
      : "Olá! Quero incluir o adicional *" + name + "* na minha locação em Orlando. Pode me passar valores e disponibilidade?";
    return WHATSAPP_LINK + "?text=" + encodeURIComponent(txt);
  }

  var extrasEl = document.getElementById("extras");
  function renderExtras() {
    if (!extrasEl) return;
    extrasEl.innerHTML = "";
    extras.forEach(function (x) {
      var name = pick(x, "n");
      var div = document.createElement("article");
      div.className = "extra reveal in";
      div.innerHTML =
        '<div class="feat__ico">' + ico(x.p) + "</div>" +
        "<h3>" + name + "</h3><p>" + pick(x, "d") + "</p>" +
        '<div class="extra__price">' + (x.price || tr("add_price")) + "</div>" +
        '<a class="btn btn--primary btn--block" target="_blank" rel="noopener" data-cta="extra-' + x.key + '" href="' + waExtraMessage(name) + '">' + tr("add_btn") + "</a>";
      extrasEl.appendChild(div);
    });
  }

  var EBOOK_LEADS_KEY = "summit_ebook_leads";
  var EBOOK_MAIL_ENDPOINT = "https://formsubmit.co/ajax/masooanjos@gmail.com";

  var ebooks = [
    { key: "primeira-viagem", tPt: "Guia da primeira viagem a Orlando", tEn: "First trip to Orlando guide", dPt: "O passo a passo para planejar a viagem em família, do embarque à volta para casa.", dEn: "A step-by-step guide to planning your family trip, from departure to the way home." },
    { key: "dirigindo-na-florida", tPt: "Dirigindo na Flórida", tEn: "Driving in Florida", dPt: "Pedágios, regras de trânsito e estacionamento para dirigir tranquilo.", dEn: "Tolls, traffic rules and parking for a stress-free drive." },
    { key: "roteiro-de-compras", tPt: "Roteiro de compras em Orlando", tEn: "Orlando shopping guide", dPt: "Outlets, lojas e os melhores horários para aproveitar sem perder tempo.", dEn: "Outlets, stores and the best times to shop without wasting time." },
    { key: "parques-com-criancas", tPt: "Parques com crianças", tEn: "Theme parks with kids", dPt: "Como organizar os dias de parque com os pequenos, sem correria.", dEn: "How to plan park days with the little ones, without the rush." },
    { key: "orlando-no-orcamento", tPt: "Orlando sem estourar o orçamento", tEn: "Orlando on a budget", dPt: "Onde economizar em hospedagem, alimentação e deslocamento.", dEn: "Where to save on lodging, food and getting around." }
  ];

  var ebooksEl = document.getElementById("ebooksGrid");
  var ebookPicks = document.getElementById("ebookPicks");
  function renderEbooks() {
    if (!ebooksEl) return;
    ebooksEl.innerHTML = "";
    ebooks.forEach(function (b, i) {
      var title = pick(b, "t");
      var art = document.createElement("article");
      art.className = "ebook reveal in";
      art.innerHTML =
        '<div class="ebook__cover ebook__cover--' + (i % 5 + 1) + '" aria-hidden="true"><span class="ebook__star">✦</span><span class="ebook__brand">Summit Rent a Car</span><span class="ebook__title">' + title + "</span></div>" +
        "<h3>" + title + "</h3><p>" + pick(b, "d") + "</p>" +
        '<button type="button" class="btn btn--primary btn--block" data-ebook-open="' + b.key + '">' + tr("eb_btn") + "</button>";
      ebooksEl.appendChild(art);
    });
    if (ebookPicks) {
      var checked = {};
      ebookPicks.querySelectorAll("input:checked").forEach(function (c) { checked[c.value] = true; });
      ebookPicks.innerHTML = ebooks.map(function (b) {
        return '<label><input type="checkbox" name="ebooks" value="' + b.key + '"' + (checked[b.key] ? " checked" : "") + "> " + pick(b, "t") + "</label>";
      }).join("");
    }
  }

  function saveEbookLead(lead) {
    try {
      var list = JSON.parse(localStorage.getItem(EBOOK_LEADS_KEY) || "[]");
      if (!Array.isArray(list)) list = [];
      list.push(lead);
      localStorage.setItem(EBOOK_LEADS_KEY, JSON.stringify(list));
      return true;
    } catch (e) { return false; }
  }

  function sendEbookMail(lead) {
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
    ebooks.forEach(function (b) {
      if (lead.ebooks.indexOf(b.key) < 0) return;
      body[en ? b.tEn : b.tPt] = new URL("assets/ebooks/" + b.key + ".pdf", document.baseURI).href;
    });
    body[en ? "Name" : "Nome"] = lead.nome;
    body["E-mail"] = lead.email;
    body[en ? "Phone" : "Telefone"] = lead.telefone;
    return fetch(EBOOK_MAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (String(j.success) !== "true") throw new Error(j.message || "send failed");
    });
  }

  function trackEbookLead(keys) {
    var label = keys.join(",");
    if (window.dataLayer) window.dataLayer.push({ event: "ebook_lead", ebooks: label });
    if (window.gtag) window.gtag("event", "generate_lead", { method: "ebook", ebooks: label });
    if (window.fbq) window.fbq("track", "Lead", { content_name: "ebook-" + label });
  }

  var ebookModal = document.getElementById("ebookModal");
  var ebookForm = document.getElementById("ebookForm");
  var ebookOk = document.getElementById("ebookOk");
  var ebookPicksErr = document.getElementById("ebookPicksErr");
  if (ebookModal && ebookForm && ebookOk && ebookPicks) {
    var closeEbook = function () {
      if (ebookModal.close) ebookModal.close(); else ebookModal.removeAttribute("open");
    };
    document.addEventListener("click", function (e) {
      var opener = e.target.closest ? e.target.closest("[data-ebook-open]") : null;
      if (!opener) return;
      var key = opener.getAttribute("data-ebook-open");
      ebookPicks.querySelectorAll("input").forEach(function (c) { c.checked = c.value === key; });
      ebookPicksErr.hidden = true;
      document.getElementById("ebookSendErr").hidden = true;
      ebookForm.hidden = false;
      ebookOk.hidden = true;
      if (ebookModal.showModal) ebookModal.showModal(); else ebookModal.setAttribute("open", "");
      document.getElementById("e-nome").focus();
    });
    ebookPicks.addEventListener("change", function () { ebookPicksErr.hidden = true; });
    document.getElementById("ebookClose").addEventListener("click", closeEbook);
    document.getElementById("ebookDone").addEventListener("click", closeEbook);
    ebookModal.addEventListener("click", function (e) { if (e.target === ebookModal) closeEbook(); });
    ebookForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var keys = [];
      ebookPicks.querySelectorAll("input:checked").forEach(function (c) { keys.push(c.value); });
      if (!keys.length) { ebookPicksErr.hidden = false; return; }
      if (!ebookForm.checkValidity()) { ebookForm.reportValidity(); return; }
      var lead = {
        ebooks: keys,
        nome: document.getElementById("e-nome").value.trim(),
        email: document.getElementById("e-email").value.trim(),
        telefone: document.getElementById("e-tel").value.trim(),
        idioma: lang(),
        data: new Date().toISOString()
      };
      var btn = ebookForm.querySelector('button[type="submit"]');
      var sendErr = document.getElementById("ebookSendErr");
      if (btn.disabled) return;
      btn.disabled = true;
      btn.textContent = tr("ebm_sending");
      sendErr.hidden = true;
      sendEbookMail(lead).then(function () {
        saveEbookLead(lead);
        trackEbookLead(keys);
        ebookForm.reset();
        ebookForm.hidden = true;
        ebookOk.hidden = false;
      }).catch(function () {
        sendErr.hidden = false;
      }).then(function () {
        btn.disabled = false;
        btn.textContent = tr("ebm_submit");
      });
    });
  }

  renderFleet();
  renderExtras();
  renderFeats();
  renderEbooks();
  if (window.I18N) window.I18N.onChange(function () { renderFleet(); renderExtras(); renderFeats(); renderEbooks(); });

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function fmtDate(v) {
    if (!v) return "";
    var p = v.split("-");
    if (p.length !== 3) return v;
    return lang() === "en" ? p[1] + "/" + p[2] + "/" + p[0] : p[2] + "/" + p[1] + "/" + p[0];
  }

  var form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("f-nome").value.trim();
      var retirada = document.getElementById("f-retirada").value;
      var devolucao = document.getElementById("f-devolucao").value;
      var categoria = document.getElementById("f-categoria").value;
      var consent = document.getElementById("f-consent");
      if (!nome || !retirada || !devolucao || !categoria || (consent && !consent.checked)) {
        form.reportValidity();
        return;
      }
      var msg = lang() === "en"
        ? "Hi! My name is " + nome + " and I'd like to rent a car with Summit.\n" +
          "Category: " + categoria + "\n" +
          "Pick-up: " + fmtDate(retirada) + "\n" +
          "Drop-off: " + fmtDate(devolucao) + "\n" +
          "Could you send me availability and prices?"
        : "Olá! Meu nome é " + nome + " e quero reservar um carro na Summit.\n" +
          "Categoria: " + categoria + "\n" +
          "Retirada: " + fmtDate(retirada) + "\n" +
          "Devolução: " + fmtDate(devolucao) + "\n" +
          "Pode me enviar disponibilidade e valores?";
      trackLead("lead-form");
      window.open(WHATSAPP_LINK + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-cta]") : null;
    if (el && el.tagName === "A" && el.getAttribute("data-cta") !== "lead-submit") {
      trackLead(el.getAttribute("data-cta"));
    }
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    setTimeout(function () {
      document.querySelectorAll(".reveal").forEach(function (el) { obs.observe(el); });
    }, 50);
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var moments = document.getElementById("moments");
  var track = moments ? moments.querySelector(".moments__track") : null;
  if (track && !reduceMotion) {
    Array.prototype.slice.call(track.children).forEach(function (img) {
      var clone = img.cloneNode(true);
      clone.alt = "";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    moments.classList.add("is-loop");
  }

  function initSky(host) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext ? canvas.getContext("2d") : null;
    if (!ctx) return;
    canvas.className = "sky";
    canvas.setAttribute("aria-hidden", "true");
    host.insertBefore(canvas, host.firstChild);

    var shooting = host.getAttribute("data-sky") === "shooting" && !reduceMotion;
    var fireworks = host.getAttribute("data-sky") === "fireworks" && !reduceMotion;
    var w = 0, h = 0, stars = [], shot = null, nextShot = 0, visible = false, raf = 0;
    var sparks = [], nextBurst = 0, burstColors = ["255,215,94", "255,143,196", "255,255,255", "190,160,255"];

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var nw = host.clientWidth, nh = host.clientHeight;
      if (nw === w && nh === h) return;
      w = nw; h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(170, Math.round((w * h) / 8500));
      stars = [];
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.3, p: Math.random() * 6.28, s: Math.random() * 1.3 + 0.4, gold: Math.random() < 0.35 });
      }
      if (!visible || reduceMotion) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        var a = reduceMotion ? 0.7 : 0.25 + 0.75 * Math.abs(Math.sin((t / 1000) * st.s + st.p));
        ctx.globalAlpha = a;
        ctx.fillStyle = ctx.strokeStyle = st.gold ? "#ffe08a" : "#ffffff";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, 6.28);
        ctx.fill();
        if (st.r > 1.25) {
          var l = st.r * 3.4 * a;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(st.x - l, st.y); ctx.lineTo(st.x + l, st.y);
          ctx.moveTo(st.x, st.y - l); ctx.lineTo(st.x, st.y + l);
          ctx.stroke();
        }
      }
      if (shooting) {
        if (!shot && t > nextShot) {
          shot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.35, life: 0 };
        }
        if (shot) {
          shot.x += 9; shot.y += 3.6; shot.life++;
          var fade = Math.max(0, 1 - shot.life / 55);
          var g = ctx.createLinearGradient(shot.x, shot.y, shot.x - 110, shot.y - 44);
          g.addColorStop(0, "rgba(255,240,190," + fade + ")");
          g.addColorStop(1, "rgba(255,240,190,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shot.x, shot.y); ctx.lineTo(shot.x - 110, shot.y - 44);
          ctx.stroke();
          if (shot.life > 55) { shot = null; nextShot = t + 4500 + Math.random() * 6000; }
        }
      }
      if (fireworks) {
        if (t > nextBurst) {
          var bx = w * (0.12 + Math.random() * 0.76), by = h * (0.12 + Math.random() * 0.4);
          var color = burstColors[Math.floor(Math.random() * burstColors.length)];
          for (var k = 0; k < 28; k++) {
            var ang = (k / 28) * 6.28, sp = 1.4 + Math.random() * 1.6;
            sparks.push({ x: bx, y: by, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 0, c: color });
          }
          nextBurst = t + 1700 + Math.random() * 2200;
        }
        for (var s = sparks.length - 1; s >= 0; s--) {
          var pt = sparks[s];
          pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.025; pt.vx *= 0.985; pt.vy *= 0.985; pt.life++;
          if (pt.life > 70) { sparks.splice(s, 1); continue; }
          ctx.globalAlpha = 1;
          ctx.fillStyle = "rgba(" + pt.c + "," + (1 - pt.life / 70) + ")";
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.6, 0, 6.28);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function loop(t) {
      draw(t);
      raf = visible ? window.requestAnimationFrame(loop) : 0;
    }

    resize();
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(host);
    else window.addEventListener("resize", resize);

    if (reduceMotion || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !raf) raf = window.requestAnimationFrame(loop);
    }).observe(host);
  }

  if (window.requestAnimationFrame) {
    document.querySelectorAll("[data-sky]").forEach(initSky);
  }

  if (!reduceMotion) {
    var dustCount = 0, lastHover = 0, lastScroll = 0;
    var dust = function (x, y) {
      if (dustCount > 24) return;
      dustCount++;
      var s = document.createElement("span");
      s.className = "dust";
      s.setAttribute("aria-hidden", "true");
      s.textContent = "✦";
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.fontSize = (8 + Math.random() * 10) + "px";
      s.style.setProperty("--dx", (Math.random() * 44 - 22) + "px");
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); dustCount--; }, 900);
    };
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - lastHover < 70 || !e.target.closest || !e.target.closest(".btn")) return;
      lastHover = now;
      dust(e.clientX, e.clientY);
    });
    window.addEventListener("scroll", function () {
      var now = Date.now();
      if (now - lastScroll < 160) return;
      lastScroll = now;
      var side = Math.random() < 0.5 ? 0.02 + Math.random() * 0.05 : 0.93 + Math.random() * 0.05;
      dust(window.innerWidth * side, window.innerHeight * (0.15 + Math.random() * 0.7));
    }, { passive: true });
  }
})();
