<template>
  <div>
    <div class="flex items-center">
      <div class="mr-4 font-bold">Package Details</div>
      <div
        v-show="showCollect"
        class="flex flex-row items-center cursor-pointer collect-icon"
      >
        <img
          src="@/assets/img/icon-collect-red.png"
          width="18"
          height="18"
          loading="lazy"
          alt="icon collect"
          class="mr-2"
        />
        <span class="mr-4 text-xs capitalize text-red-dark">{{
          translate("collect")
        }}</span>
      </div>
      <div
        v-show="showRedeem"
        class="flex flex-row items-center cursor-pointer redeem-icon"
      >
        <img
          src="@/assets/img/icon-redeem-red.png"
          class="mr-2"
          width="18"
          height="18"
          loading="lazy"
          alt=""
        />
        <span class="mr-4 text-xs capitalize text-red-dark">{{
          translate("redeem")
        }}</span>
      </div>
    </div>

    <div class="mt-4">{{ description }}</div>

    <div class="mt-6 font-bold">How to use voucher</div>
    <ul class="flex items-center justify-between px-6 text-xs">
      <li class="max-w-[100px]">
        <img src="@/assets/img/icon-collect-voucher-step-1.png" alt="step 1" />
        <div>Buy a voucher</div>
      </li>
      <li class="max-w-[100px]">
        <img src="@/assets/img/icon-collect-voucher-step-2.png" alt="step 2" />
        <div>Contact restaurant / hotel to Redeem</div>
      </li>
      <li class="max-w-[100px]">
        <img src="@/assets/img/icon-collect-voucher-step-3.png" alt="step 3" />
        <div>Check in / Dine in</div>
      </li>
    </ul>

    <div class="mt-6 font-bold">Term of use</div>
    <div class="px-4 mt-6">
      <ul class="grid grid-cols-2 gap-4 text-sm list-disc list-outside">
        <li v-for="n in 5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quia
          cumque ex delectus, esse nihil est facere voluptas non laudantium
          minus dolor culpa. Voluptatem dolore, corporis cumque ullam reiciendis
          voluptatibus.
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { translate } from "@/composable/useTranslate";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PackageTicketDescription",
  props: {
    showRedeem: {
      type: Boolean,
      default: true,
    },
    showCollect: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    translate,
  },
});
</script>
