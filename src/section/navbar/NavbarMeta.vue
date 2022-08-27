<template><NavbarSelectCity :city-option="props.cityOption" /></template>

<script lang="ts" setup>
import NavbarSelectCity from "./NavbarSelectCity.vue";
import type { City } from "@/types/City";
import type { PropType } from "vue";
const props = defineProps({
  cityOption: {
    type: Object as PropType<City[]>,
    required: true,
  },
});
</script>
