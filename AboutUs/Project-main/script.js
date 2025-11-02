function goToMenu() {
  window.location.href = "menu.html";
}

window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "1";
  }, 100);
});
