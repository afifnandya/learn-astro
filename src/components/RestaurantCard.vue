<template>
  <div class="block my-2 bg-white rounded-lg restaurant-card card-shadow">
    <!-- restaurant image -->
    <div class="relative">
      <a
        class="block w-full aspect-video"
        :href="link"
        @click.prevent="$emit('on-click')"
      >
        <HhImage
          :sources="image.sources"
          :src="image.src"
          :useMutator="image.useMutator"
          alt="restaurant image"
          :width="image.width || defaultImgSize.width"
          :height="image.height || defaultImgSize.height"
          class="w-full bg-gray-300 rounded-tl-lg rounded-tr-lg restaurant-image"
        />
      </a>

      <!-- fav button -->
      <button
        v-if="showFavButton"
        class="absolute restaurant-card-fav-button"
        style="top: 10px; left: 10px"
        @click="$emit('on-fav-click')"
      >
        <img
          id="add-to-fav"
          class="inline-block cursor-pointer"
          :src="favouriteIcon"
          style="width: 25px"
          loading="lazy"
          alt="heart icon"
        />
      </button>

      <!-- custom text -->
      <div
        v-if="customText"
        class="absolute left-0 py-1 pl-1 text-center text-white border-l-0 text-2xs bg-red-dark"
        style="
          top: 10px;
          min-width: 45%;
          border-top-right-radius: 9999px;
          border-bottom-right-radius: 9999px;
        "
      >
        {{ customText }}
      </div>

      <!-- ads label -->

      <div
        v-if="isAds"
        class="absolute right-0 p-1 text-xs text-white bg-opacity-100"
        style="bottom: 10px"
      >
        Ad
      </div>
    </div>
    <a :href="link" @click.prevent="$emit('on-click')">
      <!-- restaurant info -->
      <div class="flex p-2 pb-0 restaurant-info">
        <div class="flex flex-col flex-grow w-8/12">
          <!-- restaurant name -->
          <span
            class="mb-1 text-xs font-black truncate lg:mb-2 md:text-base lg:text-sm ma0 restaurant-name"
          >
            {{ name }}
          </span>
        </div>
        <div v-if="price > 0" class="flex flex-col items-end pl-1">
          <!-- is loading for restaurant rating, review score -->
          <div class="flex items-center justify-end leading-none">
            <HhImage
              :src="iconPrice"
              class="pricetag-icon"
              width="12"
              height="12"
              alt="pricetag-icon"
            />
            <span
              class="ml-1 text-xs font-black md:text-base text-red-dark pricing"
              >{{ moneyFormat(price) }}</span
            >
          </div>
          <div
            class="text-right whitespace-nowrap pricetag-rule text-2xs text-red-dark"
          >
            {{ pricingType }}
          </div>
        </div>
      </div>
      <div class="flex p-2 pt-0">
        <!-- side by side cuisine , location and rating -->
        <div class="flex flex-col w-9/12 mr-1">
          <!-- restaurant primaryCuisine & primaryLocation -->
          <div class="flex items-center justify-around mb-1">
            <div class="flex items-center w-1/2">
              <div class="mr-1">
                <HhImage
                  v-if="isXperience"
                  :src="iconStaycation"
                  width="12"
                  height="12"
                  alt="xperience icon"
                />
                <HhImage
                  v-else
                  :src="iconCuisine"
                  width="12"
                  height="12"
                  alt="cuisine icon"
                />
              </div>
              <span
                class="truncate text-2xs md:text-base lg:text-xs cuisine-label"
                >{{ cuisine }}</span
              >
            </div>
            <div class="flex items-center w-1/2">
              <template v-if="location || totalLocation">
                <div class="flex-shrink-0 mr-1">
                  <HhImage
                    :src="iconLocation"
                    width="12"
                    height="12"
                    alt="location icon"
                    class="icon location-icon"
                  />
                </div>
                <!-- location -->
                <span
                  class="truncate text-2xs md:text-base lg:text-xs location-label"
                  >{{ locationLabel }}</span
                >
              </template>
            </div>
          </div>
          <!-- restaurant dine in / delivery -->
          <div class="flex items-center text-2xs lg:text-xs">
            <div v-if="isDineIn" class="flex items-center mr-1">
              <div class="mr-1">
                <HhImage
                  class="dine-in-icon"
                  :src="iconPlate"
                  width="12"
                  height="12"
                  alt="dine in icon"
                />
              </div>
              <span class="whitespace-nowrap">Dine-in</span>
            </div>

            <div v-if="isXperience" class="flex items-center mr-1">
              <div class="mr-1">
                <HhImage
                  class="xperience-icon"
                  :src="iconXperience"
                  alt="xperience icon"
                  width="12"
                  height="12"
                />
              </div>
              <span class="whitespace-nowrap">XP</span>
            </div>

            <div v-if="isDelivery" class="flex items-center mr-1">
              <div class="mr-1">
                <HhImage
                  :src="iconDelivery"
                  width="12"
                  alt="delivery icon"
                  class="delivery-icon"
                />
              </div>
              <span class="whitespace-nowrap">Delivery</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-end justify-end w-3/12">
          <div class="flex flex-col items-end mt-1">
            <div
              class="flex items-center justify-center px-1 font-black text-white rounded-md bg-red-dark restaurant-rating"
              :class="isNotNew ? null : 'new-restaurant mb-4'"
            >
              <span
                class="mx-1 leading-4 uppercase lg:text-sm"
                :class="isNotNew ? 'text-xs md:text-base' : 'text-2xs'"
                >{{ isNotNew ? reviewsScore : translate("new") }}</span
              >
              <svg
                v-if="isNotNew"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                fill="currentColor"
                class="flex-shrink-0 inline icon-star-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                />
              </svg>
            </div>
            <div
              v-if="isNotNew"
              class="hidden text-xs text-center text-gray-700 whitespace-nowrap md:text-2xs restaurant-rating-count lg:block"
              :class="isHaveAllService ? 'w-11/12 truncate' : null"
            >
              {{ reviewsCount }}
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import {
  defineAsyncComponent,
  defineComponent,
  PropType,
  computed,
  toRefs,
  onMounted,
} from "vue";
import { moneyFormat } from "@/helper/string";
import type { SrcSet } from "@/components/HhImage.vue";
import { translate } from "@/composable/useTranslate";
import iconPrice from "@/assets/img/icon-price-red.png";
import iconStaycation from "@/assets/img/icon-staycation-black.png";
import iconCuisine from "@/assets/img/icon-fork-black.png";
import iconLocation from "@/assets/img/icon-pin-location-black.png";
import iconPlate from "@/assets/img/icon-plate-red.png";
import iconXperience from "@/assets/img/icon-xperience.png";
import iconDelivery from "@/assets/img/icon-shopping-bag-red.png";

