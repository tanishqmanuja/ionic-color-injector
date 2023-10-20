![Logo](https://raw.github.com/tanishqmanuja/ionic-color-injector/main/assets/banner.png?maxAge=2592000)

# Ionic Color Injector

Ionic Color Injector is a utility that injects ionic colors with generated css variables into the a html element at runtime.

## Installation

- via npm

  ```bash
  npm install @tqman/ionic-color-injector
  ```

- via pnpm

  ```bash
  pnpm add @tqman/ionic-color-injector
  ```

- via bun

  ```bash
  bun install @tqman/ionic-color-injector
  ```

## Usage

```typescript
import { injectIonicColor } from "@tqman/ionic-color-injector";

// this will inject a style element into the document's head
injectIonicColor("primary", "#428cff");

/* Expected Result

<html>
  <head>
    <style data-ion-color="primary">
      :root {
        --ion-color-primary: #428cff;
        --ion-color-primary-rgb: 66,140,255;
        --ion-color-primary-contrast: #000000;
        --ion-color-primary-contrast-rgb: 0,0,0;
        --ion-color-primary-shade: #3a7be0;
        --ion-color-primary-tint: #5598ff;
      }
    </style>
  </head>
  <body>...</body>
</html>
*/
```
