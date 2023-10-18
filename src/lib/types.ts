import type { COLOR_NAMES } from "~/utils/ionic/colors";

export type IonicColorName = Lowercase<(typeof COLOR_NAMES)[number]>;
export type CustomColorName = Omit<string, IonicColorName>;

export type ColorName = IonicColorName | CustomColorName;

export type HexColor = string;

export type ColorConfig = {
  light?: HexColor;
  dark?: HexColor;
};

export type ColorValue = HexColor | ColorConfig;

export type LightDarkOptional<T> = T | { light?: T; dark?: T };
