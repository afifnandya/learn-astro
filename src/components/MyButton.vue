<template>
  <div class="text-white bg-red-dark">
    {{ translate("lol") }}
  </div>
  <div>
    {{ selectedCityName }}
  </div>
</template>

<script lang="ts" setup>
import { translate } from "@/composable/useTranslate";
import { selectedCityName } from "@/stores/city";
</script>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>
