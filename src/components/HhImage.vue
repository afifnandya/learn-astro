<template>
  <picture>
    <source
      v-for="imageSource in imageSources"
      :type="imageSource.format"
      :srcset="imageSource.source"
      :media="imageSource.mediaQuery"
    />
    <img
      v-bind="$attrs"
      :src="parsedSrc"
      :alt="alt"
      :width="widthInNumber"
      loading="lazy"
    />
  </picture>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import useImageMutator from "@/composable/useImageMutator";
import { isContainHttp } from "@/helper/url";
import { generateSourceMediaQuery } from "@/helper/image";

// scenario
// 1. local image can pass retina version
// 2. external image can provide single src then use image service to generete webp and retina

export type SrcSet = {
  source: string;
  format?: string;
  breakpoint?: {
    minWidth?: number;
    maxWidth?: number;
  };
  width?: number;
  height?: number;
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
    type: String,
    required: true,
  },
  width: {
    type: [String, Number],
    required: true,
  },
  height: {
    type: String,
    default: "",
  },
  useMutator: {
    type: Boolean,
    default: true,
  },
});

type ImageSources = {
  format: string | undefined;
  mediaQuery: string | undefined;
  source: string | undefined;
}[];

const { sources, width, src, height, useMutator } = props;
const widthInNumber =
  typeof width === "string"
    ? parseInt(width)
    : typeof width === "number"
    ? width
    : 0;
const heightInNumber =
  typeof height === "string" && height.length
    ? parseInt(height)
    : typeof height === "number"
    ? height
    : 0;
const imageSources: ImageSources = [];

const isLocal = isContainHttp(src) ? false : true;
const parsedSrc = isLocal ? src : src;

function generateDefaultPreset() {
  const sources: ImageSources = [];

  const retinaImg = useImageMutator({
    image: src,
    width: widthInNumber * 2,
    height: heightInNumber * 2,
    isWebp: true,
  });

  sources.push({
    format: undefined,
    mediaQuery: undefined,
    source: retinaImg,
  });

  const webpImage = useImageMutator({
    image: src,
    width: widthInNumber,
    height: heightInNumber,
    isWebp: true,
  });
  const webpImageRetina = useImageMutator({
    image: src,
    width: widthInNumber * 2,
    height: heightInNumber * 2,
    isWebp: true,
  });

  const finalImgSrc = `${webpImage} 1x, ${webpImageRetina} 2x`;
  sources.push({
    format: "image/webp",
    mediaQuery: undefined,
    source: finalImgSrc,
  });

  return sources;
}

function init() {
  if (Array.isArray(sources) && sources.length) {
    sources.forEach((imgSource) => {
      const usedWidth = imgSource.width || 0;
      imageSources.push({
        format: imgSource.format ? `image/${imgSource.format}` : undefined,
        mediaQuery: imgSource.breakpoint
          ? generateSourceMediaQuery({
              maxWidth: imgSource.breakpoint.maxWidth,
              minWidth: imgSource.breakpoint.minWidth,
            })
          : undefined,
        source: imgSource.useMutator
          ? useImageMutator({
              width: usedWidth,
              height: imgSource.height || 0,
              isWebp: imgSource.format === "webp",
              image: imgSource.source,
            })
          : imgSource.source,
      });
    });
    return;
  }
  // for use case #2
  if (!isLocal) {
    if (useMutator) {
      const generateDefault = generateDefaultPreset();
      generateDefault.forEach((source) => {
        imageSources.push(source);
      });
      return;
    }
  }
}

init();
</script>

<script lang="ts">
export default {
  name: "HhImage",
};
</script>
