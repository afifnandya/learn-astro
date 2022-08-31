import useHttp from "@/composable/useHttp";
import { isEmpty } from "lodash-es";

export interface SearchSuggestionResponse {
  data: {
    restaurants: {
      id: number;
      slug: string;
      coverImage: string;
      name: string;
      menuName: string;
      location: string;
      cuisine: string;
      cityId: string;
    }[];
    locations: ResultSection[];
    cuisines: ResultSection[];
    staycations: ResultSection[];
  };
  links: {
    first: string;
    last: string;
    next: string;
    before: null;
    self: string;
  };
  message: null;
  success: boolean;
  didYouMean: any[];
}

type ResultSection = {
  id: number;
  type: string;
  attributes: {
    name: string;
    totalRestaurants: string;
  };
};

async function getSearchSuggestion(
  keyword: string,
  cityId = 1
): Promise<{
  isSuccess: boolean;
  data: null | {
    restaurants: SearchSuggestionResponse["data"]["restaurants"];
    locations: SearchSuggestionResponse["data"]["locations"];
    cuisines: SearchSuggestionResponse["data"]["cuisines"];
  };
  meta: null | {
    links: SearchSuggestionResponse["links"];
    didYouMean: SearchSuggestionResponse["didYouMean"];
  };
  message: string;
}> {
  if (!keyword || (keyword && keyword.length === 0)) {
    return {
      isSuccess: false,
      message: "Invalid keyword param",
      data: null,
      meta: null,
    };
  }
  const defaultErrorMessage =
    "Oops, something went wrong, failed get search suggestion";

  let url = `/suggest.json?keyword=${encodeURIComponent(
    keyword
  )}&page[size]=10&page[number]=1`;

  if (cityId) {
    url = `${url}&city_id=${cityId}`;
  }

  if (keyword.length === 0) {
    return {
      isSuccess: true,
      data: {
        restaurants: [],
        locations: [],
        cuisines: [],
      },
      message: "",
      meta: null,
    };
  }

  try {
    const { error, data } = await useHttp({
      url: url,
      method: "GET",
    });

    const response = data as SearchSuggestionResponse;
    if (!response.success) {
      return {
        isSuccess: false,
        message: error.message || defaultErrorMessage,
        data: null,
        meta: null,
      };
    }
    if (isEmpty(response.data)) {
      return {
        isSuccess: false,
        message: "empty response data",
        data: null,
        meta: null,
      };
    }
    return {
      isSuccess: true,
      data: response.data,
      meta: null,
      message: "",
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      data: null,
      meta: null,
      message: err.message || defaultErrorMessage,
    };
  }
}

async function getAdsSearchSuggestion(): Promise<{
  isSuccess: boolean;
  data: any;
  message: string;
}> {
  const defaultErrorMessage =
    "Oops, something went wrong, failed get ads search suggestion";

  const url = `/suggest_ads.json`;
  try {
    const { data, error } = await useHttp({
      url: url,
      method: "GET",
    });
    const result = data as any;
    if (result.data) {
      if (result.data.data?.restaurants && result.data.success) {
        return {
          isSuccess: true,
          data: result.data.data.restaurants,
          message: result.data.message,
        };
      }
      return {
        isSuccess: false,
        data: "",
        message: result.data.message || defaultErrorMessage,
      };
    }
    return {
      isSuccess: false,
      data: "",
      message: defaultErrorMessage,
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      data: "",
      message: err.message || defaultErrorMessage,
    };
  }
}

export { getSearchSuggestion, getAdsSearchSuggestion };
