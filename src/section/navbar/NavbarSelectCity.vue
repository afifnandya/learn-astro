<template>
  <div>
    <SelectCity
      :cities="cities"
      :selectedCityId="selectedCityId"
      @update:selectedCityId="(newValue) => setData(newValue)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { City } from "@/types/City";
import { onMounted, PropType, watch } from "vue";
import { ref } from "vue";
import SelectCity from "@/components/SelectCity.vue";
import { cityOption as storeCities } from "@/stores/city";
import { selectedCityId } from "@/stores/city";
const props = defineProps({
  cityOption: {
    type: Object as PropType<City[]>,
    required: true,
  },
});
const cities = ref<City[]>([]);

cities.value = props.cityOption;

function setData(newval: string) {
  console.log("a", newval);
  selectedCityId.value = newval;
}

watch(storeCities.value, (newVal) => {
  console.log("watch val change", newVal);
  if (newVal.length) {
    cities.value = [...newVal, ...newVal];
  }
});
// onMounted(() => {
//   console.log("on mounteed");
//   cities.value.push({
//     id: "99",
//     type: "cities",
//     attributes: {
//       name: "mm",
//       homeDescription: "lol",
//     },
//   });
//   const el = document.getElementById("bubu");
//   if (el) {
//     el.textContent = "Madara";
//   }
// });
// console.log("CITY FROM CLIENT", cityOption.value);
</script>
