<template>
  <div class="flex flex-col w-full">
    <!-- restaurant stats -->
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
        <span class="underline" @click="$emit('on-clock-clicked')">{{
          openingHoursSummary
        }}</span>
      </div>
    </div>
    <div v-if="showTags && tags.length > 0" class="relative flex items-center">
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
          class="flex-shrink-0 mr-2 text-blue-500 lowercase break-words hover:underline"
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
        v-if="branchId && showViewBranch"
        class="flex items-center"
        @click="$emit('on-branch-clicked')"
      >
        <img
          class="m-2 ml-0 icon"
          loading="lazy"
          src="@/assets/img/icon-location-plus-red.png"
          alt=""
        />
        <span class="text-sm cursor-pointer text-red-dark hover:underline">{{
          translate("viewOtherBranch")
        }}</span>
      </span>
    </div>
    <!-- accepting voucher -->
    <div v-if="showAcceptVoucher" class="flex items-center">
      <img
        class="mt-2 mr-2 lg:mt-0 icon"
        src="@/assets/img/ic_use_voucher.png"
        alt=""
        loading="lazy"
      />
      <span class="text-sm text-red-dark">
        {{ translate("acceptVoucher") }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { translate } from "@/composable/useTranslate";

type Props = {
  cuisine: {
    id: string | number;
    name: string;
  };
  location: {
    id: string | number;
    name: string;
  };
  showTags: boolean;
  showViewBranch: boolean;
  openingHoursSummary: string;
  branchId: string | number;
  direction: string;
  tags: { id: string | number; label: string }[];
  lastOrder: string;
  showAcceptVoucher: boolean;
};

defineEmits(["on-clock-clicked", "on-branch-clicked"]);

const props = defineProps<Props>();

function onTagExpanClicked() {}
</script>
<script lang="ts">
export default {
  name: "RestaurantStats",
};
</script>

<style scoped>
.icon {
  @apply w-[16px];
}
</style>
