<template>
  <div>
    <slot name="input"></slot>
    <slot name="loading">
      <div class="flex items-center">
        <Spinner />
      </div>
    </slot>
    <div>
      <!-- <slot v-if="isLoading" name="loading"></slot> -->
      <slot name="suggestion"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Spinner from "./Spinner.vue";
</script>

<script lang="ts">
export default {
  name: "SearchSuggestion",
};
</script>
