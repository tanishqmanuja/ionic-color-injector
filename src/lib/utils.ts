import { COLOR_NAMES } from "~/utils/ionic/colors";
import type { ColorName, HexColor } from "./types";
import { generateColor } from "~/utils/ionic";

export function isCustomColor(name: ColorName): boolean {
  return !(
    COLOR_NAMES.find(n => n.toLowerCase() === name.toLowerCase()) !== undefined
  );
}

export function getColorStyles(
  name: ColorName,
  color: HexColor,
  opts: { selector: string },
): string {
  const clr = generateColor(color);

  return `
${opts.selector} {
  --ion-color-${name}: ${clr.value};
  --ion-color-${name}-rgb: ${clr.valueRgb};
  --ion-color-${name}-contrast: ${clr.contrast};
  --ion-color-${name}-contrast-rgb: ${clr.contrastRgb};
  --ion-color-${name}-shade: ${clr.shade};
  --ion-color-${name}-tint: ${clr.tint};
}`.trim();
}

export function getCustomColorClassStyles(name: ColorName): string {
  const x = name.toLowerCase();
  return `
.ion-color-${x} {
  --ion-color-base: var(--ion-color-${x});
  --ion-color-base-rgb: var(--ion-color-${x}-rgb);
  --ion-color-contrast: var(--ion-color-${x}-contrast);
  --ion-color-contrast-rgb: var(--ion-color-${x}-contrast-rgb);
  --ion-color-shade: var(--ion-color-${x}-shade);
  --ion-color-tint: var(--ion-color-${x}-tint);
}`.trim();
}
