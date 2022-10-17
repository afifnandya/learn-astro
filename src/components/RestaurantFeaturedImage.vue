<template>
  <div class="flex h-[200px] bg-gray-300">
    <div class="flex-shrink-0 w-1/2">
      <slot name="first-image"></slot>
    </div>
    <div class="flex flex-col w-1/2">
      <div class="object-contain min-h-[100px]">
        <slot name="second-image"></slot>
      </div>
      <div class="object-contain h-1/2">
        <slot name="third-image"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "RestaurantFeaturedImage",
};
</script>
