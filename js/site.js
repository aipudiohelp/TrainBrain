(() => {
  "use strict";

  const languageButton = document.getElementById("langBtn");
  const menuButton = document.getElementById("menuToggle");
  const navigation = document.getElementById("primary-navigation");
  const languageMeta = {
    en: {
      title: "TrainBrain | Executive Consultancy & Skills Development",
      description: "TrainBrain — Executive consultancy and skills development for financial institutions and corporate organizations.",
      open: "Open navigation",
      close: "Close navigation",
      switchTo: "Switch language to Arabic",
      button: "العربية",
      locale: "en_US"
    },
    ar: {
      title: "TrainBrain | الاستشارات التنفيذية وتطوير المهارات",
      description: "TrainBrain للاستشارات التنفيذية وتطوير المهارات للمؤسسات المالية والشركات.",
      open: "فتح قائمة التنقل",
      close: "إغلاق قائمة التنقل",
      switchTo: "تغيير اللغة إلى الإنجليزية",
      button: "English",
      locale: "ar_EG"
    }
  };

  function setMenuOpen(open) {
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    const lang = document.documentElement.lang === "ar" ? "ar" : "en";
    menuButton.setAttribute("aria-label", open ? languageMeta[lang].close : languageMeta[lang].open);
  }

  function setLanguage(lang, persist = true) {
    const current = lang === "ar" ? "ar" : "en";
    const copy = languageMeta[current];
    document.documentElement.lang = current;
    document.documentElement.dir = current === "ar" ? "rtl" : "ltr";
    document.body.dir = document.documentElement.dir;

    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      const textNode = Array.from(element.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ""
      );
      if (textNode) textNode.nodeValue = element.dataset[current];
    });

    document.querySelectorAll("[data-alt-en][data-alt-ar]").forEach((element) => {
      element.setAttribute("alt", element.dataset[`alt-${current}`]);
    });
    document.querySelectorAll("[data-label-en][data-label-ar]").forEach((element) => {
      element.setAttribute("aria-label", element.dataset[`label-${current}`]);
    });

    document.title = copy.title;
    document.querySelector('meta[name="description"]').setAttribute("content", copy.description);
    document.querySelector('meta[property="og:title"]').setAttribute("content", copy.title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", copy.description);
    document.querySelector('meta[property="og:locale"]').setAttribute("content", copy.locale);
    languageButton.setAttribute("aria-label", copy.switchTo);
    setMenuOpen(navigation.classList.contains("is-open"));

    if (persist) {
      try {
        window.localStorage.setItem("trainbrain-lang", current);
      } catch (_) {
        // Language switching still works when browser storage is unavailable.
      }
    }
  }

  languageButton.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "en" ? "ar" : "en");
  });

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

  let savedLanguage = "en";
  try {
    const stored = window.localStorage.getItem("trainbrain-lang");
    if (stored === "ar" || stored === "en") savedLanguage = stored;
  } catch (_) {
    // English is the default when browser storage is unavailable.
  }
  setLanguage(savedLanguage, false);
})();
