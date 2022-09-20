<template>
  <div
    class="relative restaurant-card-slider"
    :class="isLoading ? 'is-loading' : null"
  >
    <div ref="sliderElement" class="swiper">
      <div class="mb-8 restaurant-card-slide-wrapper swiper-wrapper">
        <div
          v-for="restaurant in restaurantsToShow"
          :key="createLoopId({ name: restaurant.name, id: restaurant.id })"
          :style="virtualStyle"
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
import type { Props as RestaurantCardProps } from "./RestaurantCard.vue";
import type { VirtualData } from "swiper/types/modules/virtual";
import RestaurantCard from "./RestaurantCard.vue";
import { Swiper, Navigation, Pagination, SwiperOptions, Virtual } from "swiper";
import { onMounted, ref, toRefs, watch, reactive, computed } from "vue";
import { createLoopId } from "@/helper/restaurant";
import { isDesktop, isMobile, isTablet } from "@/helper/screenSize";
export interface Props {
  restaurants: RestaurantCardProps[];
  isLoading?: boolean;
  showArrow?: boolean;
  showPagination?: boolean;
}
Swiper.use([Navigation, Pagination, Virtual]);

const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
  showArrow: true,
  showPagination: true,
});
const { restaurants } = toRefs(props);
const { isLoading } = toRefs(props);
let sliderInstance = ref<Swiper>();
const sliderElement = ref(null);
const paginationElement = ref(null);
const nextElement = ref(null);
const prevElement = ref(null);
const virtualData = reactive<VirtualData>({
  slides: [],
  offset: 0,
  from: 0,
  to: 0,
});
const restaurantsToShow = computed(() => {
  if (isLoading.value || !sliderInstance.value) {
    return restaurants.value;
  }
  return virtualData.slides;
});
const virtualStyle = computed(() => {
  return `left: ${virtualData.offset}px;`;
});

function initSlider() {
  const el = sliderElement.value as unknown as HTMLElement;
  const pagination = paginationElement.value as unknown as HTMLElement;
  const next = nextElement.value as unknown as HTMLElement;
  const prev = prevElement.value as unknown as HTMLElement;
  const setInitialSliePerView = () => {
    if (isDesktop) {
      return 5;
    }
    if (isTablet) {
      return 4;
    }
    return 2;
  };
  let sliderConfig: SwiperOptions = {
    loop: false,
    slidesPerView: setInitialSliePerView(),
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px
      640: {
        centerInsufficientSlides: true,
        slidesPerView: 3,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
      },
      768: {
        centerInsufficientSlides: true,
        slidesPerView: 3,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
      },
      1280: {
        centerInsufficientSlides: true,
        slidesPerView: 5,
        navigation: {
          nextEl: next,
          prevEl: prev,
        },
      },
    },
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    pagination: {
      el: pagination,
      clickable: true,
      dynamicBullets: true,
    },
    virtual: {
      slides: restaurants.value,
      renderExternal(data) {
        virtualData.from = data.from;
        virtualData.to = data.to;
        virtualData.slides = data.slides;
        virtualData.offset = data.offset;
      },
    },
  };

  sliderInstance.value = new Swiper(el, sliderConfig);
}

onMounted(() => {
  watch(isLoading, (newVal) => {
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

  .swiper-button-next,
  .swiper-button-prev {
    @apply hidden;
    @screen sm {
      @apply block;
    }
  }
}

.restaurant-card-slider.is-loading {
  .restaurant-card-slide-wrapper {
    @apply flex items-center justify-center;
    @screen lg {
      @apply flex-wrap;
    }
  }
  .restaurant-card-slide {
    @apply pr-2;
  }
}
</style>
