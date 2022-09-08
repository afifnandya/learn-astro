import { ref } from "vue";
import type { GetConfigAPI } from "@/api/common/config";
import { getConfig } from "@/api/common/config";
import { DEFAULT_LANG } from "@/constants";
import { isClient } from "@vueuse/shared";

const config = ref<GetConfigAPI["data"]>({
  enableGiftCardFeature: false,
  weTravelTogetherIconUrl: "",
  showDistanceOnSearchPage: false,
  cultureLocale: "",
  availableLocales: [],
  cdnUrl: "",
  appTitle: "",
  appDescription: "",
  totalRestaurant: 0,
  totalCovers: 0,
  supportPhone: "",
  maxImageFileSizeInMb: 0,
  selectedPaymentProvider: {
    promptpay: "",
    cc: "",
  },
  restaurantPriceRange: {
    min: 0,
    max: 0,
    currency: "",
  },
  promptpayUnsupportedBanks: [],
  promptpayCountdown: 0,
  termConditionBigGroup: "",
  gbPrimepayPublicKey: "",
  cities: [],
  dynamicPoints: {
    reviewReservation: 0,
    newUserVoucherPoint: 0,
    earlyBird: {
      maxReviews: 0,
      point: 0,
    },
    referrerRewardPoint: 0,
  },
  packageList: {
    ayce: "",
    pp: "",
    xp: "",
    hah: "",
    hs: "",
    sm: "",
    bfp: "",
  },
  packageTagLines: {
    ayce: "",
    pp: "",
    xp: "",
    hah: "",
    hs: "",
    sm: "",
    bfp: "",
  },
  useAsyncBooking: false,
  wttLinkUrl: "",
  bannerVoucherUrl: "",
  mobileBannerVoucherUrl: "",
  webV2Host: "",
  limitedSeatsShowing: "",
  deliveryFeeCurrency: "",
  deliveryFeePerKmInBaht: 0,
  freeDeliveryFeeThresholdInBaht: 0,
  deliveryRadius: 0,
  minGroupBookingPartySize: 0,
  deliveryFeeInBaht: 0,
});

const path = isClient ? window.location.pathname.split("/") : [];
const clientLang = path.length ? path[1] : DEFAULT_LANG;
let serverLang = "";

async function setupConfig() {
  const { data, isSuccess } = await getConfig();
  if (isSuccess && data) {
    config.value = data;
  }
}

function setServerLang(lang: string) {
  serverLang = lang;
}

function getLang() {
  if (isClient) {
    return clientLang;
  }
  return serverLang;
}

export { setupConfig, config, clientLang, serverLang, setServerLang, getLang };
