/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "de"],
  //   localeDetection: false,
  // },
  async rewrites() {
    return [
      {
        source: "/de/regex",
        destination: "/kllklk",
      },
      {
        source: "/de",
        destination: "/jkjk",
      },
    ];
  },

  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
