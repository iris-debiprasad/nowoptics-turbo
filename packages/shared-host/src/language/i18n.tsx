import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// TODO in future
// import Backend from 'i18next-http-backend';

import translationEN from "../../public/locales/en/translation.json";
import translationDE from "../../public/locales/de/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n
  // .use(Backend) // TODO in future
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
