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

type Attr = FeaturedRestaurant["attributes"];

interface EnhanceFeaturedRestaurant extends Attr {
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
  const restaurant: EnhanceFeaturedRestaurant = {
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
      thumb: cover.thumb,
      slideThumb: cover.slideThumb,
      square: cover.square,
      original: cover.original,
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
