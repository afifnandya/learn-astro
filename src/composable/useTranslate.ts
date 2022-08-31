import i18next from "i18next";
import en from "@/locales/en.json";
import th from "@/locales/th.json";
import { useStorage, isClient } from "@vueuse/core";

type I18nInstance = undefined | typeof i18next;

const DEFAULT_LANG = "en";
let i18nInstance = undefined as I18nInstance;
let isInitialized = false;
const storedLang = useStorage("hh-lang", DEFAULT_LANG);

export function getCurrentLang() {
  if (isClient) {
    return storedLang.value;
  }
  return DEFAULT_LANG;
}

export async function init() {
  await i18next.init({
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
  isInitialized = true;
}

export function changeLang(lang: string) {
  storedLang.value = lang;
  i18next.changeLanguage(lang);
  if (window) {
    window.location.reload();
  }
}

export function translate(key: string) {
  if (!isInitialized) {
    init();
    return;
  }
  return i18next.t(key);
}
