<template>
  <div></div>
</template>

<script lang="ts" setup>
import { setupConfig } from "@/stores/config";
import { fetchCity } from "@/stores/city";
fetchCity();
setupConfig();
</script>
<script lang="ts">
export default {
  name: "HomeAPIRequest",
};
</script>
