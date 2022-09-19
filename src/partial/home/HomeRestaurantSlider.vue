<template>
  <div class="section-title" :class="isLoading ? 'is-loading' : null">
    {{ title }}
  </div>
  <RestaurantCardSlider
    class="max-width"
    :restaurants="restaurants"
    :is-loading="isLoading"
  />
</template>

<script lang="ts" setup>
import RestaurantCardSlider from "@/section/card/RestaurantCardSlider.vue";
import type { Props as RestaurantCardSliderProps } from "@/section/card/RestaurantCardSlider.vue";
import { createDummyFeaturedRestaurant } from "@/services/restaurant";
import {
  getHomeSection,
  isRestaurantTags,
} from "@/services/common/homeSection";
import { errorToast } from "@/lib/alert";
import { onMounted, Prop, ref, Ref, toRefs } from "vue";

const props = defineProps({
  apiOrder: {
    type: Number,
    required: true,
  },
  homeSectionOrder: {
    type: Number,
    required: true,
  },
});
const { apiOrder } = toRefs(props);
const dummyCount = 5;
const isLoading = ref(true);
const title = ref("section title");
const restaurants: Ref<RestaurantCardSliderProps["restaurants"]> = ref([]);

async function fetchData() {
  isLoading.value = true;
  const { data, isSuccess, message } = await getHomeSection({
    order: apiOrder.value,
  });
  if (!isSuccess || !data) {
    errorToast(message);
    return;
  }
  if (data) {
    restaurants.value = [];
    title.value = data.title;
    data.data.forEach((item) => {
      if (!isRestaurantTags(item)) {
        restaurants.value.push({
          isLoading: false,
          id: item.id,
          link: item.link,
          image: {
            src: item.cover.original,
            sources: undefined,
            width: "250",
            height: "158",
            useMutator: true,
          },
          name: item.name,
          price: item.price.amount,
          pricingType: item.pricingType,
          cuisine: item.cuisine,
          location: item.location || "",
          totalLocation: item.totalLocations || 0,
          reviewsCount: item.totalReviews,
          reviewsScore: item.avgReviews,
          isDelivery: item.anyDeliveryPackage,
          isDineIn: item.anyDeliveryPackage,
          isXperience: item.anyXperiencePackage,
        });
      }
    });
    isLoading.value = false;
    console.log("home section data", restaurants);
  }
}

function initDummy() {
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
    restaurants.value.push({
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
}

initDummy();
onMounted(() => {
  fetchData();
});
</script>
<script lang="ts">
export default {
  name: "HomeRestaurantSlider",
};
</script>
