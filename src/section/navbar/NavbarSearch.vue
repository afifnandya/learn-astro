<template>
  <div class="relative flex items-center">
    <transition
      enter-active-class="transition duration-300 ease-in-out"
      enter-from-class="transform scale-x-0 translate-x-1/2 opacity-0"
      enter-to-class="transform scale-x-100 translate-x-0 opacity-100"
      leave-active-class="transition duration-300 ease-in-out"
      leave-from-class="transform scale-x-100 translate-x-0 opacity-100"
      leave-to-class="transform scale-x-0 translate-x-1/2 opacity-0"
      class="inset-y-0 h-8 space-x-2 bg-white rounded-l-full"
    >
      <SearchRestaurant
        v-show="isExpanded"
        @on-input="onInput"
        :is-loading="isLoading"
        :anyResult="anyResult"
      >
        <template #input="{ inputHandler, focusHandler }">
          <input
            class="border-b border-b-gray-500 w-[400px]"
            type="text"
            @input="inputHandler"
            @focus="focusHandler"
          />
        </template>
        <template #suggestion>
          <div class="p-2 text-gray-700">
            <a
              class="flex items-center mb-2 text-sm hover:bg-gray-100"
              v-for="restaurant in results.restaurants"
              :key="restaurant.id"
              :href="restaurant.getLink()"
            >
              <HhImage
                alt="restaurant image"
                :src="restaurant.coverImage"
                width="50"
                height="50"
              />
              <div class="flex flex-col justify-around ml-2">
                <div>{{ restaurant.name }}</div>
                <div>{{ restaurant.location }}</div>
              </div>
            </a>
          </div>
        </template>
      </SearchRestaurant>
    </transition>
    <button
      data-cy="navbar-search-toggle"
      type="button"
      class="relative ml-2 rounded-full ring-black focus:outline-none"
      :class="isExpanded ? 'ring-2' : 'ring-0'"
      @click="onIconClick"
    >
      <IconSearch class="p-1 text-white rounded-full w-7 bg-red-dark" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import {
  getSearchSuggestion,
  RestaurantSearchSuggestion,
  CuisineSearchSuggestion,
  LocationSearchSuggestion,
} from "@/services/common/searchSuggestion";
import {
  shallowRef,
  computed,
  reactive,
  ref,
  onMounted,
  defineAsyncComponent,
} from "vue";
import IconSearch from "@/components/IconSearch.vue";
import type { Awaited } from "ts-essentials";
import HhImage from "../../components/HhImage.vue";

type Results = {
  restaurants: RestaurantSearchSuggestion[];
  locations: LocationSearchSuggestion[];
  cuisines: CuisineSearchSuggestion[];
};

const SearchRestaurant = defineAsyncComponent(
  () => import("../search/SearchRestaurant.vue")
);

const keyword = ref("");
const isLoading = ref(false);
const isError = ref(false);
const isExpanded = ref(false);
const results: Results = reactive({
  restaurants: [],
  cuisines: [],
  locations: [],
});
const anyResult = computed(() => {
  return (
    results.cuisines.length > 0 ||
    results.cuisines.length > 0 ||
    results.locations.length > 0
  );
});

function onInput(word: string) {
  keyword.value = word;
  if (keyword.value.length > 3) {
    doSearchSuggestion();
  }
}

async function onIconClick() {
  isExpanded.value = !isExpanded.value;
}

async function doSearchSuggestion() {
  isLoading.value = true;
  isError.value = false;
  const { isSuccess, data, message } = await getSearchSuggestion(keyword.value);
  isLoading.value = false;
  if (!isSuccess && message) {
    isError.value = true;
    return;
  }
  if (!data) {
    return;
  }

  results.cuisines = data.cuisines;
  results.locations = data.locations;
  results.restaurants = data.restaurants;

  console.log("data", data);
}
</script>
<script lang="ts">
export default {
  name: "NavbarSearch",
};
</script>
