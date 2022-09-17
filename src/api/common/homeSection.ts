import useHttp from "@/composable/useHttp";
import { isEmpty } from "lodash-es";
import { API_MINOR_VERSION } from "@/constants";
import type { FeaturedRestaurant } from "@/types/Restaurant";

export interface RestaurantTags {
  id: string;
  type: "restaurant_tags";
  attributes: {
    cover: {
      url: string;
    };
    title: string;
    titleEn: string;
    tagType: string | null;
    totalRestaurants: number;
  };
}

export interface Branch {
  id: string;
  type: "branches";
  attributes: {
    name: string;
    totalRestaurants: number;
    logo: string;
  };
}

export interface FeaturedRestaurants extends FeaturedRestaurant {
  relationships: {
    groupLandingPage: {
      data: {
        id: number;
        groupType: string;
        groupId: number;
        createdAt: string;
        updatedAt: string;
        slug: string;
        groupSingleType: null;
        sectionType: null;
        title: string;
        description: string;
        footerDescription: null;
        titleTh: string;
        titleEn: string;
        descriptionTh: string;
        descriptionEn: string;
        footerDescriptionTh: null | string;
        footerDescriptionEn: null | string;
      } | null;
    };
    city: {
      data: {
        id: number;
        countryId: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        homeDescription: string;
        homeDescriptionTh: string;
        homeDescriptionEn: string;
      };
    };
  };
}

type SectionData = {
  message: string | null;
  title: string;
  data: FeaturedRestaurants[] | RestaurantTags[];
  clevertapEventName: string;
  links: any;
  ads: any;
  slug: string;
  footer: string;
  description: string;
  success: boolean;
};

export async function getHomeSection({
  pageNumber,
  pageSize,
  order,
  lat,
  lng,
  cityId,
}: {
  pageNumber?: number;
  pageSize?: number;
  order: number;
  lat?: number;
  lng?: number;
  cityId: number | string;
}): Promise<{ isSuccess: boolean; data: null | SectionData; message: string }> {
  if (typeof order !== "number") {
    return {
      isSuccess: false,
      message: "Invalid order or missing order",
      data: null,
    };
  }
  const defaultErrorMessage =
    "Oops, someting went wrong, failed get section data";
  const url = `/homes/section_${order}.json`;

  const param: {
    cityId: number | string;
    apiMinorVersions: string | number;
    page?: {
      size: number;
      number: number;
    };
    location?: {
      lat: number;
      lng: number;
    };
  } = {
    cityId,
    apiMinorVersions: API_MINOR_VERSION,
  };

  if (pageNumber && pageSize) {
    param.page = {
      size: pageSize,
      number: pageNumber,
    };
  }

  if (lat && lng) {
    param.location = {
      lat: lat,
      lng: lng,
    };
  }

  const { data, error } = await useHttp({
    url: url,
    method: "GET",
    params: param,
  });

  const responseData = data as SectionData;

  if (!responseData.success) {
    return {
      isSuccess: false,
      message: responseData.message || defaultErrorMessage,
      data: null,
    };
  }
  return {
    isSuccess: true,
    message: "",
    data: responseData,
  };
}
