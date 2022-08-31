<template>
  <div>
    <slot name="input"></slot>
    <slot name="loading">
      <div class="flex items-center"></div>
    </slot>
    <div>
      <slot name="suggestion"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: "SearchSuggestion",
};
</script>
