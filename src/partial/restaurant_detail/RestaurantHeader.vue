<template>
  <div class="flex flex-col items-center w-full mt-6 md:px-6 lg:px-0">
    <!-- restaurant name (mobile) -->
    <div
      class="flex items-center w-full mb-1 text-gray-700 bg-white restaurant-name-bar lg:hidden"
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

    <div class="flex items-center w-full">
      <div class="hidden w-full lg:flex">
        <!-- restaurant icon -->
        <div v-if="icon">
          <RestaurantLogo
            class="hidden mr-2 lg:flex w-[90px]"
            :logo="icon"
          ></RestaurantLogo>
        </div>

        <div class="flex flex-col">
          <!-- restaurant name (tab and up) -->
          <div
            class="items-center hidden w-full px-3 mb-1 bg-white restaurant-name-bar lg:flex"
          >
            <h1 class="text-xl font-black">
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

          <RestaurantStats
            :cuisine="cuisine"
            :location="location"
            :opening-hours-summary="openingHoursSummary"
            :branch-id="branchId"
            :direction="direction"
            :tags="tags"
            :last-order="lastOrder"
            :show-accept-voucher="showAcceptVoucher"
            :show-tags="showTags"
            :show-view-branch="showViewBranch"
          />
        </div>
      </div>

      <!-- restaurant image -->
      <div class="relative w-full">
        <!-- restaurant icon -->
        <RestaurantLogo
          v-if="icon"
          class="absolute flex mr-2 lg:hidden w-[70px] top-[10px] left-[10px]"
          :logo="icon"
        />

        <!-- restaurant featured image -->
        <RestaurantFeaturedImage v-if="featuredImages">
          <template #first-image>
            <HhImage
              :src="parsedFeaturedImages[0].src"
              :sources="parsedFeaturedImages[0].sources"
              :useMutator="true"
              alt="restaurant image"
              :width="125"
              class="object-cover w-full h-full bg-gray-300 restaurant-image"
            />
          </template>
          <template #second-image>
            <HhImage
              :src="parsedFeaturedImages[1].src"
              :sources="parsedFeaturedImages[1].sources"
              :useMutator="true"
              alt="restaurant image"
              :width="125"
              class="object-cover w-full h-full bg-gray-300 restaurant-image"
            />
          </template>
          <template #third-image>
            <HhImage
              :src="parsedFeaturedImages[2].src"
              :sources="parsedFeaturedImages[2].sources"
              :useMutator="true"
              alt="restaurant image"
              :width="125"
              class="object-cover w-full h-full bg-gray-300 restaurant-image"
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
    </div>

    <!-- restaurant info -->

    <div class="w-full pt-6 mt-4 restaurant-info">
      <!-- restaurant profile -->
      <div class="flex items-center px-6 lg:hidden">
        <RestaurantStats
          :cuisine="cuisine"
          :location="location"
          :opening-hours-summary="openingHoursSummary"
          :branch-id="branchId"
          :direction="direction"
          :tags="tags"
          :last-order="lastOrder"
          :show-accept-voucher="showAcceptVoucher"
          :show-tags="showTags"
          :show-view-branch="showViewBranch"
        />
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
import HhImage, { SrcSet } from "@/components/HhImage.vue";
import RestaurantFeaturedImage from "@/components/RestaurantFeaturedImage.vue";
import RestaurantStats from "./RestaurantStats.vue";
import RestaurantLogo from "./RestaurantLogo.vue";

type ParsedFeaturedImages = {
  caption: string;
  id: string;
  src: string;
  sources: SrcSet[];
};

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
  openingHoursSummary: string;
  branchId: string | number;
  direction: string;
  tags: { id: string | number; label: string }[];
  lastOrder: string;
  showAcceptVoucher: boolean;
  showInputLocation: boolean;
  featuredImages: { id: string; caption: string; image: string }[];
  showTags: boolean;
  showViewBranch: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: "",
  icon: "",
  showTags: true,
  showViewBranch: true,
});

const isNewRestaurant = ref(false);
const showRestaurantRating = ref(true);
const showDeliveryFee = ref(false);
const isFreeReservationSystem = false;
const parsedFeaturedImages: ParsedFeaturedImages[] = [];

function shareRestaurant() {}

function onFavouriteClick() {}

function onVrLinkClicked() {}

function onRatingClick() {}

function onClockClick() {}

function onTagExpanClicked() {}

function onBackClicked() {}

function generateParsedFeaturedImages() {
  if (Array.isArray(props.featuredImages)) {
    props.featuredImages.forEach((img) => {
      const sources = [
        {
          source: img.image,
          format: "webp",
          breakpoint: {
            maxWidth: 375,
          },
          height: 250,
          useMutator: true,
        },
        {
          source: img.image,
          format: "webp",
          breakpoint: {
            maxWidth: 768,
          },
          height: 250,
          useMutator: true,
        },
        {
          source: img.image,
          format: "webp",
          breakpoint: {
            minWidth: 1024,
          },
          height: 250,
          useMutator: true,
        },
      ];
      parsedFeaturedImages.push({
        id: img.id,
        caption: img.caption,
        src: img.image,
        sources,
      });
    });
  }
}

generateParsedFeaturedImages();
</script>

<script lang="ts">
export default {
  name: "RestaurantHeader",
};
</script>
