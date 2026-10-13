const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  const menuLabel = menuToggle.querySelector(".sr-only");

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    if (menuLabel) {
      menuLabel.textContent = isExpanded ? "Abrir menu" : "Fechar menu";
    }
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    if (menuLabel) {
      menuLabel.textContent = "Abrir menu";
    }
    siteNav.classList.remove("is-open");
  }
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}
