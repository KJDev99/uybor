// i18n.js
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru/translation.json";
import uz from "./locales/uz/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ru,
    },
    uz: {
      translation: uz,
    },
  },
  lng: "uz", // Default language
  fallbackLng: "ru", // Fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
