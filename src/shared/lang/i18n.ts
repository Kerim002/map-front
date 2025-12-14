import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import tk from "./locales/tk.json";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tk: { translation: tk },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // This array defines the order of language detection:
      // Try to get the language from localStorage first.
      // Fall back to the browser's language setting ('navigator').
      order: ["localStorage", "navigator"],

      // This array defines where to cache the language once it's set.
      // When a user changes the language using i18n.changeLanguage(),
      // the detector will automatically save the new language code here.
      caches: ["localStorage"],

      // Optional: You can specify the key used in localStorage
      // (default is 'i18nextLng').
      // lookupLocalStorage: 'myAppLangKey',
    },
  });

export default i18n;
