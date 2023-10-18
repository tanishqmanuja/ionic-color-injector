import type {
  ColorName,
  ColorConfig,
  ColorValue,
  LightDarkOptional,
} from "./types";
import {
  getColorStyles,
  getCustomColorClassStyles,
  isCustomColor,
} from "./utils";

type Options = {
  target?: HTMLElement;
  addClass: boolean;
  replaceExisting: boolean;
  selector: LightDarkOptional<string>;
};

const DEFAULT_OPTIONS = {
  addClass: true,
  replaceExisting: true,
  selector: ":root",
} satisfies Options;

export function injectIonicColor(
  colorName: ColorName,
  colorValue: ColorValue,
  options?: Partial<Options>,
) {
  const clrName: string = colorName.toLowerCase();
  const clr: ColorConfig =
    typeof colorValue === "string" ? { light: colorValue } : colorValue;
  const opts: Options = Object.assign(DEFAULT_OPTIONS, options);

  const stylesToInject: string[] = [];

  const selectorLight =
    typeof opts.selector === "string" ? opts.selector : opts.selector.light!;
  const selectorDark =
    typeof opts.selector === "object" && opts.selector.dark
      ? opts.selector.dark
      : `${selectorLight} .dark`;

  if (clr.light) {
    stylesToInject.push(
      getColorStyles(clrName, clr.light, { selector: selectorLight }),
    );
  }

  if (clr.dark) {
    stylesToInject.push(
      getColorStyles(clrName, clr.dark, { selector: selectorDark }),
    );
  }

  if (opts.addClass && isCustomColor(clrName)) {
    stylesToInject.push(getCustomColorClassStyles(clrName));
  }

  const css = stylesToInject.join("\n");

  const getHeadEl = () => {
    const headEl = document.getElementsByTagName("head")[0];
    if (!headEl) {
      console.warn("[ION-CLR-INJECTOR] Could not find head element!");
      return;
    }
    return headEl;
  };

  const targetEl = opts.target ?? getHeadEl();

  if (!targetEl) {
    console.warn("[ION-CLR-INJECTOR] Undefined target element");
    return;
  }

  // remove existing style element
  if (opts.replaceExisting) {
    const existingStyleEl = targetEl.querySelectorAll(
      `style[data-ion-color="${clrName}"]`,
    )?.[0];
    if (existingStyleEl) {
      existingStyleEl.remove();
    }
  }

  const styleEl = document.createElement("style");
  styleEl.dataset["ionColor"] = clrName;
  styleEl.appendChild(document.createTextNode(css));
  targetEl.appendChild(styleEl);
}
