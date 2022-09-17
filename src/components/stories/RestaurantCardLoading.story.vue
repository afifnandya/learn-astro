<template>
  <Story :title="title">
    <RestaurantCardLoading />
  </Story>
</template>

<script lang="ts" setup>
import RestaurantCardLoading from "../RestaurantCardLoading.vue";
const title = "Restaurant Card Loading";
</script>
