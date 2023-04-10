import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { RegexContext } from "../contexts/RegexContext";
import { Modal } from "react-bootstrap";
import { TwitterPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeOff,
  faExclamationCircle,
  faTimes,
  faPalette,
  faBook,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const Icons = React.memo(({ t }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { audioOn, setAudioOn, playAudio } = useContext(RegexContext);
  const { pathname, query, locale, asPath } = router;

  const soundIcon = useMemo(() => t("ton-icon"), [t]);
  const erklärungIcon = useMemo(() => t("erklärung-icon"), [t]);
  const colorIcon = useMemo(() => t("farbauswahl-icon"), [t]);
  const changelogIcon = useMemo(() => t("changelog-icon"), [t]);
  const spracheIcon = useMemo(() => t("sprache-icon"), [t]);

  const [displayHoverText, setDisplayHoverText] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showChangelogModal, setShowChangelogModal] = useState(false);
  const [color, setColor] = useState("--primary");
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastSelectedColor, setLastSelectedColor] = useState(null);

  const toggleSound = useCallback(() => {
    setAudioOn((prevState) => {
      const newAudioOn = !prevState;
      if (typeof window !== "undefined") {
        localStorage.setItem("audioOn", newAudioOn);
      }
      toast.info(newAudioOn ? t("alert-sound-aus") : t("alert-sound-an"));
      playAudio();
      return newAudioOn;
    });
  }, [setAudioOn, playAudio, t, toast]);

  const handleInfoClose = useCallback(() => {
    playAudio();
    setShowInfoModal(false);
    setDisplayHoverText(true);
  }, [playAudio, setShowInfoModal, setDisplayHoverText]);

  const handleInfoShow = useCallback(() => {
    playAudio();
    setShowInfoModal(true);
  }, [playAudio, setShowInfoModal]);

  const handleChangelogClose = useCallback(() => {
    playAudio();
    setShowChangelogModal(false);
    setDisplayHoverText(true);
  }, [playAudio, setShowChangelogModal, setDisplayHoverText]);

  const handleChangelogShow = useCallback(() => {
    playAudio();
    setShowChangelogModal(true);
    setDisplayHoverText(false);
  }, [playAudio, setShowChangelogModal, setDisplayHoverText]);

  const handleColorPickerClose = useCallback(() => {
    playAudio();
    setShowColorPickerModal(false);
    setDisplayHoverText(true);
  }, [playAudio, setShowColorPickerModal, setDisplayHoverText]);

  const handleColorChange = useCallback(
    (color) => {
      const hex = color.hex;
      setColor(hex);

      if (hex === lastSelectedColor) {
        return;
      }

      setLastSelectedColor(hex);
      localStorage.setItem("--primary", hex);
      document.documentElement.style.setProperty("--primary", hex);
      toast.info(t("alert-farbe-geändert"));
      playAudio();
      setShowColorPickerModal(false);
      setDisplayHoverText(true);
    },
    [
      setColor,
      t,
      toast,
      playAudio,
      lastSelectedColor,
      setShowColorPickerModal,
      setDisplayHoverText,
    ]
  );

  const resetColor = useCallback(() => {
    const defaultColor = "#595afe";
    const savedColor =
      window?.localStorage?.getItem("--primary") || defaultColor;
    if (savedColor === defaultColor) {
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("--primary", defaultColor);
    }
    document.documentElement.style.setProperty("--primary", defaultColor);
    setLastSelectedColor(null);
    toast.info(t("alert-farbe-zurückgesetzt"));
    handleColorPickerClose();
  }, [handleColorPickerClose, t]);

  const handleColorPickerShow = useCallback(
    (event) => {
      event.stopPropagation();
      playAudio();
      setShowColorPickerModal((prevState) => !prevState);
      setDisplayHoverText(showColorPickerModal ? true : false);
      setDropdownOpen(false);
    },
    [playAudio, showColorPickerModal]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem("--primary");
      if (savedColor) {
        document.documentElement.style.setProperty("--primary", savedColor);
      }
    }
  }, []);

  const currentLanguage = useMemo(() => locale, [locale]);

  const languages = useMemo(
    () => ({
      en: "Englisch.",
      de: "German.",
    }),
    []
  );

  const setCookie = (locale) => {
    document.cookie = `Language=${locale}; max-age=31536000; path=/`;
  };

  const handleLanguageChange = useCallback(
    (event) => {
      const selectedLanguage = event.target.value;
      i18n.changeLanguage(selectedLanguage);
      Cookies.set("i18next", selectedLanguage);
      setCookie(selectedLanguage);
      if (typeof window !== "undefined") {
        localStorage.setItem("language", selectedLanguage);
      }
      toast.info(`${t("alert-sprache")} ${languages[selectedLanguage]}`);
      playAudio();
      setDropdownOpen(false);
      setDisplayHoverText(true);
      // router.push({ pathname, query }, asPath, { locale: selectedLanguage });
    },
    [
      setCookie,
      toast,
      playAudio,
      setDropdownOpen,
      setDisplayHoverText,
      router,
      t,
      languages,
    ]
  );

  const handleLanguageClick = useCallback(() => {
    setDropdownOpen((prevState) => !prevState);
    setShowColorPickerModal(false);
    setDisplayHoverText(dropdownOpen ? true : false);
    playAudio();
  }, [
    setDropdownOpen,
    setShowColorPickerModal,
    setDisplayHoverText,
    dropdownOpen,
    playAudio,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".color-picker") ||
        event.target.closest(".sprache")
      )
        return;
      if (!showColorPickerModal && !dropdownOpen) return;
      setShowColorPickerModal(false);
      setDropdownOpen(false);
      setDisplayHoverText(true);
      playAudio();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    setShowColorPickerModal,
    setDropdownOpen,
    playAudio,
    showColorPickerModal,
    dropdownOpen,
  ]);

  return (
    <React.Fragment>
      <div className="settings d-flex justify-content-center">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className={`sound ${displayHoverText ? "" : "hide-hover-text"} ${
                audioOn ? "sound-on" : "sound-off"
              } mx-3`}
              onClick={toggleSound}
              data-text-sound={soundIcon}
            >
              {audioOn ? (
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  style={{ cursor: "pointer", fontSize: "1.4em" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faVolumeOff}
                  style={{ cursor: "pointer", fontSize: "1.4em" }}
                />
              )}
            </div>
            <div
              className={`info mx-3 ${
                displayHoverText ? "" : "hide-hover-text"
              }`}
              data-text-info={erklärungIcon}
            >
              <FontAwesomeIcon
                icon={faExclamationCircle}
                onClick={handleInfoShow}
                style={{ cursor: "pointer", fontSize: "1.4em" }}
              />
              <Modal
                className="info-modal"
                show={showInfoModal}
                onHide={handleInfoClose}
              >
                <Modal.Body>
                  <button
                    className="modal-close-icon"
                    onClick={handleInfoClose}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ cursor: "pointer", fontSize: "1.6em" }}
                    />
                  </button>
                  <div className="info-title text-center">
                    <h3>{t("erklärung-icon")}</h3>
                  </div>
                  <div className="info-text text-center">
                    <p>
                      {t("erklärung-text")}
                      <span className="point">.</span>
                    </p>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div
              className={`changelog mx-3 ${
                displayHoverText ? "" : "hide-hover-text"
              }`}
              data-text-changelog={changelogIcon}
            >
              <FontAwesomeIcon
                icon={faBook}
                onClick={handleChangelogShow}
                style={{ cursor: "pointer", fontSize: "1.4em" }}
              />
              <Modal
                className="changelog-modal"
                show={showChangelogModal}
                onHide={handleChangelogClose}
              >
                <Modal.Body>
                  <button
                    className="modal-close-icon"
                    onClick={handleChangelogClose}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ cursor: "pointer", fontSize: "1.6em" }}
                    />
                  </button>
                  <div className="changelog-title text-center">
                    <h3>{t("changelog-icon")}</h3>
                  </div>
                  <React.Fragment>
                    <div className="changelog-text text-center">
                      <p>07.02.2023 / VERSION: 4.0.0</p>
                      <p className="mt-5 mb-5">
                        <span className="point">»</span> {t("changelog-text-1")}
                      </p>
                      <p className="mb-5">
                        <span className="point">»</span> {t("changelog-text-2")}
                      </p>
                      {/* <p><span className="point">»</span> {t("changelog-text-3")}</p> */}
                    </div>
                  </React.Fragment>
                </Modal.Body>
              </Modal>
            </div>
            <div style={{ position: "relative" }}>
              <div
                className={`sprache mx-3 ${
                  displayHoverText ? "" : "hide-hover-text"
                }`}
                onClick={handleLanguageClick}
                data-text-sprache={spracheIcon}
              >
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ cursor: "pointer", fontSize: "1.4em" }}
                />
              </div>
              {dropdownOpen && (
                <div className="dropdown">
                  <button
                    className={`dropdown-item ${
                      i18n.language === "en" ? "hide" : ""
                    }`}
                    type="button"
                    onClick={handleLanguageChange}
                    value="en"
                  >
                    Englisch
                  </button>
                  <button
                    className={`dropdown-item ${
                      i18n.language === "de" ? "hide" : ""
                    }`}
                    type="button"
                    onClick={handleLanguageChange}
                    value="de"
                  >
                    German
                  </button>
                </div>
              )}
            </div>
            <div className="color-picker">
              <div
                className={`color-picker-button d-flex align-items-center mx-3 ${
                  displayHoverText ? "" : "hide-hover-text"
                }`}
                onClick={handleColorPickerShow}
                data-text-color={colorIcon}
              >
                <FontAwesomeIcon
                  icon={faPalette}
                  style={{ cursor: "pointer", fontSize: "1.4em" }}
                />
              </div>
              {showColorPickerModal && (
                <>
                  <TwitterPicker
                    triangle={"hide"}
                    color={color}
                    onChange={handleColorChange}
                    styles={{
                      default: {
                        input: {
                          display: "none",
                        },
                        hash: {
                          display: "none",
                        },
                      },
                    }}
                  />
                  <button onClick={resetColor} className="btn-reset">
                    {t("zurücksetzen")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Icons;
