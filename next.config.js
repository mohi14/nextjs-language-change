/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },

  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
