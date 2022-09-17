export interface FeaturedRestaurant {
  id: string;
  type: "featured_restaurants";
  attributes: {
    startDate: string;
    totalLocations: number | null;
    totalReviews: number;
    avgReviews: number;
    branchId: number | null;
    cuisine: string;
    location: null | string;
    rank: number | null;
    description: null | string;
    customText: null | string;
    name: string;
    names: {
      th: string;
      en: string;
    };
    totalCovers: number;
    restaurantId: number | null;
    restaurantEncryptedId: null | string;
    link: string;
    cover: {
      thumb: string;
      slideThumb: string;
      square: string;
      original: string;
    };
    lastBookingWasMade: string;
    packageTypes: string[];
    longPackageTypes: {
      typeShort: string;
      type: string;
    }[];
    price: {
      amount: number;
      currency: string;
      symbol: string;
      format: string;
    };
    priceV2: {
      amount: number;
      currency: string;
      symbol: string;
      format: string;
    };
    pricingType: string;
    covid19Safety: boolean;
  };
}
