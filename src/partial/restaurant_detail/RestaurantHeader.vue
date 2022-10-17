<template>
  <div class="flex flex-col items-center w-full mt-6 text-gray-700">
    <!-- restaurant name -->
    <div
      class="z-20 flex items-center w-full px-3 mb-1 bg-white restaurant-name-bar"
    >
      <LeftArrowIcon @click="onBackClicked" />
      <h1 class="flex justify-center flex-auto mx-auto font-black">
        {{ name }}
      </h1>
      <img
        src="@/assets/img/icon-share-red.png"
        class="mx-1 w-[20px] h-[20px]"
        alt="share icon"
        @click="shareRestaurant"
      />
      <HeartIcon
        id="add-to-fav"
        @click="onFavouriteClick"
        class="inline-block ml-1 w-[25px]"
      />
    </div>

    <!-- restaurant featured image -->
    <div class="relative w-full">
      <div v-if="icon" class="absolute flex mr-2 rounded-full restaurant-logo">
        <HhImage
          :src="icon"
          :useMutator="true"
          alt="restaurant image"
          :width="90"
          class="w-full bg-gray-300 rounded-tl-lg rounded-tr-lg restaurant-image"
        />
      </div>
      <!-- restaurant featured image -->
      <RestaurantFeaturedImage>
        <template #first-image>
          <HhImage
            :src="icon"
            :useMutator="true"
            alt="restaurant image"
            :width="90"
            class="w-full h-full bg-gray-300 rounded-tl-lg rounded-tr-lg restaurant-image"
          />
        </template>
        <template #second-image>
          <HhImage
            :src="icon"
            :useMutator="true"
            alt="restaurant image"
            :width="90"
            class="w-full h-full bg-gray-300 rounded-tl-lg rounded-tr-lg restaurant-image"
          />
        </template>
        <template #third-image>
          <HhImage
            :src="icon"
            :useMutator="true"
            alt="restaurant image"
            :width="90"
            class="w-full h-full bg-gray-300 rounded-tl-lg rounded-tr-lg restaurant-image"
          />
        </template>
      </RestaurantFeaturedImage>
      <!-- restaurant rating -->
      <div
        v-if="showRestaurantRating"
        class="mb-2 restaurant-rating absolute bottom-[-40px] left-[20px] w-[80px]"
        :class="isNewRestaurant ? 'new' : ''"
        @click="onRatingClick"
      >
        <div
          class="flex items-center justify-center px-2 ml-auto font-black text-center text-white bg-red-dark hover:bg-red-light rounded-xl"
        >
          <template v-if="isNewRestaurant">
            <span class="py-1 mr-1 text-2xl uppercase">{{
              translate("new")
            }}</span>
            <span
              class="font-normal text-2xs"
              v-html="
                translate('firstReview', {
                  review: earlyMaxReview,
                  point: `${moneyFormat(earlyReviewPoint)}+`,
                })
              "
            ></span>
          </template>
          <template v-else>
            <span class="mr-1">{{ rating }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="inline icon-star-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
            </svg>
          </template>
        </div>
        <div class="text-center text-gray-700 text-2xs">
          <span v-if="!isNewRestaurant" class="">
            {{ translate("rating", { count: ratingCount }) }}
          </span>
        </div>
      </div>

      <div v-if="vrLink" class="absolute" style="bottom: -30px; right: 10px">
        <a
          id="vr-button"
          :href="vrLink"
          class="flex items-center justify-center px-2 text-sm font-medium leading-6 border rounded-full border-red-dark text-red-dark"
          rel="noopener noreferrer"
          target="_blank"
          @click="onVrLinkClicked"
        >
          <img
            src="@/assets/img/icon-cube.png"
            alt="3D view"
            class="inline mr-1"
            width="13"
            loading="lazy"
          />
          <span> 3D View </span>
        </a>
      </div>
    </div>
    <!-- restaurant info -->

    <div class="w-full pt-6 mt-4 restaurant-info">
      <!-- restaurant profile -->
      <div class="flex items-center px-6">
        <div class="flex flex-col w-full">
          <!-- restaurant stats -->
          <div class="text-sm">
            <div class="flex items-center justify-between">
              <a
                class="flex items-center"
                :href="`/restaurants/search?cuisines[]=${cuisine.id}`"
                target="_blank"
              >
                <img
                  class="m-2 ml-0 icon"
                  src="@/assets/img/icon-fork-black.png"
                  alt=""
                  loading="lazy"
                />
                <span class="underline">{{ cuisine.name }}</span>
              </a>
              <a :href="direction" target="_blank" class="flex items-center">
                <img
                  class="m-2 ml-0 icon"
                  src="@/assets/img/icon-pin-location-black.png"
                  loading="lazy"
                  alt=""
                />
                <span class="underline">{{ location.name }}</span>
              </a>
              <div class="flex items-center">
                <img
                  class="m-2 ml-0 icon"
                  loading="lazy"
                  src="@/assets/img/icon-clock-black.png"
                  alt=""
                />
                <span class="underline" @click="onClockClick">{{
                  openingHoursSummary
                }}</span>
              </div>
            </div>
            <div
              v-if="!isFreeReservationSystem && tags.length > 0"
              class="relative flex items-center"
            >
              <img
                class="m-2 ml-0 icon"
                src="@/assets/img/icon-tag-black.png"
                alt=""
                loading="lazy"
              />
              <div class="restaurant-tags-height-limit">
                <a
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="flex-shrink-0 mr-2 lowercase break-words tag-color hover:underline"
                  :href="`/restaurants/search?hashtags=${tag.id}`"
                  >{{ `#${tag.label}` }}
                </a>
              </div>
              <button
                class="restaurant-tags-expand-button tag-color"
                @click="onTagExpanClicked"
              >
                ...
              </button>
            </div>
            <div class="flex justify-between mb-2">
              <span v-if="lastOrder" class="flex items-center mr-2">
                <img
                  class="m-2 ml-0 icon"
                  loading="lazy"
                  src="@/assets/img/icon-trend-black.png"
                  alt=""
                />
                <span class="text-sm">{{ lastOrder }}</span>
              </span>
              <span
                v-if="branchId && !isFreeReservationSystem"
                class="flex items-center"
                @click="$emit('on-branch-clicked')"
              >
                <img
                  class="m-2 ml-0 icon"
                  loading="lazy"
                  src="@/assets/img/icon-location-plus-red.png"
                  alt=""
                />
                <span class="text-sm text-red-dark">{{
                  translate("viewOtherBranch")
                }}</span>
              </span>
            </div>
            <!-- accepting voucher -->
            <div v-if="showAcceptVoucher" class="flex items-center">
              <!-- <HhImage
                :img="'@/assets/ic_use_voucher.png'"
                :fallback="'@/assets/ic_use_voucher.png'"
                is-local-image
                style="width: 15px"
                class="m-2 ml-0"
              /> -->
              <span class="text-sm text-red-dark">
                {{ translate("acceptVoucher") }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- input location  -->
      <template v-if="showInputLocation">
        <div v-if="!showDeliveryFee" class="mx-6 mt-1">
          <button
            class="w-full py-1 text-sm leading-5 capitalize border rounded-full border-red-dark text-red-dark"
            @click="showDeliveryFee = true"
          >
            {{ translate("calculateDeliveryFee") }}
          </button>
        </div>
        <!-- <InputDelivery
          v-if="preferShowDeliveryFee"
          class="px-3"
          no-packages
          show-promotion
        /> -->
        <!-- <RestaurantCovidRating
          v-if="showCovidRating"
          :staff-protection="covidRating.staffProtection"
          :social-distancing="covidRating.socialDistancing"
          :overall-cleanliness="covidRating.overallCleanliness"
          class="mt-2"
        /> -->
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeartIcon from "@/components/icons/HeartIcon.vue";
import { translate } from "@/composable/useTranslate";
import { moneyFormat } from "@/helper/string";

import { ref } from "vue";
import LeftArrowIcon from "../../components/icons/LeftArrowIcon.vue";
import HhImage from "@/components/HhImage.vue";
import RestaurantFeaturedImage from "@/components/RestaurantFeaturedImage.vue";
type Props = {
  name: string;
  icon: string;
  earlyMaxReview: number | string;
  earlyReviewPoint: number | string;
  rating: string | number;
  ratingCount: number;
  vrLink?: string;
  cuisine: {
    id: string | number;
    name: string;
  };
  location: {
    id: string | number;
    name: string;
  };
  branchId: string | number;
  direction: string;
  tags: { id: string | number; label: string }[];
  lastOrder: string;
  showAcceptVoucher: boolean;
  showInputLocation: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: "",
  icon: "",
});

const isNewRestaurant = ref(false);
const showRestaurantRating = ref(true);
const showDeliveryFee = ref(false);
const openingHoursSummary = "";
const isFreeReservationSystem = false;

function shareRestaurant() {}

function onFavouriteClick() {}

function onVrLinkClicked() {}

function onRatingClick() {}

function onClockClick() {}

function onTagExpanClicked() {}

function onBackClicked() {}
</script>

<script lang="ts">
export default {
  name: "RestaurantHeader",
};
</script>
