import i18next from "i18next";
import en from "@/locales/en.json";
import th from "@/locales/th.json";
import Cookies from "js-cookie";
import { isClient } from "@vueuse/shared";
import { DEFAULT_LANG } from "@/constants";
import { getLang } from "@/stores/config";

const resources = {
  // debug: true,
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
};
async function init(lang?: string) {
  const usedLang = lang || DEFAULT_LANG;
  console.log("used lang", usedLang);
  Cookies.set("astro-lang", usedLang);
  const option = {
    lng: usedLang, // if you're using a language detector, do not define the lng option
    // debug: true,
    resources,
  };
  await i18next.init(option);
}

if (isClient) {
  await init(getLang());
}

function changeLang(lang: string) {
  i18next.changeLanguage(lang);
}

const translate = i18next.t;
const serverTranslate = isClient ? () => {} : i18next.t;

function addTranslate(translate: Record<string, any>) {
  console.log("adding translate");
  for (const lang in translate) {
    i18next.addResources(lang, "translation", translate[lang]);
  }
}

function addLang() {
  i18next.addResources("en", "translation", {
    kucing: "CAT",
    kambing: "Goat",
  });
  i18next.addResources("th", "translation", {
    kucing: "kucing",
    kambing: "kambing",
  });
}

export { init, addLang, addTranslate, translate, changeLang, serverTranslate };
