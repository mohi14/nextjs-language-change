import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import localFont from "@next/font/local";
import { RegexProvider } from "../contexts/RegexContext";
import CookieNotice from "../components/CookieNotice";
import { useRouter } from "next/router";
import translations from "@/components/translations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { appWithTranslation, useTranslation } from "next-i18next";
import i18n from "../../i18n";

const publicPixel = localFont({
  src: "../../public/fonts/PublicPixel.ttf",
});

const options = {
  position: "bottom-right",
  autoClose: 1300,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: false,
};

function App({ Component, pageProps }) {
  const { locale } = useRouter();
  const { i18n } = useTranslation();
  const t =
    i18n.language === "en"
      ? function (str) {
          return translations.en[str];
        }
      : function (str) {
          return translations.de[str];
        };
  return (
    <>
      <ToastContainer {...options} />
      <RegexProvider t={t}>
        <div className={`container ${publicPixel.className}`}>
          <CookieNotice />
          <Component {...pageProps} />
        </div>
      </RegexProvider>
    </>
  );
}

export default appWithTranslation(App);
