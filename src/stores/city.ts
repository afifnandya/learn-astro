import { computed, ref, watch } from "vue";
import type { City } from "@/types/City";
import { getCity } from "@/api/common/city";

const selectedCityId = ref("");

const selectedCity = computed(() => {
  const filter = cityOption.value.filter(
    (city) => city.id === selectedCityId.value
  );
  if (filter.length) {
    return filter[0];
  }
  return {
    id: "",
    type: "cities",
    attributes: {
      name: "",
      homeDescription: "",
    },
  };
});
const selectedCityName = computed(() => {
  return selectedCity.value.attributes.name;
});
const cityOption = ref<City[]>([]);

watch(selectedCity, (newVal) => {
  console.log("selected city change", newVal);
});

async function fetchCity() {
  const { isSuccess, data } = await getCity();
  if (isSuccess && data) {
    cityOption.value = data;
  }
}

export {
  selectedCityId,
  selectedCity,
  cityOption,
  fetchCity,
  selectedCityName,
};
