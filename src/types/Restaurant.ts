import type { PriceAndPricingType } from "./Pricing";

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

export interface Restaurant {
  id: string;
  type: "restaurants";
  attributes: RestaurantAttributes;
  relationships: {
    bloggerReviews?: { data: any[] };
    lastReviews?: { data: any[] };
    pictures: { data: any[] };
    restaurantPackages: { data: any[] };
  };
}

export interface RestaurantAttributes {
  lowestAycePrice: string | null;
  lowestPpPrice: string | null;
  lowestXpPrice: string | null;
  lowestHsPrice: string | null;
  lowestBfpPrice: string | null;
  lowestSmPrice: string | null;
  lowestHahPrice: string | null;
  pricePerPerson: {
    amount: string;
    currency: string;
    symbol: string;
    format: string;
  };
  priceAndPricingType: PriceAndPricingType;
  isDeleted: boolean;
  lat: string;
  lng: string;
  largestTable: number;
  branchId: number;
  minPartySize: number;
  name: string;
  names: {
    th: string;
    en: string;
  };
  slug: string;
  favorited: boolean;
  allowBooking: boolean;
  availability: string;
  reviewsScore: number;
  reviewsCount: number;
  mapLocation: string;
  promotedByHh: boolean;
  enableBigGroupFeature: boolean;
  location: string;
  primaryLocation: {
    id: number;
    name: string;
  };
  cuisine: string;
  primaryCuisine: {
    id: number;
    name: string;
  };
  imageCoverUrl: {
    thumb: string;
    large: string;
    square: string;
  };
  canonicalLink: string;
  lastBookingWasMade: string;
  totalCovers: number;
  timeSlots: {};
  reservationSystemOnly: boolean;
  breadcrumbs: {
    order: number;
    title: string;
    link: string;
  }[];
  address: string;
  parking: boolean;
  corkageCharge: string;
  openingHours: null;
  foodDetails: null;
  daysInAdvance: number;
  ambience: null | string;
  expiryDate: string;
  smallNote: null | string;
  acceptKids: boolean;
  selfPickupMessage: null | string;
  customText: null | string;
  recordGuests: boolean;
  bookingFlow: string;
  myMoobanVrLink: string;
  acceptVoucher: boolean;
  description: string;
  customSeats: any[];
  tags: any[];
  logoUrl: {
    medium: string;
    thumb: string;
  };
  platform: string[];
  customSectionTitle: string;
  customSectionContent: string;
  availablePackageTypes: string[];
  reservationDurationInHours: string;
  openingHoursShort: string;
  weekdayOpeningHours: WeekdayOpeningHours;
  openingHoursV2: null | string;
  hashtags: {
    id: number;
    label: string;
    linkToGroupLandingPage: string;
  }[];
  videos: string[];
  locations: {
    id: number;
    title: string;
  }[];
  cuisines: {
    id: number;
    title: string;
  }[];
  jsonld: null | string;
  link: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  linkToGroupLandingPage: string;
  gbPrimepayPublicKey: string;
  supportOrderNow: boolean;
  cookingTime: number;
  hasDeliveryPricingTier: boolean;
  phone: string;
  phoneForDelivery: string;
  covid19Rating: Covid19Rating;
}

export interface WeekdayOpeningHours {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface Covid19Rating {
  overallCleanliness: string;
  socialDistancing: string;
  staffProtection: string;
}
