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

  renderFleet();
  renderFeats();
  if (window.I18N) window.I18N.onChange(function () { renderFleet(); renderFeats(); });

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
})();
