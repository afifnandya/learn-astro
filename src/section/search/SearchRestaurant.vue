<template>
  <div class="relative">
    <slot name="input" :inputHandler="inputHandler">
      <input
        type="text"
        class="w-full p-1 border border-gray-400 rounded-lg"
        @input="inputHandler"
        @focus="focusHandler"
        @blur="blurHandler"
      />
    </slot>

    <div
      v-show="isLoading || isError || showResult"
      class="absolute bottom-[-40px] right-0 w-full border border-gray-400 border-t-0 p-2 rounded-lg"
    >
      <div class="w-full" v-show="isLoading">
        <slot name="loading">
          <div class="flex items-center mt-2 text-sm capitalize">
            <Spinner size="sm" />
            <div class="ml-2">{{ translate("pleaseWait") }}</div>
          </div>
        </slot>
      </div>

      <div class="w-full" v-show="isError">
        <slot name="error" :tryAgain="$emit('onTryAgain')">
          <div class="flex flex-col items-center mt-2 text-sm capitalize">
            <div class="ml-2 text-red-dark">
              {{ "Oops, something went wrong" }}
            </div>
            <button
              class="px-2 py-1 mt-1 text-xs border rounded-lg border-red-dark text-red-dark hover:bg-red-dark hover:text-white"
              @click="$emit('onTryAgain')"
            >
              Try again
            </button>
          </div>
        </slot>
      </div>

      <div class="w-full" v-show="showResult">
        <slot name="suggestion"> </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { throttle } from "lodash-es";
import { translate } from "@/composable/useTranslate";
import { toRefs, ref } from "vue";
import Spinner from "@/components/Spinner.vue";
import { computed } from "@vue/reactivity";
const DEFAULT_DELAY = 1500;
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 1500,
  },
  anyResult: {
    type: Boolean,
    required: true,
  },
});

const { isLoading, isError, delay, anyResult } = toRefs(props);
const emits = defineEmits(["onTryAgain", "onInput"]);
const keyword = ref("");
const isFocus = ref(false);
const usedDelay = typeof delay === "number" ? delay : DEFAULT_DELAY;
const showResult = computed(() => {
  return anyResult.value && isFocus.value;
});

const inputHandler = throttle(
  (e: Event) => {
    const target = e.target as HTMLInputElement;
    keyword.value = target.value;

    emits("onInput", keyword.value);
  },
  usedDelay,
  { leading: false }
);

function focusHandler() {
  isFocus.value = true;
}

function blurHandler() {
  isFocus.value = false;
}
</script>

<script lang="ts">
export default {
  name: "SearchRestaurant",
};
</script>