export interface Props {
  id: string | number;
  link: string;
  image: {
    src: string;
    width?: string;
    height?: string;
    sources?: SrcSet[];
    useMutator?: boolean;
  };
  customText?: string;
  isAds?: boolean;
  name: string;
  price: number;
  pricingType: string;
  isDineIn?: boolean;
  isDelivery?: boolean;
  isXperience?: boolean;
  cuisine: string;
  location: string;
  totalLocation: number;
  reviewsCount: number;
  reviewsScore: string | number;
  showFavButton?: boolean;
  favouriteIcon?: string;
}

const defaultImgSize = {
  width: "250",
  height: "141",
};

const props = withDefaults(defineProps<Props>(), {
  customText: "",
  isAds: false,
  isDelivery: false,
  isDineIn: false,
  isXperience: false,
  showFavButton: false,
  favouriteIcon: "",
});

const {
  location,
  totalLocation,
  reviewsCount,
  isDelivery,
  isDineIn,
  isXperience,
} = toRefs(props);

const emits = defineEmits(["on-click", "on-fav-click"]);

const HhImage = defineAsyncComponent(() => import("@/components/HhImage.vue"));

const locationLabel = computed(() => {
  if (location.value) {
    return location.value;
  }
  if (totalLocation.value > 0) {
    return `${totalLocation.value} ${translate("lol", {
      ns: "common",
      count: totalLocation.value,
    })}`;
  }
  return "";
});

const isNotNew = computed(() => {
  return reviewsCount.value >= 5;
});

const isHaveAllService = computed(() => {
  return isDelivery.value && isDineIn.value && isXperience.value;
});

onMounted(() => {
  console.log("translate", translate("lol"));
});
</script>

<script lang="ts">
export default {
  name: "RestaurantCard",
};
</script>

<style lang="scss" scoped>
.restaurant-card {
  &.card-shadow {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }

  .restaurant-info {
    @screen lg {
      height: 45px;
    }
    min-height: 27px;
  }

  .restaurant-rating {
    &.new-restaurant {
      width: auto;
    }

    min-width: 32px;
    min-height: 13px;

    @screen lg {
      width: 47px;
      height: 17px;
    }
  }

  .icon {
    width: 9px;

    @screen lg {
      width: 14px;
    }
  }

  .pricetag-icon {
    width: 8px;
    height: 8px;

    @screen lg {
      width: 12px;
      height: 12px;
    }
  }

  .package-type {
    padding-left: 20px;
    padding-right: 5px;
    color: white;
    line-height: 1.5;
    margin-bottom: 10px;
    font-weight: 900;

    &.ayce {
      background: var(--package-ayce);
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.257);
      color: black;
    }

    &.hah {
      background: var(--package-hah);
    }

    &.pp {
      background: var(--package-pp);
    }

    &.bfp {
      background: var(--package-bfp);
    }

    &.hs {
      background: var(--package-hs);
    }

    &.sm {
      background: var(--package-sm);
    }
  }
}
</style>
