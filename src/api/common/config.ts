import useHttp from "src/composable/useHttp";
import { API_MINOR_VERSION } from "src/constants";
import { isEmpty } from "lodash-es";

export interface GetConfigAPI {
  success: boolean;
  data: {
    enableGiftCardFeature: boolean;
    weTravelTogetherIconUrl: string;
    showDistanceOnSearchPage: boolean;
    cultureLocale: string;
    availableLocales: string[];
    cdnUrl: string;
    appTitle: string;
    appDescription: string;
    totalRestaurant: number;
    totalCovers: number;
    supportPhone: string;
    maxImageFileSizeInMb: number;
    selectedPaymentProvider: {
      promptpay: string;
      cc: string;
    };
    restaurantPriceRange: {
      min: number;
      max: number;
      currency: string;
    };
    promptpayUnsupportedBanks: string[];
    promptpayCountdown: number;
    termConditionBigGroup: string;
    gbPrimepayPublicKey: string;
    cities: {
      id: number;
      name: string;
    }[];
    dynamicPoints: {
      reviewReservation: number;
      newUserVoucherPoint: number;
      earlyBird: {
        maxReviews: number;
        point: number;
      };
      referrerRewardPoint: number;
    };
    packageList: {
      ayce: string;
      pp: string;
      xp: string;
      hah: string;
      hs: string;
      sm: string;
      bfp: string;
    };
    packageTagLines: {
      ayce: string;
      pp: string;
      xp: string;
      hah: string;
      hs: string;
      sm: string;
      bfp: string;
    };
    useAsyncBooking: boolean;
    wttLinkUrl: string;
    bannerVoucherUrl: string;
    mobileBannerVoucherUrl: string;
    webV2Host: string;
    limitedSeatsShowing: string;
    deliveryFeeCurrency: string;
    deliveryFeePerKmInBaht: number;
    freeDeliveryFeeThresholdInBaht: number;
    deliveryRadius: number;
    minGroupBookingPartySize: number;
    deliveryFeeInBaht: number;
  };
  message: null | string;
}

export async function getConfig(): Promise<{
  isSuccess: boolean;
  message: string;
  data: Record<string, any>;
}> {
  const defaultErrorMessage = "Oops, something went wrong, failed get config";
  try {
    const result = await useHttp({
      method: "GET",
      url: "/config.json",
      params: {
        apiMinorVersion: API_MINOR_VERSION,
      },
    });
    const response = result.data as GetConfigAPI;
    if (isEmpty(response)) {
      return {
        isSuccess: false,
        message: "config object is empty",
        data: {},
      };
    }

    if (!response.success) {
      return {
        isSuccess: false,
        message: response.message || defaultErrorMessage,
        data: {},
      };
    }

    return {
      isSuccess: true,
      message: response.message || "",
      data: response.data,
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      message: defaultErrorMessage,
      data: {},
    };
  }
}
