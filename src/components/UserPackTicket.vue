<template>
  <div
    class="flex items-center justify-between border border-gray-400 rounded-lg wrapper-shadow"
  >
    <div
      class="flex flex-col justify-between flex-1 p-2 border-r border-gray-400"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0 w-1 h-1 mr-1 rounded-full bg-red-dark"></div>
        <div class="text-lg font-bold text-red-dark">{{ code }}</div>
      </div>
      <div class="text-sm">{{ title }}</div>
      <div class="text-xs text-gray-500">{{ validUntilLabel }}</div>
    </div>
    <div class="p-2">
      <div class="flex flex-col justify-between text-sm">
        <button
          class="px-2 py-1 mb-2 capitalize border rounded-lg text-red-dark border-red-dark"
        >
          {{ translate("redeem") }}
        </button>
        <button
          class="px-2 py-1 capitalize border rounded-lg text-red-dark border-red-dark"
        >
          {{ translate("share") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { translate } from "@/composable/useTranslate";
import dayjs from "@/lib/dayjs";
import { defineComponent } from "vue";
export default defineComponent({
  name: "UserPackageTicket",
  props: {
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    validStartDate: {
      type: String,
      required: true,
    },
    validEndDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    validUntilLabel() {
      const startDate = dayjs(this.validStartDate);
      const endDate = dayjs(this.validEndDate);
      if (!startDate.isValid() || !endDate.isValid()) {
        return "";
      }
      return `${translate("validUntil")} ${startDate.format(
        "DD MMM"
      )} - ${endDate.format("DD MMM YYYY")}`;
    },
  },
  methods: {
    translate,
  },
});
</script>

<style lang="css" scoped>
.wrapper-shadow {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
}
</style>
