import useHttp from "@/composable/useHttp";
import { sortBy } from "lodash-es";

export interface GetBannerAPIResponse {
  id: number;
  name: string;
  locations: string[];
  locales: string[];
  targetUrl: string;
  mobileVersions: { url: string }[];
  desktopVersions: { url: string }[];
  captions: string[];
  active: boolean;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  restaurantTagGroupId: null;
  mobileRetinaVersions: {
    url: string;
  }[];
  desktopRetinaVersions: {
    url: string;
  }[];
  restaurantTagId: null;
  description: null;
  descriptionTh: null;
  descriptionEn: null;
}

async function getBanners(cityId: string | number): Promise<{
  isSuccess: boolean;
  data: null | GetBannerAPIResponse[];
  message: string;
}> {
  const defaultErrorMessage = "failed get promotion list";
  try {
    if ((typeof cityId !== "string" && typeof cityId !== "number") || !cityId) {
      return {
        isSuccess: false,
        message: "Invalid city id",
        data: null,
      };
    }
    const { data, error } = await useHttp({
      url: `/banners.json?city_id=${cityId}`,
      method: "GET",
      headers: {},
    });
    const responseData = data as GetBannerAPIResponse[];
    const errorMessage = error.message || defaultErrorMessage;
    if (Array.isArray(responseData)) {
      return {
        isSuccess: true,
        data: sortBy(responseData, ["orderNumber"]) as GetBannerAPIResponse[],
        message: errorMessage,
      };
    } else {
      return {
        isSuccess: true,
        data: null,
        message: defaultErrorMessage,
      };
    }
  } catch (err: any) {
    return {
      isSuccess: false,
      data: null,
      message: "failed get promotion list",
    };
  }
}

export { getBanners };
