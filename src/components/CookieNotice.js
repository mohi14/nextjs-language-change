import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { RegexContext } from "../contexts/RegexContext";
import translations from "./translations";
import { useTranslation } from "react-i18next";

function CookieNotice() {
  const { playAudio } = useContext(RegexContext);

  const [show, setShow] = useState(false);
  const { i18n } = useTranslation();

  const { locale } = useRouter();

  const t = useMemo(() => {
    return i18n.language === "en" ? translations.en : translations.de;
  }, [i18n]);

  useEffect(() => {
    if (!localStorage.getItem("acceptedCookies")) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("acceptedCookies", true);
    setShow(false);
    playAudio();
    toast.success(t["cookie-akzeptiert-nachricht"]);
  };

  return (
    <Modal
      className="cookie-model"
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Body>
        <div className="cookie-title text-center">
          <h3>{t["cookie-titel"]}</h3>
        </div>
        <p className="text-center">{t["cookie-text"]}</p>
        <div className="d-flex justify-content-center mt-5">
          <Button variant="secondary" onClick={handleClose}>
            {t["cookie-akzeptieren"]}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CookieNotice;
