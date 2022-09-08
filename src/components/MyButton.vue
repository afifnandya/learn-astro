<template>
  <div class="text-white bg-red-dark">
    {{ translate("lol") }}
  </div>
</template>

<script lang="ts" setup>
import { addTranslate, translate } from "@/composable/useTranslate";
import { selectedCityId, selectedCityName } from "@/stores/city";
import { onMounted, ref } from "vue";
addTranslate({
  en: {
    lol: "LOL EN",
  },
  th: {
    lol: "LOL TH",
  },
});
</script>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>
