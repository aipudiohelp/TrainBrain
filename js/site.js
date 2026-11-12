(() => {
  "use strict";

  const menuButton = document.getElementById("menuToggle");
  const navigation = document.getElementById("primary-navigation");

  function setMenuOpen(open) {
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  const yearText = document.getElementById("year").firstChild;
  if (yearText) yearText.nodeValue = String(new Date().getFullYear());
})();
