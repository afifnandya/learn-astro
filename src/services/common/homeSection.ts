import { getHomeSection as homeSection } from "@/api/common/homeSection";
import type {
  FeaturedRestaurants,
  RestaurantTags,
} from "@/api/common/homeSection";
import { selectedCityId } from "@/stores/city";
import { featuredResturant } from "@/models/restaurant";

function isFeaturedRestaurants(
  sectionData: FeaturedRestaurants | RestaurantTags
): sectionData is FeaturedRestaurants {
  return (sectionData as FeaturedRestaurants).type === "featured_restaurants";
}

async function getHomeSection({
  pageNumber,
  pageSize,
  order,
}: {
  pageNumber?: number;
  pageSize?: number;
  order: number;
}) {
  const { isSuccess, data, message } = await homeSection({
    pageNumber,
    pageSize,
    order,
    cityId: selectedCityId.value,
  });
  if (!isSuccess || !data) {
    return {
      isSuccess: false,
      message: message,
      data: null,
    };
  }

  const remapData = data.data.map((sectionData) => {
    if (isFeaturedRestaurants(sectionData)) {
      return featuredResturant(sectionData);
    }
    return sectionData;
  });
  return {
    isSuccess,
    message,
    data: remapData,
  };
}

export { getHomeSection };
