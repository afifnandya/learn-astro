<template>
  <select
    class="border rounded-full border-red-dark custom-dropdown"
    @change="onChange"
  >
    <option
      v-for="city in cities"
      :key="city.id"
      :value="city.id"
      class="capitalize"
    >
      {{ city.attributes.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { City } from "src/types/City";
defineProps({
  selectedCityId: String,
  cities: {
    type: Object as PropType<City[]>,
    required: true,
  },
});

const emits = defineEmits(["update:selectedCityId"]);

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emits("update:selectedCityId", target.value);
}
</script>

<script lang="ts">
export default {
  name: "SelectCity",
};
</script>
