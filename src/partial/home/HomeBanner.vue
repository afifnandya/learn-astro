<template>
  <div class="font-black text-center banner-bg" :style="image">
    <div
      class="flex flex-col items-center justify-center h-full pt-10 pb-10 text-white bg-overlay"
    >
      <h1 class="mx-5 title">
        {{ title }}
      </h1>
      <h3 class="my-2 sub-title">
        <!-- {{ $t("subTitle", { totalCover: totalCover }) }} -->
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  totalCover: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
<script lang="ts">
export default {
  name: "HomeBanner",
};
</script>
