import type { FeaturedRestaurant } from "@/types/Restaurant";
function createDummyFeaturedRestaurant() {
  const restaurant: FeaturedRestaurant = {
    id: "",
    type: "featured_restaurants",
    attributes: {
      startDate: "",
      totalLocations: null,
      totalReviews: 0,
      avgReviews: 0,
      branchId: null,
      cuisine: "",
      location: null,
      rank: null,
      description: null,
      customText: null,
      name: "",
      names: {
        th: "",
        en: "",
      },
      totalCovers: 0,
      restaurantId: null,
      restaurantEncryptedId: null,
      link: "",
      cover: {
        thumb: "",
        slideThumb: "",
        square: "",
        original: "",
      },
      lastBookingWasMade: "",
      packageTypes: [],
      longPackageTypes: [],
      price: {
        amount: 0,
        currency: "",
        symbol: "",
        format: "",
      },
      priceV2: {
        amount: 0,
        currency: "",
        symbol: "",
        format: "",
      },
      pricingType: "",
      covid19Safety: false,
    },
  };
  return restaurant;
}

export { createDummyFeaturedRestaurant };
