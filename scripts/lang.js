let isPidgin = false;

document.getElementById("toggleLang").addEventListener("click", () => {
  const elements = document.querySelectorAll("[data-en]");

  elements.forEach(el => {
    el.textContent = isPidgin ? el.dataset.en : el.dataset.pg;
  });

  document.getElementById("toggleLang").title =
    isPidgin ? "Pidgin" : "English";

  isPidgin = !isPidgin;
});
