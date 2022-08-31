<template>
  <picture>
    <source
      v-for="imageSource in imageSources"
      :type="imageSource.format"
      :srcset="imageSource.source"
      :media="imageSource.mediaQuery"
    />
    <img :src="parsedSrc" :alt="alt" :width="widthInNumber" />
  </picture>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import useImageMutator from "@/composable/useImageMutator";
import { isContainHttp } from "@/helper/url";

// scenario
// 1. local image can pass retina version
// 2. external image can provide single src then use image service to generete webp and retina

type SrcSet = {
  source: string;
  format?: string;
  breakpoint?: {
    minWidth: number;
    maxWidth: number;
  };
  pixelDensity?: string;
  useMutator?: boolean;
};

const props = defineProps({
  alt: {
    type: String,
    default: "",
    required: false,
  },
  sources: {
    type: Array as PropType<SrcSet[]>,
    default: [],
    required: false,
  },
  src: {
    type: String as any,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});

const { sources, width, src } = props;
const widthInNumber = typeof width === "string" ? parseInt(width) : 0;
const imageSources: {
  format: string | undefined;
  mediaQuery: string | undefined;
  source: string | undefined;
}[] = [];

const isLocal = isContainHttp(src) ? false : true;
const parsedSrc = isLocal ? src : src;

function generateMediaQuery(maxWidth: number, minWidth: number) {
  if (!maxWidth && !minWidth) {
    return undefined;
  }
  return maxWidth ? `(max-width: ${maxWidth})` : `(min-width: ${minWidth})`;
}

function genereteSrcSet({
  mutatorOption,
  src,
}: {
  mutatorOption?: { width: number; format?: string };
  src: string;
}) {
  if (!src) {
    return "";
  }
  if (mutatorOption) {
    return generateImageURL({
      width: mutatorOption.width,
      isWebp: mutatorOption.format === "webp",
      image: src,
    });
  }
  return src;
}

function generateImageURL({
  width,
  isWebp,
  image,
  isEnlarge = false,
}: {
  width: number;
  isWebp: boolean;
  image: string;
  isEnlarge?: boolean;
}) {
  return useImageMutator({
    image,
    width,
    height: 0,
    isWebp: isWebp,
    isEnlarge,
  });
}

function generateDefaultWebp() {
  const webpImage = genereteSrcSet({
    mutatorOption: { width: widthInNumber, format: "webp" },
    src: src,
  });
  const webpImageRetina = genereteSrcSet({
    mutatorOption: { width: widthInNumber * 2, format: "webp" },
    src: src,
  });
  const finalImgSrc = `${webpImage} 1x, ${webpImageRetina} 2x`;
  return {
    format: "image/webp",
    mediaQuery: undefined,
    source: finalImgSrc,
  };
}

function init() {
  if (Array.isArray(sources)) {
    sources.forEach((imgSource) => {
      const usedWidth =
        imgSource.breakpoint?.maxWidth || imgSource.breakpoint?.minWidth || 0;
      imageSources.push({
        format: imgSource.format ? `image/${imgSource.format}` : undefined,
        mediaQuery: imgSource.breakpoint
          ? generateMediaQuery(
              imgSource.breakpoint.maxWidth,
              imgSource.breakpoint.minWidth
            )
          : undefined,
        source: imgSource.useMutator
          ? genereteSrcSet({
              mutatorOption: { width: usedWidth, format: imgSource.format },
              src: imgSource.source,
            })
          : imgSource.source,
      });
    });
    return;
  }
  // for use case #2
  if (!isLocal) {
    imageSources.push(generateDefaultWebp());
    return;
  }
}

init();
</script>
