import { translate } from "@/composable/useTranslate";
import { relativeTime } from "./dateTime";
import { toSlug } from "./string";

export function linkToRestaurantPage(slug: string) {
  if (!slug) {
    return "";
  }
  return `/restaurants/${slug}`;
}

export function isNewRestaurant(reviewsCount: number) {
  return reviewsCount < 5;
}

export function createLoopId({
  randomString,
  name,
  id,
}: {
  randomString?: string;
  name: string;
  id: number | string;
}) {
  return `${toSlug(name)}-${id}`;
}

export function generateLastBookingCTA({
  lastBooking,
  reviewsCount,
  totalCovers,
  earlyReviewPoint,
}: {
  lastBooking: string;
  reviewsCount: number;
  totalCovers: number;
  earlyReviewPoint: number;
}) {
  const lastBookingMadeDate = new Date(lastBooking).getTime();
  const dayBeforeYesterday = new Date().getTime() - 60 * 60 * 1000 * 24 * 3;
  if (dayBeforeYesterday <= lastBookingMadeDate) {
    const relative = relativeTime(lastBookingMadeDate);
    return `${translate("lastReservationCTA", {
      ns: "restaurant",
    })} ${relative}`;
  }
  if (reviewsCount < 5) {
    return translate("newRestaurantCTA", {
      point: earlyReviewPoint,
      ns: "restaurant",
    });
  }
  return translate("totalRestaurantBookingCTA", {
    total: totalCovers,
    ns: "restaurant",
  });
}
