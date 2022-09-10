<template>
  <Story :title="title">
    <RestaurantCard v-bind="props" />
  </Story>
</template>

<script lang="ts" setup>
import RestaurantCard from "../RestaurantCard.vue";
const title = "Restaurant Card";

const props = {
  link: "",
  image: {
    src: "http://fakeimg.pl/1500?font=lobster",
    useMutator: false,
  },
  name: "Restaurant",
  price: 500,
  cuisine: "Seafood",
  location: "Bangkok",
  totalLocation: 0,
  reviewsCount: 100,
  reviewsScore: "4,3",
  pricingType: "per person",
  isDineIn: true,
  isDelivery: true,
  isXperience: true,
};
</script>
