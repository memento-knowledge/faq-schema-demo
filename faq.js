document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-block="faq-accordion"] [data-faq-item]').forEach(function (item) {
    var btn = item.querySelector("button.faq-q");
    if (!btn) return;
    var icon = document.createElement("span");
    icon.className = "faq-icon";
    icon.textContent = "+";
    btn.appendChild(icon);
    btn.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      item.classList.toggle("is-open");
      icon.textContent = wasOpen ? "+" : "−";
    });
  });
});
