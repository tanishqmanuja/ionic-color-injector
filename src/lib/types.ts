import type { COLOR_NAMES } from "~/utils/ionic/colors";
import type { LooseAutoComplete } from "~/utils/types";

export type HexColor = string;
export type ColorName = LooseAutoComplete<
  Lowercase<(typeof COLOR_NAMES)[number]>
>;
export type ColorConfig = {
  light?: HexColor;
  dark?: HexColor;
};
