/* Adapted from https://github.com/ionic-team/ionic-docs */
import { type ColorVariable, Color, type RGB } from "./colors";

/* File: src/components/page/theming/_utils/index.tsx */

const rgbToString = (c: RGB): string => {
  return `${c.r},${c.g},${c.b}`;
};

export const generateColor = (value: string): ColorVariable => {
  const color = new Color(value);
  const contrast = color.contrast();
  const tint = color.tint();
  const shade = color.shade();

  return {
    value,
    valueRgb: rgbToString(color.rgb),
    contrast: contrast.hex,
    contrastRgb: rgbToString(contrast.rgb),
    tint: tint.hex,
    shade: shade.hex,
  };
};
