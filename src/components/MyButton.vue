<template>
  {{ selectedCityName }}
</template>

<script lang="ts" setup>
import { selectedCityId, selectedCityName } from "@/stores/city";
</script>

<script lang="ts">
export default {
  name: "MyButton",
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>
