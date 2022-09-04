export function linkToRestaurantPage(slug: string) {
  if (!slug) {
    return "";
  }
  return `/restaurants/${slug}`;
}
