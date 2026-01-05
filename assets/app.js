// =====================
// Cyizzie Porto - app.js
// =====================

// set year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// toast helper
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => t.classList.remove("show"), 1600);
}
window.toast = toast;

// active nav (by body data-page)
const page = document.body.dataset.page || document.body.getAttribute("data-page");
if (page) {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    if (el.dataset.nav === page) el.classList.add("active");
  });
}

// copy email (supports data-email attr)
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email =
      copyBtn.dataset.email ||
      copyBtn.getAttribute("data-email") ||
      "cyizziee@email.com";

    try {
      await navigator.clipboard.writeText(email);
      toast("Email ke-copy 📩");
    } catch (e) {
      toast("Gagal copy 😭");
    }
  });
}

// ===== dark mode toggle =====
const toggle = document.getElementById("themeToggle");

// apply saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.setAttribute("data-theme", "dark");

function syncToggleIcon() {
  if (!toggle) return;
  const isDark = document.body.getAttribute("data-theme") === "dark";
  toggle.textContent = isDark ? "☀️" : "🌙";
}
syncToggleIcon();

if (toggle) {
  toggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "");
      toast("Light mode ☀️");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      toast("Dark mode on 🌙");
    }

    syncToggleIcon();
  });
}
