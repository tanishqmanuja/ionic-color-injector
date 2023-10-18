import { COLOR_NAMES } from "~/utils/ionic/colors";
import { generateColor } from "~/utils/ionic";

export function isCustomColor(name: string): boolean {
  return !(COLOR_NAMES.find(n => n.toLowerCase() === name) !== undefined);
}

export function getColorStyles(
  name: string,
  color: string,
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

export function getCustomColorClassStyles(name: string): string {
  return `
.ion-color-${name} {
  --ion-color-base: var(--ion-color-${name});
  --ion-color-base-rgb: var(--ion-color-${name}-rgb);
  --ion-color-contrast: var(--ion-color-${name}-contrast);
  --ion-color-contrast-rgb: var(--ion-color-${name}-contrast-rgb);
  --ion-color-shade: var(--ion-color-${name}-shade);
  --ion-color-tint: var(--ion-color-${name}-tint);
}`.trim();
}
