// =====================
// Cyizzie Portofolio - app.js (fixed)
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

// ===== IMAGE MODAL (GLOBAL - fixed) =====
(() => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalSrc");
  const modalCap = document.getElementById("imgModalCap");

  // modal only exists in projects.html (safe to skip in other pages)
  if (!modal || !modalImg || !modalCap) return;

  function openModal(src, caption, alt) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modalImg.src = src;
    modalImg.alt = alt || "Preview";
    modalCap.textContent = caption || "";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalImg.src = "";
    modalImg.alt = "";
    modalCap.textContent = "";
  }

  // open from any <a data-modal="image">
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[data-modal="image"]');
    if (!a) return;

    e.preventDefault();

    const img = a.querySelector("img");
    const src = a.getAttribute("href");

    // caption: support both new (.media-title) and old (span)
    const caption =
      a.querySelector(".media-title")?.textContent?.trim() ||
      a.querySelector("span")?.textContent?.trim() ||
      "";

    const alt = img?.getAttribute("alt") || "";

    openModal(src, caption, alt);
  });

  // close on backdrop or close button
  modal.addEventListener("click", (e) => {
    if (e.target.matches('[data-close="modal"]')) closeModal();
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
// ===== MOBILE NAV =====
(() => {
  const drawer = document.getElementById("mDrawer");
  const btnMenu = document.getElementById("mMenu");
  const btnThemeMobile = document.getElementById("mTheme");

  if (!drawer) return;

  function openDrawer(){
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer(){
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      drawer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
  }

  // close on backdrop
  drawer.addEventListener("click", (e) => {
    if (e.target.matches('[data-close="m-drawer"]')) closeDrawer();
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });

  // close after click a link
  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeDrawer());
  });

  // mobile theme toggle uses same logic as desktop
  if (btnThemeMobile) {
    btnThemeMobile.addEventListener("click", () => {
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

      // sync icons
      const nowDark = document.body.getAttribute("data-theme") === "dark";
      btnThemeMobile.textContent = nowDark ? "☀️" : "🌙";
      const t = document.getElementById("themeToggle");
      if (t) t.textContent = nowDark ? "☀️" : "🌙";
    });
  }

  // initial icon sync
  const isDark = document.body.getAttribute("data-theme") === "dark";
  if (btnThemeMobile) btnThemeMobile.textContent = isDark ? "☀️" : "🌙";
})();
