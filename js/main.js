// =========================
// Helpers
// =========================
function lockScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

// =========================
// Modals (called from HTML onclick)
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
  const anyOpen = document.querySelector(".modal.is-open");
  if (!anyOpen) lockScroll(false);
}

// Make modal functions available globally (for inline onclick)
window.openModal = openModal;
window.closeModal = closeModal;

// =========================
// DOM Ready
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // AOS Init (safe)
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

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  // Scroll progress bar
  const scrollProgress = document.getElementById("scroll-progress");
  if (scrollProgress) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;

      scrollProgress.style.transform = `scaleX(${ratio})`;
    });
  }
});

// =========================
// Global events (outside click + ESC)
// =========================

// Close modal on outside click
window.addEventListener("click", function (event) {
  if (event.target.classList && event.target.classList.contains("modal")) {
    event.target.classList.remove("is-open");

    const anyOpen = document.querySelector(".modal.is-open");
    if (!anyOpen) lockScroll(false);
  }
});

// Close modal on ESC
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.is-open").forEach((modal) => {
      modal.classList.remove("is-open");
    });
    lockScroll(false);
  }
});
