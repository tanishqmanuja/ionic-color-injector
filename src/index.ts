import { ColorVariable } from "./color";
import { defaultColorNames, generateColor } from "./utils.js";

export const injectIonicColor = (
	name: string,
	color: string,
	darkColor?: string,
	options?: {
		duplicationCheck?: boolean;
	}
) => {
	const opts = { duplicationCheck: true, ...options };

	let css = getColorCss(name, generateColor(color));

	if (darkColor) {
		css +=
			"\n" +
			getColorCss(name, generateColor(darkColor), {
				selector: ":root .dark",
				addNewColorClass: false,
			});
	}

	const headEl = document.getElementsByTagName("head")[0];
	// remove existing style element
	const existingStyleEl = headEl.querySelectorAll(
		`style[data-ion-color="${name}"]`
	)?.[0];
	if (opts.duplicationCheck && existingStyleEl) {
		existingStyleEl.remove();
	}
	const styleEl = document.createElement("style");
	styleEl.dataset["ionColor"] = name;
	styleEl.appendChild(document.createTextNode(css));
	headEl.appendChild(styleEl);
};

export const getColorCss = (
	name: string,
	color: ColorVariable,
	options?: { selector?: string; addNewColorClass?: boolean }
) => {
	const opts = {
		selector: ":root",
		addNewColorClass: true,
		...options,
	};

	let css = `${opts.selector} {
		--ion-color-${name}: ${color.value};
		--ion-color-${name}-rgb: ${color.valueRgb};
		--ion-color-${name}-contrast: ${color.contrast};
		--ion-color-${name}-contrast-rgb: ${color.contrastRgb};
		--ion-color-${name}-shade: ${color.shade};
		--ion-color-${name}-tint: ${color.tint};
	}`;

	if (opts.addNewColorClass && !defaultColorNames.find(it => it === name)) {
		css += "\n" + getNewColorClassCss(name);
	}

	return css;
};

export const getNewColorClassCss = (name: string) => `.ion-color-${name} {
	--ion-color-base: var(--ion-color-${name});
	--ion-color-base-rgb: var(--ion-color-${name}-rgb);
	--ion-color-contrast: var(--ion-color-${name}-contrast);
	--ion-color-contrast-rgb: var(--ion-color-${name}-contrast-rgb);
	--ion-color-shade: var(--ion-color-${name}-shade);
	--ion-color-tint: var(--ion-color-${name}-tint);
}`;
