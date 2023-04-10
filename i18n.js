import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

i18n.use(initReactI18next).init({
  //   lng: Cookies.get("i18next") || "en",
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "de"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
