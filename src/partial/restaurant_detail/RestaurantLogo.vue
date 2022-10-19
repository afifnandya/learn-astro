<template>
  <div class="rounded-full">
    <HhImage
      :src="logo"
      :useMutator="true"
      alt="restaurant logo"
      :width="90"
      class="object-cover w-full bg-gray-300 rounded-full"
    />
  </div>
</template>

<script lang="ts" setup>
import HhImage from "@/components/HhImage.vue";
type Props = {
  logo: string;
};

defineProps<Props>();
</script>
<script lang="ts">
export default {
  name: "RestaurantLogo",
};
</script>
