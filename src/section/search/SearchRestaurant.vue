<template>
  <SearchSuggestion>
    <template #input>
      <input type="text" />
    </template>
    <template #loading> </template>
    <template #suggestion>
      <span class="text-red-dark">{{ translate("hei") }}</span>
      <button @click="changeLang('en')">EN</button>
      <button @click="changeLang('th')">TH</button>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus
      soluta consequuntur quo totam ducimus debitis, sapiente delectus? Mollitia
      quam excepturi consequatur provident facilis incidunt, aliquid, ab rerum
      commodi, obcaecati a.
    </template>
  </SearchSuggestion>
</template>

<script lang="ts" setup>
import SearchSuggestion from "@/components/SearchSuggestion.vue";
import { translate, changeLang } from "@/composable/useTranslate";
</script>

<script lang="ts">
export default {
  name: "SearchRestaurant",
};
</script>
