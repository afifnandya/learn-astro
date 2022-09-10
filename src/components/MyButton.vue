<template>
  <div class="text-white bg-red-dark">
    {{ translate("lol") }}
  </div>
</template>

<script lang="ts" setup>
import { translate } from "@/composable/useTranslate";
</script>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>
