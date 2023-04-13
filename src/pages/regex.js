import React, { useEffect, useState } from "react";
import CreateProfile from "@/components/ProfileSettings";
import EditProfile from "@/components/EditProfile";
import Header from "@/components/Header";
import Output from "@/components/Output";
import ProfileSettings from "@/components/CreateProfile";
import RegexForm from "@/components/RegexForm";
import Head from "next/head";
import { useRouter } from "next/router";
import translations from "@/components/translations";
import { useTranslation } from "react-i18next";

export default function RegexApp({
  showCreateProfileModal,
  handleCloseCreateProfileModal,
  showProfileSettingsModal,
  handleCloseProfileSettingsModal,
  showEditProfileModal,
  handleCloseEditProfileModal,
}) {
  const { locale } = useRouter();
  const { i18n } = useTranslation();

; 
  const t =
    i18n.language === "en"
      ? function (str) {
          return translations.en[str];
        }
      : function (str) {
          return translations.de[str];
        };

  useEffect(() => {});
  return (
    <>
      <Head>
        <title>hades | regex</title>
        <meta
          name="description"
          content="The website allows you to quickly and easily create custom RegEx rules not only for Fossabot, but also for a variety of other applications."
        ></meta>
        <meta
          name="keywords"
          content="Regex, regular expressions, creating regex, Fossabot regex"
        ></meta>
      </Head>

      <div className="position-relative">
        <Header t={t} />
        <RegexForm t={t} />
        <Output t={t} />
      </div>

      <div className="profile-modal">
        <CreateProfile
          t={t}
          show={showCreateProfileModal}
          onHide={handleCloseCreateProfileModal}
        />
        <ProfileSettings
          t={t}
          show={showProfileSettingsModal}
          onHide={handleCloseProfileSettingsModal}
        />
        <EditProfile
          t={t}
          show={showEditProfileModal}
          onHide={handleCloseEditProfileModal}
        />
      </div>
    </>
  );
}
