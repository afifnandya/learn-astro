<template>
  <Story :title="title">
    <Variant>
      <RestaurantCard v-bind="state" />

      <template #controls>
        Content: <input type="text" v-model="state.name" /> Disabled:
        <input type="number" v-model="state.price" />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import RestaurantCard from "./RestaurantCard.vue";
const title = "Restaurant Card Section";

const state = reactive({
  isLoading: false,
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
});
</script>
