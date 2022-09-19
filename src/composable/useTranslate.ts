import i18next, { InitOptions } from "i18next";
import en from "@/locales/en.json";
import th from "@/locales/th.json";
import commonEN from "@/locales/en/common.json";
import commonTH from "@/locales/th/common.json";
import Cookies from "js-cookie";
import { isClient } from "@/helper/env";
import { DEFAULT_LANG } from "@/constants";
import { getLang } from "@/stores/config";

let isClientInit = false;

const resources = {
  // debug: true,
  en: {
    common: commonEN,
    translation: {
      hei: "Hei in EN",
      ...en,
    },
  },
  th: {
    common: commonTH,
    translation: {
      hei: "Hei in th",
      ...th,
    },
  },
};

async function init(lang?: string) {
  if (isClient) {
    if (isClientInit) {
      return;
    }
  }
  const usedLang = lang || DEFAULT_LANG;
  console.log("used lang", usedLang);
  Cookies.set("astro-lang", usedLang);
  const option: InitOptions = {
    lng: usedLang,
    ns: ["common"],
    defaultNS: "common",
    fallbackNS: "common",
    // debug: true,
    resources,
  };
  await i18next.init(option);
}

// if (isClient) {
//   await init(getLang());
// }

function changeLang(lang: string) {
  i18next.changeLanguage(lang);
}

const translate = i18next.t;
const serverTranslate = isClient ? () => {} : i18next.t;

async function addTranslate(translate: Record<string, any>) {
  console.log("adding translate", translate);
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
