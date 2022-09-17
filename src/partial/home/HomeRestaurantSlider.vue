<template>
  <RestaurantCardSlider
    class="max-width"
    :restaurants="restaurants"
    :is-loading="true"
  />
</template>

<script lang="ts" setup>
import RestaurantCardSlider from "@/section/card/RestaurantCardSlider.vue";
import type { Props as RestaurantCardSliderProps } from "@/section/card/RestaurantCardSlider.vue";
import { createDummyFeaturedRestaurant } from "@/services/restaurant";
import { getHomeSection } from "@/services/common/homeSection";
const dummyCount = 5;
let restaurants: RestaurantCardSliderProps["restaurants"] = [];

const { data } = await getHomeSection({ order: 1 });
console.log("home section data", data);

for (let index = 0; index < dummyCount; index++) {
  let temp = createDummyFeaturedRestaurant();
  const {
    link,
    name,
    price,
    pricingType,
    cuisine,
    location,
    totalLocations,
    avgReviews,
    totalReviews,
    cover,
  } = temp.attributes;
  restaurants.push({
    isLoading: false,
    id: temp.id,
    link: link,
    image: {
      src: cover.original,
      useMutator: true,
    },
    name: name,
    price: price.amount,
    pricingType: pricingType,
    cuisine: cuisine,
    location: location || "",
    totalLocation: totalLocations || 0,
    reviewsCount: totalReviews,
    reviewsScore: avgReviews,
  });
}
</script>
<script lang="ts">
export default {
  name: "HomeRestaurantSlider",
};
</script>
