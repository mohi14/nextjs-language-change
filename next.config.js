/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    localeDetection: false,
    domains: [
      {
        domain: "localhost",
        defaultLocale: "en",
        http: true,
      },
    ],
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
