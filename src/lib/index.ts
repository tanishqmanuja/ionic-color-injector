import type { ColorName, HexColor, ColorConfig } from "./types";
import {
  getColorStyles,
  getCustomColorClassStyles,
  isCustomColor,
} from "./utils";

type Options = {
  target?: HTMLElement | null;
  addClass: boolean;
  replaceExisting: boolean;
};

const DEFAULT_OPTIONS: Options = {
  addClass: true,
  replaceExisting: true,
};

export function injectIonicColor(
  name: ColorName,
  color: HexColor | ColorConfig,
  options?: Partial<Options>,
) {
  name = name.toLowerCase();
  const clr: ColorConfig = typeof color === "string" ? { light: color } : color;
  const opts: Options = Object.assign(DEFAULT_OPTIONS, options);

  const stylesToInject: string[] = [];

  if (clr.light) {
    stylesToInject.push(getColorStyles(name, clr.light, { selector: ":root" }));
  }

  if (clr.dark) {
    stylesToInject.push(
      getColorStyles(name, clr.dark, { selector: ":root .dark" }),
    );
  }

  if (opts.addClass && isCustomColor(name)) {
    stylesToInject.push(getCustomColorClassStyles(name));
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
      `style[data-ion-color="${name}"]`,
    )?.[0];
    if (existingStyleEl) {
      existingStyleEl.remove();
    }
  }

  const styleEl = document.createElement("style");
  styleEl.dataset["ionColor"] = name as string;
  styleEl.appendChild(document.createTextNode(css));
  targetEl.appendChild(styleEl);
}
