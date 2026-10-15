const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector(".site-header");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navLinks?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks?.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
});

navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll(".service-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".service-card");
    const isOpen = card.classList.contains("is-open");

    document.querySelectorAll(".service-card.is-open").forEach((openCard) => {
      openCard.classList.remove("is-open");
      openCard.querySelector(".service-toggle")?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      card.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

window.addEventListener(
  "scroll",
  () => siteHeader?.classList.toggle("is-sticky", window.scrollY > 120),
  { passive: true },
);

const form = document.querySelector("#concept-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const success = form.querySelector(".form-success");
  success.textContent = "Prototype confirmed — this is where the live site would send the request to NDT Group.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
