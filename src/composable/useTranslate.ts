import i18next, { changeLanguage } from "i18next";
import en from "@/locales/en.json";
import th from "@/locales/th.json";
import { useStorage } from "@vueuse/core";

const DEFAULT_LANG = "en";

const storedLang = useStorage("hh-lang", DEFAULT_LANG);

export function getCurrentLang() {
  if (window) {
    return storedLang.value;
  }
  return DEFAULT_LANG;
}

export function init() {
  i18next.init({
    lng: getCurrentLang(), // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: {
          hei: "Hei in EN",
          ...en,
        },
      },
      th: {
        translation: {
          hei: "Hei in th",
          ...th,
        },
      },
    },
  });
}

export function changeLang(lang: string) {
  storedLang.value = lang;
  changeLanguage(lang);
  if (window) {
    window.location.reload();
  }
}

export function translate(key: string) {
  return i18next.t(key);
}
