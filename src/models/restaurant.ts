import type { FeaturedRestaurant } from "@/types/Restaurant";
import {
  PACKAGE_CODE_AYCE,
  PACKAGE_CODE_BFP,
  PACKAGE_CODE_HAH,
  PACKAGE_CODE_HS,
  PACKAGE_CODE_PP,
  PACKAGE_CODE_XP,
} from "@/constants";
import { isNewRestaurant } from "@/helper/restaurant";
import { rebuildAssetURL } from "@/helper/url";

type Attr = FeaturedRestaurant["attributes"];

interface FeaturedRestaurantModel extends Attr {
  id: string;
  anyDeliveryPackage: boolean;
  anyDineInPackage: boolean;
  anyXperiencePackage: boolean;
  isNewRestaurant: boolean;
  isFavourited: boolean;
}

function featuredResturant(param: FeaturedRestaurant) {
  const {
    startDate,
    totalLocations,
    totalCovers,
    totalReviews,
    avgReviews,
    branchId,
    cuisine,
    location,
    rank,
    description,
    customText,
    name,
    names,
    restaurantEncryptedId,
    restaurantId,
    lastBookingWasMade,
    link,
    cover,
    covid19Safety,
    packageTypes,
    longPackageTypes,
    price,
    priceV2,
    pricingType,
  } = param.attributes;
  const restaurant: FeaturedRestaurantModel = {
    id: param.id,
    isFavourited: false,
    startDate: startDate,
    totalLocations: totalLocations,
    totalReviews: totalReviews,
    avgReviews: avgReviews,
    branchId: branchId,
    cuisine: cuisine,
    location: location,
    rank: rank,
    description: description,
    customText: customText,
    name: name,
    names: {
      th: names.en,
      en: names.th,
    },
    totalCovers: totalCovers,
    restaurantId: restaurantId,
    restaurantEncryptedId: restaurantEncryptedId,
    link: link,
    cover: {
      thumb: rebuildAssetURL(cover.thumb),
      slideThumb: rebuildAssetURL(cover.slideThumb),
      square: rebuildAssetURL(cover.square),
      original: rebuildAssetURL(cover.original),
    },
    lastBookingWasMade: lastBookingWasMade,
    packageTypes: packageTypes,
    longPackageTypes: longPackageTypes,
    price: {
      amount: price.amount,
      currency: price.currency,
      symbol: price.symbol,
      format: price.format,
    },
    priceV2: {
      amount: price.amount,
      currency: price.currency,
      symbol: price.symbol,
      format: price.format,
    },
    pricingType: pricingType,
    covid19Safety: covid19Safety,
    anyDeliveryPackage: packageTypes.includes(PACKAGE_CODE_HAH),
    anyDineInPackage:
      packageTypes.filter((type) =>
        [
          PACKAGE_CODE_AYCE,
          PACKAGE_CODE_BFP,
          PACKAGE_CODE_HS,
          PACKAGE_CODE_PP,
          PACKAGE_CODE_XP,
        ].includes(type)
      ).length > 0,
    anyXperiencePackage: packageTypes.includes(PACKAGE_CODE_XP),
    isNewRestaurant: isNewRestaurant(totalReviews),
  };

  return restaurant;
}

export { featuredResturant };
export type { FeaturedRestaurantModel };
