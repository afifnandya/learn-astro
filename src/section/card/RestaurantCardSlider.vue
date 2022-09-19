<template>
  <div
    class="relative restaurant-card-slider"
    :class="isLoading ? 'is-loading' : null"
  >
    <div ref="sliderElement" class="swiper">
      <div class="mb-8 restaurant-card-slide-wrapper swiper-wrapper">
        <div
          v-for="restaurant in restaurants"
          :key="createLoopId({ name: restaurant.name, id: restaurant.id })"
          class="restaurant-card-slide swiper-slide"
        >
          <RestaurantCard v-bind="restaurant" :is-loading="isLoading" />
        </div>
      </div>
      <div ref="paginationElement" class="swiper-pagination"></div>
    </div>
    <div ref="nextElement" class="swiper-button-next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="currentColor"
        class="inline icon-chevron-right text-red-dark"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
    <div ref="prevElement" class="swiper-button-prev">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="inline icon-chevron-left text-red-dark"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RestaurantCard from "./RestaurantCard.vue";
import type { Props as RestaurantCardProps } from "./RestaurantCard.vue";
import { Swiper, Navigation, Pagination } from "swiper";
import { onMounted, ref, toRefs, Ref, watch } from "vue";
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
let sliderInstance = "" as any;
const sliderElement = ref(null);
const paginationElement = ref(null);
const nextElement = ref(null);
const prevElement = ref(null);

function initSlider() {
  const el = sliderElement.value as unknown as HTMLElement;
  const pagination = paginationElement.value as unknown as HTMLElement;
  const next = nextElement.value as unknown as HTMLElement;
  const prev = prevElement.value as unknown as HTMLElement;
  let sliderConfig = {
    centerInsufficientSlides: true,
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: {
      el: pagination,
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
  };

  sliderInstance = new Swiper(el, sliderConfig);
  console.log("ins", sliderInstance);
}

onMounted(() => {
  watch(isLoading, (newVal) => {
    console.log("is", newVal);
    if (newVal === false) {
      initSlider();
    }
  });
});
</script>
<script lang="ts">
export default {
  name: "RestaurantCardSlider",
};
</script>

<style lang="scss" scoped>
.restaurant-card-slider {
  .restaurant-card-slide {
    width: 50%;

    @apply mr-2;

    @screen lg {
      width: 20%;
      margin: 0;
    }
  }

  .swiper-button-next {
    top: 40%;
    right: -50px;
  }

  .swiper-button-next::after {
    content: none;
  }

  .swiper-button-prev {
    top: 40%;
    left: -50px;
  }

  .swiper-button-prev::after {
    content: none;
  }
}

.restaurant-card-slider.is-loading {
  .restaurant-card-slide-wrapper {
    @apply flex flex-wrap items-center justify-center;
  }
  .restaurant-card-slide {
    @apply pr-2;
  }
}
</style>
