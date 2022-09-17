<template>
  <div
    class="font-black text-center banner-bg h-[350px] text-white"
    :style="`background-image: url(${image})`"
  >
    <div
      class="flex flex-col items-center justify-center h-full pt-10 pb-10 bg-black/50"
    >
      <h1 class="mx-5 title">
        {{ title }}
      </h1>
      <h3 class="my-2 sub-title">
        <div>{{ translate("bannerCTA", { total: 1000 }) }}</div>
      </h3>
    </div>
  </div>
  <MyButtonVue />
</template>

<script lang="ts" setup>
import { getBanners } from "@/api/common/banner";
import { toRefs, onMounted, ref, defineAsyncComponent, computed } from "vue";
import MyButtonVue from "@/components/MyButton.vue";
import { addTranslate, translate } from "@/composable/useTranslate";
import type { GetBannerAPIResponse } from "@/api/common/banner";
import { rebuildAssetURL } from "@/helper/url";
import { selectedCityHomeDescription, selectedCity } from "@/stores/city";
const props = defineProps({
  totalCover: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cityId: {
    type: [String, Number],
    required: true,
  },
});

const { totalCover, cityId } = toRefs(props);
const title = selectedCityHomeDescription.value;

const banner = ref<GetBannerAPIResponse[]>([]);
const image = computed(() => {
  if (banner.value.length) {
    return rebuildAssetURL(banner.value[0].desktopRetinaVersions[0].url);
  }
  return null;
});

onMounted(async () => {
  const { isSuccess, message, data } = await getBanners(cityId.value);
  if (data?.length && isSuccess) {
    banner.value = data.filter((promotion) => {
      if (promotion.locations && promotion.locations.length) {
        const isLocationPromotion = promotion.locations.filter((location) =>
          location.includes("home_page")
        );
        return isLocationPromotion.length > 0 ? true : false;
      }
      return false;
    });
  }
});
</script>
<script lang="ts">
export default {
  name: "HomeBanner",
};
</script>

<style lang="scss" scoped>
.title {
  @screen md {
    font-size: 30px;
  }
  @screen lg {
    font-size: 40px;
  }
}

.sub-title {
  font-size: 10px;
  @screen md {
    font-size: 15px;
  }
  @screen lg {
    font-size: 20px;
  }
}
</style>
