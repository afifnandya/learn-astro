<template>
  <div class="relative">
    <div ref="restaurant-card-slider" class="swiper">
      <div
        class="mb-8 swiper-wrapper"
        :class="isLoading ? 'flex items-center justify-center' : ''"
      >
        <div
          v-for="restaurant in restaurants"
          :key="createLoopId({ name: restaurant.name, id: restaurant.id })"
          class="w-1/2 mr-4 swiper-slide lg:w-1/5"
        >
          <RestaurantCard v-bind="restaurant" :is-loading="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RestaurantCard from "./RestaurantCard.vue";
import type { Props as RestaurantCardProps } from "./RestaurantCard.vue";
import { Swiper, Navigation, Pagination } from "swiper";
import { toRefs } from "vue";
import { createLoopId } from "@/helper/restaurant";
export interface Props {
  restaurants: RestaurantCardProps[];
  isLoading?: boolean;
}
Swiper.use([Navigation, Pagination]);

const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
});

const { isLoading } = toRefs(props);
</script>
<script lang="ts">
export default {
  name: "RestaurantCardSlider",
};
</script>
