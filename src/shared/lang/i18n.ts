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
    supportedLngs: ["en", "tk", "ru"],
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    detection: {

      order: ["localStorage", "navigator"],

      caches: ["localStorage"],

    },
  });

export default i18n;
