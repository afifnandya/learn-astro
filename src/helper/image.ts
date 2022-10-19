// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-media
export function generateSourceMediaQuery({
  maxWidth,
  minWidth,
}: {
  maxWidth?: number;
  minWidth?: number;
}) {
  if (!maxWidth && !minWidth) {
    return undefined;
  }
  return maxWidth ? `(max-width: ${maxWidth}px)` : `(min-width: ${minWidth}px)`;
}
