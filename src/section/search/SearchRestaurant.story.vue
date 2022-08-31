<template>
  <Story :title="title"> <SearchRestaurant /> </Story>
</template>

<script lang="ts" setup>
import SearchRestaurant from "./SearchRestaurant.vue";
const title = "Search Restaurant";
</script>
