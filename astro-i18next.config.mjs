/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLanguage: "en",
  supportedLanguages: ["en", "th"],
  i18next: {
    // debug is convenient during development to check for missing keys
    debug: false,
    initImmediate: false,
    backend: {
      loadPath: "./src/locales/{{lng}}.json",
    },
  },
  i18nextPlugins: { fsBackend: "i18next-fs-backend" },
};
