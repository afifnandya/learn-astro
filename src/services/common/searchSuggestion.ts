import {
  getSearchSuggestion as searchSuggestion,
  SearchSuggestionResponse,
} from "@/api/common/searchSuggestion";
import { linkToRestaurantPage } from "@/helper/restaurant";
import qs from "qs";

type RestaurantSearchSuggestion =
  SearchSuggestionResponse["data"]["restaurants"][0] & {
    getLink: () => string;
  };

type CuisineSearchSuggestion =
  SearchSuggestionResponse["data"]["cuisines"][0] & {
    getLink: () => string;
  };

type LocationSearchSuggestion =
  SearchSuggestionResponse["data"]["locations"][0] & {
    getLink: () => string;
  };

type Data = null | {
  restaurants: RestaurantSearchSuggestion[];
  locations: LocationSearchSuggestion[];
  cuisines: CuisineSearchSuggestion[];
};

type response = {
  data: Data;
  message: SearchSuggestionResponse["message"];
};

async function getSearchSuggestion(keyword: string, cityId?: number) {
  const { isSuccess, data, message, meta } = await searchSuggestion(
    keyword,
    cityId
  );
  const resposneData = data as Data;
  if (isSuccess && resposneData) {
    resposneData.restaurants.forEach((restaurant) => {
      restaurant.getLink = () => linkToRestaurantPage(restaurant.slug);
    });

    resposneData.cuisines.forEach((cuisine) => {
      cuisine.getLink = () =>
        `/restaurants/search?${qs.stringify(
          {
            cuisine: [cuisine.id],
          },
          { arrayFormat: "brackets" }
        )}`;
    });

    resposneData.cuisines.forEach((location) => {
      location.getLink = () =>
        `/restaurants/search?${qs.stringify(
          {
            location: [location.id],
          },
          { arrayFormat: "brackets" }
        )}`;
    });
  }

  return { isSuccess, data: resposneData, message, meta };
}

export { getSearchSuggestion };
export type {
  RestaurantSearchSuggestion,
  CuisineSearchSuggestion,
  LocationSearchSuggestion,
};
