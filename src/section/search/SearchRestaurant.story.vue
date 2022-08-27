<template>
  <Story :title="title"> <SearchRestaurant /> </Story>
</template>

<script lang="ts" setup>
const title = "Story title";
import SearchRestaurant from "./SearchRestaurant.vue";
</script>
