import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/common.json";
import hi from "../locales/hi/common.json";
import mr from "../locales/mr/common.json";

const savedLng = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      mr: { translation: mr },
    },
    lng: savedLng || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
