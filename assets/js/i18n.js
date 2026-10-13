(function () {
  "use strict";
  var LANG_KEY = "summit_lang";

  var T = {
    pt: {
      nav_frota: "Frota", nav_dif: "Diferenciais", nav_sobre: "Sobre", nav_dep: "Depoimentos", nav_reservar: "Reservar",
      btn_wa: "WhatsApp", btn_reservar_agora: "Reservar agora",
      hero_badge: "+500 clientes brasileiros atendidos",
      hero_h1: 'Seu carro em <span class="hl">Orlando</span> com atendimento 100% em português',
      hero_sub: "Reserve sem caução, com seguro e Tag E-Pass inclusos e suporte durante toda a sua viagem. Modelos a partir de <strong>$55/dia</strong>.",
      hero_cta_wa: "Reservar pelo WhatsApp", hero_cta_fleet: "Ver a frota",
      trust_caucao: "Sem caução", trust_seguro: "Seguro incluso", trust_epass: "Tag E-Pass incluso", trust_filas: "Sem filas",
      form_title: "Reserve em 1 minuto", form_sub: "Preencha e envie direto para o nosso WhatsApp.",
      form_nome: "Nome", form_nome_ph: "Seu nome", form_retirada: "Retirada", form_devolucao: "Devolução",
      form_categoria: "Categoria desejada", form_selecione: "Selecione a categoria",
      opt_econ: "Econômico — a partir de $55/dia", opt_suv: "SUV — a partir de $75/dia", opt_suvp: "SUV Premium — a partir de $99/dia",
      opt_premium: "Premium — a partir de $90/dia", opt_minivan: "Minivan — a partir de $95/dia", opt_conv: "Conversível — a partir de $110/dia",
      form_consent: 'Li e aceito a <a href="privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a> e autorizo o contato pela Summit Rent a Car.',
      form_submit: "Enviar e falar no WhatsApp", form_note: "Resposta rápida em horário comercial. Sem compromisso.",
      strip_1: "100% em Português", strip_2: "Não cobramos caução", strip_3: "Seguro de automóvel incluso", strip_4: "Tag E-Pass incluso", strip_5: "Suporte na viagem toda",
      fleet_eyebrow: "Nossa frota", fleet_h2: "Escolha o carro ideal para a sua viagem",
      fleet_p: "Do econômico ao conversível. Clique na categoria e fale com a gente no WhatsApp para confirmar disponibilidade e valores.",
      fleet_note: 'Valores de diária "a partir de", em dólar, sujeitos a disponibilidade e período da locação.',
      dif_eyebrow: "Por que a Summit", dif_h2: "Tranquilidade do primeiro contato ao último dia",
      dif_p: "Cuidar dos detalhes é a nossa forma de cuidar das pessoas. Veja o que está incluso quando você aluga com a gente.",
      steps_eyebrow: "Simples assim", steps_h2: "Alugue seu carro em 4 passos",
      steps_p: "Do primeiro contato à retirada, sem filas e sem complicação — tudo pelo WhatsApp e em português.",
      steps_cta: "Começar minha reserva",
      step1_t: "Escolha seu carro", step1_d: "Veja as categorias e os valores da diária e escolha o modelo ideal para a sua viagem.",
      step2_t: "Fale no WhatsApp", step2_d: "Em português, confirme a disponibilidade e tire todas as suas dúvidas na hora.",
      step3_t: "Reserve sem burocracia", step3_d: "Pague no cartão em até 12x, Pix ou Zelle. Sem caução e sem bloqueio no cartão.",
      step4_t: "Retire e aproveite", step4_d: "Sem filas, com seguro e Tag E-Pass inclusos e suporte durante toda a viagem.",
      aria_menu: "Abrir menu",
      unit_seats: "lugares", unit_bags: "malas", trans_auto: "Automático", car_from: "A partir de", car_day: "/dia", car_book: "Reservar",
      exp_eyebrow: "Viaje feliz", exp_h2: "Do aeroporto ao seu destino, com quem fala a sua língua",
      exp_p: "A viagem que você planejou merece começar bem. A gente cuida de cada detalhe para você focar no que importa: curtir cada momento com quem ama.",
      exp_li1: "Receba o carro sem filas e sem burocracia", exp_li2: "Tire todas as dúvidas no WhatsApp, em português", exp_li3: "Conte com suporte do primeiro ao último dia",
      exp_cta: "Começar minha viagem",
      sobre_eyebrow: "Nossa história", sobre_h2: "Todo grande sonho começa com uma história",
      sobre_lead: "A Summit nasceu do encontro entre paixão, experiência e sonho.",
      sobre_p1: "Desde criança, Igor cresceu cercado pelo universo dos automóveis, inspirado pelo pai, que há anos constrói sua trajetória no mercado de veículos no Brasil. Entre carros, histórias e aprendizados, nasceu uma paixão que atravessou gerações e encontrou em Orlando um novo caminho para se transformar em propósito.",
      sobre_p2: "Sabemos que, por trás de cada reserva, existe uma história: alguém que economizou, planejou, esperou e sonhou com esse momento. Por isso, para nós, um carro nunca é apenas um carro. Queremos que você se sinta seguro, acolhido e tranquilo durante toda a viagem.",
      sobre_sign: "Seu sonho trouxe você até Orlando. É uma honra fazer parte dele.", sobre_cta: "Falar com a Summit",
      stat_500_lbl: "clientes brasileiros atendidos", stat_100_lbl: "em português, do começo ao fim",
      dep_eyebrow: "Prova social", dep_h2: "Quem viajou com a Summit recomenda", dep_rating_num: "5,0", dep_rating_lbl: "avaliações de clientes brasileiros",
      rev1_text: '"Atendimento impecável e tudo em português. Peguei o carro sem filas e sem aquela burocracia de caução. Recomendo demais para quem vai a Orlando."',
      rev1_role: "Viagem em família",
      rev2_text: '"Suporte do começo ao fim da viagem. Qualquer dúvida era só chamar no WhatsApp e respondiam na hora. Carro novo e com a tag do pedágio já inclusa."',
      rev2_role: "Lua de mel",
      rev3_text: '"Primeira vez alugando carro nos EUA e foi tranquilo. Explicaram tudo, seguro já incluso e sem surpresa no valor. Voltarei a alugar com a Summit."',
      rev3_role: "Primeira viagem aos EUA",
      info_eyebrow: "Como funciona", info_h2: "Requisitos e formas de pagamento",
      info_p: "Simples e transparente. Separe os documentos abaixo e escolha a forma de pagamento que preferir.",
      info_c1_title: "Para alugar você precisa",
      info_c1_1: "Carteira de Habilitação física (original), válida e em boas condições", info_c1_2: "Passaporte válido", info_c1_3: "Válido para o locatário e condutores adicionais durante toda a locação",
      info_c2_title: "Formas de pagamento",
      info_c2_1: "Cartão de crédito à vista ou parcelado em até 12x (juros e encargos por conta do cliente)", info_c2_2: "Pix à vista", info_c2_3: "Zelle",
      pay_1: "Cartão até 12x", pay_2: "Pix", pay_3: "Zelle",
      cta_h2: "Pronto para pegar a estrada em Orlando?",
      cta_p: "Fale agora com a nossa equipe no WhatsApp e garanta seu carro com atendimento em português, sem caução e com seguro incluso.",
      cta_btn: "Reservar pelo WhatsApp",
      foot_desc: "Aluguel de carros em Orlando com atendimento 100% em português, sem caução e com seguro incluso. Seu sonho trouxe você até Orlando — é uma honra fazer parte dele.",
      foot_nav_title: "Navegação", foot_nav_frota: "Nossa frota", foot_nav_dif: "Diferenciais", foot_nav_sobre: "Sobre a Summit", foot_nav_dep: "Depoimentos", foot_nav_reservar: "Reservar agora", foot_nav_priv: "Política de Privacidade",
      foot_contact_title: "Contato", foot_hours: "Seg a Sex, 8h às 18h", foot_location: "Orlando, Flórida — EUA",
      foot_copy: "Summit Rent a Car — Ride Pro Solutions Corp. Todos os direitos reservados.", foot_tagline: "Orlando, FL · Atendimento em português",
      consent_text: 'Usamos cookies e tecnologias de medição (Google e Meta) para melhorar sua experiência e nossas campanhas. Ao aceitar, você concorda com a nossa <a href="privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a>.',
      consent_accept: "Aceitar", consent_reject: "Recusar",
      wa_float: "Reservar",
      add_eyebrow: "Adicionais", add_h2: "Deixe a sua viagem ainda mais completa",
      add_p: "Inclua itens extras na sua locação. Escolha o adicional e fale com a gente no WhatsApp.",
      add_price: "Consulte", add_btn: "Quero este adicional",
      eb_eyebrow: "Ebooks da Summit", eb_h2: "Guias para planejar a sua viagem",
      eb_p: "Escolha os materiais que quiser e receba tudo no seu e-mail.",
      eb_btn: "Receber por e-mail",
      ebm_title: "Receba no seu e-mail", ebm_sub: "Preencha uma vez e receba todos os que marcar.",
      ebm_picks: "Quais ebooks você quer receber?", ebm_pick_err: "Marque pelo menos um ebook.",
      ebm_email: "E-mail", ebm_email_ph: "voce@email.com", ebm_tel: "Telefone / WhatsApp", ebm_tel_ph: "(11) 99999-9999",
      ebm_submit: "Quero receber", ebm_close: "Fechar", ebm_done: "Fechar",
      ebm_ok_title: "Tudo certo!", ebm_ok_text: "Enviamos os ebooks para o seu e-mail. Se não encontrar em alguns minutos, confira a caixa de spam.",
      ebm_sending: "Enviando...", ebm_send_err: "Não foi possível enviar agora. Tente de novo em instantes ou fale com a gente no WhatsApp.",
      priv_h1_title: "Política de Privacidade", priv_updated: "Última atualização: 12 de outubro de 2026",
      priv_intro: 'Esta Política de Privacidade descreve como a <strong>Summit Rent a Car</strong>, nome fantasia de <strong>Ride Pro Solutions Corp</strong> ("Summit", "nós"), coleta, utiliza, compartilha e protege os dados pessoais dos visitantes deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).',
      priv_s1_h: "1. Quem é o responsável pelos dados",
      priv_s1_b: 'O controlador dos dados é a Summit Rent a Car (Ride Pro Solutions Corp), com atendimento em Orlando, Flórida - EUA. Para qualquer assunto relativo a esta política ou aos seus dados, entre em contato pelo e-mail <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a> ou pelo WhatsApp +1 (689) 327-8539.',
      priv_s2_h: "2. Quais dados coletamos",
      priv_s2_li1: '<strong>Dados fornecidos por você:</strong> nome, datas de retirada e devolução, categoria de veículo de interesse e demais informações que você envia pelo formulário do site ou pelo WhatsApp.',
      priv_s2_li2: '<strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo e navegador, páginas visitadas, origem do acesso e interações, coletados por meio de cookies e tecnologias de medição.',
      priv_s3_h: "3. Para que usamos os seus dados",
      priv_s3_li1: "Responder às suas solicitações de reserva e dúvidas, inclusive pelo WhatsApp;",
      priv_s3_li2: "Prestar atendimento e acompanhar a sua locação;",
      priv_s3_li3: "Melhorar o site, a experiência de navegação e os nossos serviços;",
      priv_s3_li4: "Mensurar e otimizar campanhas de marketing (Google Ads e Meta Ads), incluindo remarketing.",
      priv_s4_h: "4. Base legal do tratamento",
      priv_s4_b: 'Tratamos os seus dados com base no seu <strong>consentimento</strong>, na execução de <strong>procedimentos preliminares a um contrato</strong> de locação solicitado por você, e no <strong>legítimo interesse</strong> para medição e melhoria dos nossos serviços, sempre respeitando os seus direitos.',
      priv_s5_h: "5. Cookies e tecnologias de medição",
      priv_s5_b: "Utilizamos cookies e ferramentas como Google Analytics, Google Tag Manager e Meta Pixel para entender o uso do site e medir campanhas. Os cookies de medição e marketing só são ativados após o seu aceite no banner de consentimento. Você pode recusar, retirar o consentimento a qualquer momento ou bloquear cookies nas configurações do seu navegador - parte das funcionalidades pode ser afetada.",
      priv_s6_h: "6. Compartilhamento de dados",
      priv_s6_b: "Não vendemos os seus dados pessoais. Podemos compartilhá-los com prestadores que viabilizam a nossa operação, como Google e Meta (medição e publicidade) e a plataforma WhatsApp (atendimento). Esses parceiros tratam os dados conforme as suas próprias políticas.",
      priv_s7_h: "7. Transferência internacional",
      priv_s7_b: "Como atuamos nos Estados Unidos e utilizamos provedores globais, os seus dados podem ser processados e armazenados fora do Brasil, com a adoção de medidas de proteção adequadas.",
      priv_s8_h: "8. Por quanto tempo guardamos",
      priv_s8_b: "Mantemos os dados pelo tempo necessário para as finalidades descritas ou conforme exigido por obrigações legais. Depois disso, os dados são eliminados ou anonimizados.",
      priv_s9_h: "9. Os seus direitos",
      priv_s9_b: 'Nos termos da LGPD, você pode solicitar a qualquer momento: confirmação da existência de tratamento; acesso aos dados; correção de dados incompletos ou desatualizados; anonimização ou eliminação; portabilidade; informação sobre compartilhamento; e revogação do consentimento. Para exercer os seus direitos, escreva para <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a>.',
      priv_s10_h: "10. Segurança",
      priv_s10_b: "Adotamos medidas técnicas e organizacionais razoáveis para proteger os seus dados contra acesso não autorizado, perda ou uso indevido.",
      priv_s11_h: "11. Alterações desta política",
      priv_s11_b: "Podemos atualizar esta Política de Privacidade periodicamente. A versão vigente estará sempre disponível nesta página, com a data da última atualização.",
      priv_s12_h: "12. Contato",
      priv_s12_b: 'Dúvidas sobre esta política ou sobre os seus dados? Fale com a gente pelo e-mail <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a> ou pelo WhatsApp +1 (689) 327-8539.',
      priv_note: "Este documento é um modelo informativo e deve ser revisado por um profissional jurídico antes da publicação definitiva, para refletir com exatidão as práticas da empresa e a legislação aplicável.",
      priv_back: "Voltar ao site", priv_home: "Início"
    },
    en: {
      nav_frota: "Fleet", nav_dif: "Benefits", nav_sobre: "About", nav_dep: "Reviews", nav_reservar: "Book",
      btn_wa: "WhatsApp", btn_reservar_agora: "Book now",
      hero_badge: "500+ Brazilian travelers served",
      hero_h1: 'Your car in <span class="hl">Orlando</span>, booked in minutes on WhatsApp',
      hero_sub: "Rent with no deposit, insurance and E-Pass toll tag included, and support throughout your trip. Models from <strong>$55/day</strong>.",
      hero_cta_wa: "Book on WhatsApp", hero_cta_fleet: "See the fleet",
      trust_caucao: "No deposit", trust_seguro: "Insurance included", trust_epass: "E-Pass included", trust_filas: "No lines",
      form_title: "Book in 1 minute", form_sub: "Fill it out and send straight to our WhatsApp.",
      form_nome: "Name", form_nome_ph: "Your name", form_retirada: "Pick-up", form_devolucao: "Drop-off",
      form_categoria: "Desired category", form_selecione: "Select a category",
      opt_econ: "Economy — from $55/day", opt_suv: "SUV — from $75/day", opt_suvp: "Premium SUV — from $99/day",
      opt_premium: "Premium — from $90/day", opt_minivan: "Minivan — from $95/day", opt_conv: "Convertible — from $110/day",
      form_consent: 'I have read and accept the <a href="privacidade.html" target="_blank" rel="noopener">Privacy Policy</a> and authorize contact from Summit Rent a Car.',
      form_submit: "Send and chat on WhatsApp", form_note: "Quick reply during business hours. No commitment.",
      strip_1: "Bilingual service", strip_2: "No deposit required", strip_3: "Car insurance included", strip_4: "E-Pass toll tag included", strip_5: "Support throughout your trip",
      fleet_eyebrow: "Our fleet", fleet_h2: "Choose the perfect car for your trip",
      fleet_p: "From economy to convertible. Tap a category and chat with us on WhatsApp to confirm availability and prices.",
      fleet_note: 'Daily rates "from", in US dollars, subject to availability and rental period.',
      dif_eyebrow: "Why Summit", dif_h2: "Peace of mind from first contact to your last day",
      dif_p: "Caring about the details is how we care about people. See what's included when you rent with us.",
      steps_eyebrow: "It's simple", steps_h2: "Rent your car in 4 steps",
      steps_p: "From first contact to pick-up, with no lines and no hassle — all on WhatsApp.",
      steps_cta: "Start my booking",
      step1_t: "Choose your car", step1_d: "Browse the categories and daily rates and pick the perfect model for your trip.",
      step2_t: "Message us on WhatsApp", step2_d: "Confirm availability and ask us anything, right away.",
      step3_t: "Book with no hassle", step3_d: "Pay by credit card in up to 12 installments, Pix or Zelle. No deposit and no card hold.",
      step4_t: "Pick up and enjoy", step4_d: "No lines, with insurance and E-Pass toll tag included and support throughout your trip.",
      aria_menu: "Open menu",
      unit_seats: "seats", unit_bags: "bags", trans_auto: "Automatic", car_from: "From", car_day: "/day", car_book: "Book",
      exp_eyebrow: "Travel happy", exp_h2: "From the airport to your destination, with people who speak your language",
      exp_p: "The trip you planned deserves a great start. We take care of every detail so you can focus on what matters: enjoying every moment with the people you love.",
      exp_li1: "Pick up the car with no lines and no hassle", exp_li2: "Ask us anything on WhatsApp", exp_li3: "Count on support from your first to your last day",
      exp_cta: "Start my trip",
      sobre_eyebrow: "Our story", sobre_h2: "Every great dream begins with a story",
      sobre_lead: "Summit was born from a meeting of passion, experience and a dream.",
      sobre_p1: "Igor grew up surrounded by the world of cars, inspired by his father, who has spent years building his path in the vehicle market in Brazil. Among cars, stories and lessons, a passion was born that crossed generations and found in Orlando a new way to become a purpose.",
      sobre_p2: "We know that behind every booking there is a story: someone who saved, planned, waited and dreamed of this moment. That's why, to us, a car is never just a car. We want you to feel safe, welcome and at ease throughout your trip.",
      sobre_sign: "Your dream brought you to Orlando. It's an honor to be part of it.", sobre_cta: "Talk to Summit",
      stat_500_lbl: "Brazilian travelers served", stat_100_lbl: "service in your language, start to finish",
      dep_eyebrow: "Social proof", dep_h2: "Travelers who chose Summit recommend it", dep_rating_num: "5.0", dep_rating_lbl: "reviews from happy travelers",
      rev1_text: '"Flawless service and everything in my language. I picked up the car with no lines and none of that deposit hassle. Highly recommend for anyone heading to Orlando."',
      rev1_role: "Family trip",
      rev2_text: '"Support from start to finish. Any question, I just messaged them on WhatsApp and got an instant reply. New car with the toll tag already included."',
      rev2_role: "Honeymoon",
      rev3_text: '"First time renting a car in the US and it was easy. They explained everything, insurance included and no surprise charges. I\'ll rent with Summit again."',
      rev3_role: "First trip to the US",
      info_eyebrow: "How it works", info_h2: "Requirements and payment",
      info_p: "Simple and transparent. Have the documents below ready and choose the payment method you prefer.",
      info_c1_title: "What you need to rent",
      info_c1_1: "Physical driver's license (original), valid and in good condition", info_c1_2: "Valid passport", info_c1_3: "Required for the renter and additional drivers throughout the rental",
      info_c2_title: "Payment methods",
      info_c2_1: "Credit card in full or in up to 12 installments (interest and fees are the customer's responsibility)", info_c2_2: "Pix (in full)", info_c2_3: "Zelle",
      pay_1: "Card up to 12x", pay_2: "Pix", pay_3: "Zelle",
      cta_h2: "Ready to hit the road in Orlando?",
      cta_p: "Chat with our team on WhatsApp now and lock in your car with friendly service, no deposit and insurance included.",
      cta_btn: "Book on WhatsApp",
      foot_desc: "Car rental in Orlando with friendly bilingual service, no deposit and insurance included. Your dream brought you to Orlando — it's an honor to be part of it.",
      foot_nav_title: "Navigation", foot_nav_frota: "Our fleet", foot_nav_dif: "Benefits", foot_nav_sobre: "About Summit", foot_nav_dep: "Reviews", foot_nav_reservar: "Book now", foot_nav_priv: "Privacy Policy",
      foot_contact_title: "Contact", foot_hours: "Mon–Fri, 8am to 6pm", foot_location: "Orlando, Florida — USA",
      foot_copy: "Summit Rent a Car — Ride Pro Solutions Corp. All rights reserved.", foot_tagline: "Orlando, FL · Bilingual service",
      consent_text: 'We use cookies and measurement technologies (Google and Meta) to improve your experience and our campaigns. By accepting, you agree to our <a href="privacidade.html" target="_blank" rel="noopener">Privacy Policy</a>.',
      consent_accept: "Accept", consent_reject: "Decline",
      wa_float: "Book",
      add_eyebrow: "Extras", add_h2: "Make your trip even more complete",
      add_p: "Add extra items to your rental. Pick an extra and chat with us on WhatsApp.",
      add_price: "Ask us", add_btn: "I want this extra",
      eb_eyebrow: "Summit ebooks", eb_h2: "Guides to plan your trip",
      eb_p: "Pick the guides you want and get them all in your inbox.",
      eb_btn: "Get it by email",
      ebm_title: "Get them in your inbox", ebm_sub: "Fill this in once and receive every guide you tick.",
      ebm_picks: "Which ebooks would you like?", ebm_pick_err: "Please tick at least one ebook.",
      ebm_email: "Email", ebm_email_ph: "you@email.com", ebm_tel: "Phone / WhatsApp", ebm_tel_ph: "+1 (555) 555-5555",
      ebm_submit: "Send them to me", ebm_close: "Close", ebm_done: "Close",
      ebm_ok_title: "All set!", ebm_ok_text: "We've sent the ebooks to your email. If you can't find them in a few minutes, check your spam folder.",
      ebm_sending: "Sending...", ebm_send_err: "We couldn't send it right now. Please try again shortly or message us on WhatsApp.",
      priv_h1_title: "Privacy Policy", priv_updated: "Last updated: October 12, 2026",
      priv_intro: 'This Privacy Policy describes how <strong>Summit Rent a Car</strong>, a trade name of <strong>Ride Pro Solutions Corp</strong> ("Summit", "we"), collects, uses, shares and protects the personal data of visitors to this website, in accordance with Brazil\'s General Data Protection Law (Law No. 13.709/2018 - LGPD).',
      priv_s1_h: "1. Who is responsible for the data",
      priv_s1_b: 'The data controller is Summit Rent a Car (Ride Pro Solutions Corp), serving customers in Orlando, Florida - USA. For any matter related to this policy or your data, contact us by email at <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a> or on WhatsApp at +1 (689) 327-8539.',
      priv_s2_h: "2. What data we collect",
      priv_s2_li1: '<strong>Data you provide:</strong> name, pick-up and drop-off dates, the vehicle category you are interested in and any other information you send through the website form or WhatsApp.',
      priv_s2_li2: '<strong>Browsing data:</strong> IP address, device and browser type, pages visited, traffic source and interactions, collected through cookies and measurement technologies.',
      priv_s3_h: "3. How we use your data",
      priv_s3_li1: "Respond to your booking requests and questions, including on WhatsApp;",
      priv_s3_li2: "Provide service and support throughout your rental;",
      priv_s3_li3: "Improve the website, the browsing experience and our services;",
      priv_s3_li4: "Measure and optimize marketing campaigns (Google Ads and Meta Ads), including remarketing.",
      priv_s4_h: "4. Legal basis for processing",
      priv_s4_b: 'We process your data based on your <strong>consent</strong>, on carrying out <strong>preliminary steps toward a rental agreement</strong> requested by you, and on <strong>legitimate interest</strong> to measure and improve our services, always respecting your rights.',
      priv_s5_h: "5. Cookies and measurement technologies",
      priv_s5_b: "We use cookies and tools such as Google Analytics, Google Tag Manager and Meta Pixel to understand site usage and measure campaigns. Measurement and marketing cookies are only activated after you accept the consent banner. You can decline, withdraw consent at any time or block cookies in your browser settings - some features may be affected.",
      priv_s6_h: "6. Data sharing",
      priv_s6_b: "We do not sell your personal data. We may share it with providers that enable our operation, such as Google and Meta (measurement and advertising) and the WhatsApp platform (customer service). These partners process the data according to their own policies.",
      priv_s7_h: "7. International transfer",
      priv_s7_b: "Since we operate in the United States and use global providers, your data may be processed and stored outside Brazil, with appropriate protection measures in place.",
      priv_s8_h: "8. How long we keep it",
      priv_s8_b: "We keep data for as long as necessary for the purposes described or as required by legal obligations. After that, the data is deleted or anonymized.",
      priv_s9_h: "9. Your rights",
      priv_s9_b: 'Under the LGPD, you may request at any time: confirmation that processing exists; access to your data; correction of incomplete or outdated data; anonymization or deletion; portability; information about sharing; and withdrawal of consent. To exercise your rights, write to <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a>.',
      priv_s10_h: "10. Security",
      priv_s10_b: "We adopt reasonable technical and organizational measures to protect your data against unauthorized access, loss or misuse.",
      priv_s11_h: "11. Changes to this policy",
      priv_s11_b: "We may update this Privacy Policy from time to time. The current version will always be available on this page, with the date of the last update.",
      priv_s12_h: "12. Contact",
      priv_s12_b: 'Questions about this policy or your data? Reach us by email at <a href="mailto:contato.summitorlando@gmail.com">contato.summitorlando@gmail.com</a> or on WhatsApp at +1 (689) 327-8539.',
      priv_note: "This document is an informational template and should be reviewed by a legal professional before final publication, to accurately reflect the company's practices and applicable law.",
      priv_back: "Back to the site", priv_home: "Home"
    }
  };

  var subs = [];
  function detect() {
    try { var s = localStorage.getItem(LANG_KEY); if (s === "pt" || s === "en") return s; } catch (e) {}
    return "pt";
  }
  var current = detect();

  function t(key, lang) {
    lang = lang || current;
    var d = T[lang] || T.pt;
    return d[key] != null ? d[key] : (T.pt[key] != null ? T.pt[key] : key);
  }
  function setAttrAll(sel, attr, kAttr) {
    document.querySelectorAll(sel).forEach(function (el) {
      var k = el.getAttribute(kAttr), v = t(k);
      if (v != null) el.setAttribute(attr, v);
    });
  }
  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"); var v = t(k, lang); if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html"); var v = t(k, lang); if (v != null) el.innerHTML = v;
    });
    setAttrAll("[data-i18n-ph]", "placeholder", "data-i18n-ph");
    setAttrAll("[data-i18n-aria]", "aria-label", "data-i18n-aria");
    setAttrAll("[data-i18n-alt]", "alt", "data-i18n-alt");
    document.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    window.I18N.lang = current;
    subs.forEach(function (fn) { try { fn(lang); } catch (e) {} });
  }
  function setLang(lang) {
    if (lang !== "pt" && lang !== "en") return;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    apply(lang);
  }

  window.I18N = { t: t, apply: apply, setLang: setLang, lang: current, onChange: function (fn) { subs.push(fn); } };

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".lang__btn") : null;
    if (b) { e.preventDefault(); setLang(b.getAttribute("data-lang")); }
  });

  apply(current);
})();
