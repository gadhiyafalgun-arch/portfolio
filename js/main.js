// =========================
// Helpers
// =========================
function lockScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

// =========================
// Modals (optional - safe if unused)
// =========================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("is-open");
  lockScroll(true);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("is-open");

  // If no other modal is open, unlock scroll
  if (!document.querySelector(".modal.is-open")) lockScroll(false);
}

window.openModal = openModal;
window.closeModal = closeModal;

// =========================
// DOM Ready
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // AOS Init
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Story steps
  const steps = Array.from(document.querySelectorAll(".step"));

  const activateClosestStep = () => {
    if (!steps.length) return;

    const mid = window.innerHeight * 0.5;
    let bestEl = null;
    let bestDist = Infinity;

    steps.forEach((el) => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height * 0.5;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestEl = el;
      }
    });

    steps.forEach((el) => el.classList.remove("is-active"));
    if (bestEl) bestEl.classList.add("is-active");
  };

  // Glow parallax
  const g1 = document.querySelector(".glow-1");
  const g2 = document.querySelector(".glow-2");

  // Scroll progress bar
  const scrollProgress = document.getElementById("scroll-progress");

  const onScroll = () => {
    // progress
    if (scrollProgress) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollProgress.style.transform = `scaleX(${ratio})`;
    }

    // glow parallax
    if (g1 && g2) {
      const y = window.scrollY || 0;
      g1.style.transform = `translate3d(0, ${y * 0.05}px, 0)`;
      g2.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
    }

    // story highlight
    activateClosestStep();
  };

  // Run once on load
  onScroll();

  // Attach listeners
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // (Optional) Mobile menu — only if you have those IDs in HTML
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }
});

// =========================
// Global events
// =========================
window.addEventListener("click", function (event) {
  if (event.target.classList && event.target.classList.contains("modal")) {
    event.target.classList.remove("is-open");
    if (!document.querySelector(".modal.is-open")) lockScroll(false);
  }
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.is-open").forEach((modal) => {
      modal.classList.remove("is-open");
    });
    lockScroll(false);
  }
});
