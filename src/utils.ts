import { Color, ColorVariable, RGB } from "./color.js";

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

export const generateProperty = (name: string) =>
    `--ion-color-${name.toLowerCase()}`;

const rgbToString = (c: RGB): string => {
    return `${c.r},${c.g},${c.b}`;
};

export const defaultColorNames = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "warning",
    "danger",
    "dark",
    "medium",
    "light",
];

export type LooseAutoComplete<T extends string> = T | Omit<string, T>;
