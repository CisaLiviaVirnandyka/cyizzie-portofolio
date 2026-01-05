// set year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// toast helper
const toastEl = document.getElementById("toast");
function toast(msg){
  if(!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__t);
  window.__t = setTimeout(()=>toastEl.classList.remove("show"), 1600);
}
window.toast = toast;

// active nav (by body data-page)
const page = document.body.getAttribute("data-page");
document.querySelectorAll("[data-nav]").forEach(a=>{
  if (a.getAttribute("data-nav") === page) a.classList.add("active");
});

// copy email (optional)
const copyBtn = document.getElementById("copyEmail");
if(copyBtn){
  const email = copyBtn.getAttribute("data-email") || "morgan@email.com";
  copyBtn.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(email);
      toast("Email ke-copy 📩");
    }catch(e){
      toast("Gagal copy (browser block).");
    }
  });
}
