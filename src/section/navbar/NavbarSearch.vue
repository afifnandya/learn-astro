<template>
  <div class="relative flex items-center">
    <div
      class="hidden"
      :style="isExpanded ? 'display: block' : 'display: hidden'"
    >
      <transition
        v-show="isExpanded"
        enter-active-class="transition duration-300 ease-in-out"
        enter-from-class="transform scale-x-0 translate-x-1/2 opacity-0"
        enter-to-class="transform scale-x-100 translate-x-0 opacity-100"
        leave-active-class="transition duration-300 ease-in-out"
        leave-from-class="transform scale-x-100 translate-x-0 opacity-100"
        leave-to-class="transform scale-x-0 translate-x-1/2 opacity-0"
        class="absolute inset-y-0 hidden h-8 space-x-2 bg-white rounded-l-full right-1/2"
      >
        <SearchRestaurant
          :any-result="anyResult"
          :is-loading="isLoading"
          :is-error="isError"
          @on-input="onInput"
        ></SearchRestaurant>
      </transition>
    </div>
    <button
      data-cy="navbar-search-toggle"
      type="button"
      class="relative rounded-full ring-black focus:outline-none"
      :class="isExpanded ? 'ring-2' : 'ring-0'"
      @click="isExpanded = !isExpanded"
    >
      <IconSearch class="p-1 text-white rounded-full w-7 bg-red-dark" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import SearchRestaurant from "../search/SearchRestaurant.vue";
import {
  getSearchSuggestion,
  SearchSuggestionResponse,
} from "@/api/common/searchSuggestion";
import { computed, reactive, ref, watch } from "vue";
import IconSearch from "@/components/IconSearch.vue";

type Results = {
  restaurants: SearchSuggestionResponse["data"]["restaurants"];
  locations: SearchSuggestionResponse["data"]["locations"];
  cuisines: SearchSuggestionResponse["data"]["cuisines"];
};

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
