import imageMutator from "@/services/common/imageMutator";

function useImageMutator({
  image,
  width,
  height,
  isWebp = true,
  isEnlarge = false,
  resizingType = "fill",
}: {
  image: string;
  width: number;
  height: number;
  isWebp?: boolean;
  isEnlarge?: boolean;
  resizingType?: string;
}) {
  const usedFormat = isWebp ? "webp" : "jpg";
  const enlargeConst = isEnlarge ? 1 : 0;

  return imageMutator(
    resizingType,
    width,
    height,
    "ce",
    enlargeConst,
    image,
    usedFormat
  );
}

export default useImageMutator;
