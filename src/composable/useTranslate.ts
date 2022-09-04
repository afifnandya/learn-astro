import i18next from "i18next";
import en from "@/locales/en.json";
import th from "@/locales/th.json";

const DEFAULT_LANG = "th";

export async function init(lang?: string) {
  const usedLang = lang || DEFAULT_LANG;
  await i18next.init({
    lng: usedLang, // if you're using a language detector, do not define the lng option
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
  i18next.changeLanguage(lang);
}

export function translate(key: string) {
  return i18next.t(key);
}

export function addLang() {
  i18next.addResources("en", "translation", {
    kucing: "CAT",
    kambing: "Goat",
  });
  i18next.addResources("th", "translation", {
    kucing: "kucing",
    kambing: "kambing",
  });
}
