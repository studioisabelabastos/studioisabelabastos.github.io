// Studio Isabela Bastos: revelação ao rolar, menu, cabeçalho, botão flutuante, olhar que segue o cursor e mapa sob demanda.
// Segurança: nenhum HTML é montado a partir de texto (sem innerHTML), nenhum dado da URL ou da visitante é lido,
// e o único endereço externo carregado (o mapa) é fixo aqui e só abre depois do clique.
(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMediaChange = (query, handler) => {
    const mq = window.matchMedia(query);
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", handler);
    else if (typeof mq.addListener === "function") mq.addListener(handler);
  };

  /* Revelar ao rolar. Vem primeiro: se algo abaixo falhar, o conteúdo continua aparecendo. */
  const reveals = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    reveals.forEach((el) => {
      const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
      el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 5) * 0.09}s`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }
  // Avisa o script do <head> que a revelação está ativa (sem isso, ele mostra tudo após 3 s).
  root.classList.add("js-ready");

  /* Menu no celular */
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");
  if (menuToggle && siteNav) {
    const menuLabel = menuToggle.querySelector(".sr-only");
    const setMenu = (open) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      if (menuLabel) menuLabel.textContent = open ? "Fechar menu" : "Abrir menu";
      siteNav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };
    menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
    siteNav.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus();
      }
    });
    onMediaChange("(min-width: 821px)", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* Cabeçalho compacto e botão flutuante */
  const header = document.querySelector(".site-header");
  const floating = document.querySelector(".floating-cta");
  const hero = document.querySelector(".hero");
  const footer = document.querySelector(".site-footer");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 40);
    if (floating && hero) {
      const pastHero = y > hero.offsetTop + hero.offsetHeight - 120;
      const nearFooter = footer ? window.innerHeight + y > footer.offsetTop + 80 : false;
      floating.classList.toggle("is-visible", pastHero && !nearFooter);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Link ativo no menu */
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if ("IntersectionObserver" in window && navLinks.length) {
    const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => a.classList.remove("is-active"));
          const link = byId.get(entry.target.id);
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* O olhar acompanha o cursor */
  const eye = document.querySelector(".eye");
  const iris = eye ? eye.querySelector(".iris") : null;
  if (iris && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let frame = 0;
    window.addEventListener(
      "pointermove",
      (event) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = eye.getBoundingClientRect();
          const cx = box.left + box.width / 2;
          const cy = box.top + box.height * 0.53;
          const dx = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth / 2)));
          const dy = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight / 2)));
          iris.style.transform = `translate(${dx * 26}px, ${dy * 12}px)`;
        });
      },
      { passive: true }
    );
  }

  /* Mapa do Google só depois do clique (privacidade/LGPD e velocidade).
     O endereço é fixo aqui; o iframe roda isolado (sandbox) e não recebe a URL completa da página. */
  const MAP_URL =
    "https://maps.google.com/maps?q=Rua%20Ramon%20Freire%20Serrano%2C%2039%2C%20S%C3%A3o%20Paulo&z=16&output=embed";
  const map = document.querySelector(".map");
  const mapButton = map ? map.querySelector(".map-load") : null;
  if (map && mapButton) {
    mapButton.addEventListener(
      "click",
      () => {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox");
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.loading = "lazy";
        iframe.title = "Mapa para o Studio Isabela Bastos, na Rua Ramon Freire Serrano, 39, São Paulo";
        iframe.src = MAP_URL;
        const facade = map.querySelector(".map-facade");
        if (facade) facade.remove();
        map.appendChild(iframe);
        iframe.focus();
      },
      { once: true }
    );
  }

  /* Ano no rodapé */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
