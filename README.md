# Build Your Own Themable Product With Theming Parameters And Modern CSS

> [!WARNING]
> 🚧 This branch contains nothing but the slides for the talk ["Themable products with theming parameters and modern CSS"](../../blob/slides/slides/Themable%20products%20with%20theming%20parameters%20and%20modern%20CSS.pptx) and for the workshop ["Build your own themable product with theming parameters and modern CSS"](../../blob/slides/slides/Build%20your%20own%20themable%20product%20with%20theming%20parameters%20and%20modern%20CSS.pptx) from UI5con 2025.
>
> To start with the workshop switch back to [`main`](../../tree/main) and go on from there.

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ui5con-2025-theming-workshop)](https://api.reuse.software/info/github.com/SAP-samples/ui5con-2025-theming-workshop)

## Description

This repository contains different starting points for the workshop "Build Your Own Themable Product With Theming Parameters And Modern CSS" held by [**@andreas-roessler**](https://github.com/andreas-roessler), [**@bhartel**](https://github.com/bhartel), [**@david-klug-sap**](https://github.com/david-klug-sap) and [**@dominikschreiber**](https://github.com/dominikschreiber) at UI5con 2025, on July 8<sup>th</sup> at SAP in St.Leon-Rot, Germany.

## Requirements

- [git](https://git-scm.com)
- [node](https://nodejs.org)
- a browser
- a text editor/IDE

## Download and Installation

```sh
git clone git@github.com:SAP-samples/ui5con-2025-theming-workshop
cd ui5con-2025-theming-workshop
git switch no-theming
# or git switch parameters-get
# or git switch library-less
npm ci
npm start # to start a livereload server
npm test # to test your solution against the minimal scope
```

## Get Started

To pick a starting point, switch to one of the following branches:

- [`no-theming`](../../tree/no-theming) for a project that does not have a theming solution yet
- [`parameters-get`](../../tree/parameters-get) for a project that uses UI5s [`Parameters.get()`](https://ui5.sap.com/#/api/sap.ui.core.theming.Parameters%23methods/sap.ui.core.theming.Parameters.get) for theming
- [`library-less`](../../tree/library-less) for a project that has a library.less as part of the UI5 distribution build

e.g.

```sh
git switch no-theming
```

## The Task

Every starting point tried to make the project themable in a different way. All of them have drawbacks.

Replace the theming logic with a **skeleton css** that is parameterized with the CSS custom properties that are available in UI5s sap.ui.core library.css since UI5 1.127. Make use of relative colors and container style queries to **implement color functions**. As a bonus, make the project **work with UI5 < 1.127** by adding a dependency to [`@sap-theming/theming-base-content`](/sap/theming-base-content).

You can track your progress with a set of OPA5 tests:

```sh
npm test
```

If you feel stuck, you can always peek at the solution by adding `-solution` to your branch, e.g.

```sh
git switch no-theming-solution
```

The minimum solution scope tested by OPA5 tests is

- [ ] the top-most petal (`:nth-of-type(5)`) has `--sapSelectedColor` as the `background-color` in sap_horizon, sap_horizon_dark, sap_horizon_hcb and sap_horizon_hcw
- [ ] the top-most petal has `opacity: 0.8` in sap_horizon and sap_horizon_dark, and `opacity: 1` in sap_horizon_hcb and sap_horizon_hcw

Other than that, you can be creative with the use of color functions. The sample solution applies the following logic:

- [ ] the `background-color` of every petal
  - [ ] is 10% darker than the previous petal in sap_horizon
  - [ ] is 10% lighter than the previous petal in sap_horizon_dark
  - [ ] stays `--sapSelectedColor` in sap_horizon_hcb and sap_horizon_hcw
- [ ] the `border-color` of every petal
  - [ ] is 20% darker than the petals `background-color` in sap_horizon
  - [ ] is 20% lighter than the petals `background-color` in sap_horizon_dark
  - [ ] is the petals `color` (text color) in sap_horizon_hcb and sap_horizon_hcw
- [ ] the `color` (text color) of every petal is a either `--sapTextColor` or `--sapContent_ContrastTextColor` based on contrast against the petals background in sap_horizon, sap_horizon_dark, sap_horizon_hcb and sap_horizon_hcw
- [ ] all petals have `opacity: 0.8` in sap_horizon and sap_horizon_dark, and `opacity: 1` in sap_horizon_hcb and sap_horizon_hcw

## Tools And Techniques

### Relative Colors

With CSS Relative Colors (see [Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)), you can implement **color functions** like `lighten()`, `darken()` or more. Most of the time it is necessary to use a modern color space, usually `oklch()` (or `oklab()`). Now you can apply `calc()` to the different channel variables of that color:

```css
.color-functions {
	--color: #123456;
	--lighten-10: oklch(from var(--color) calc(l + 0.1) c h);
	--darken-20: oklch(from var(--color) calc(l - 0.2) c h);
	/* chroma != saturation, but it's close */
	--saturate-30: oklch(from var(--color) l calc(c + 0.3) h);
	--desaturate-40: oklch(from var(--color) l calc(c + 0.4) h);
	--hue-rotate-50: oklch(from var(--color) l c calc(h + 50deg));
}
```

### Container Style Queries

> [!WARNING]
> Container _style_ queries are available in Firefox only with the flag `layout.css.style-queries.enabled` enabled, until Bug [1795622](https://bugzil.la/1795622) is solved.

CSS container queries (see [Using container size and style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)) allow to define CSS that applies in specific parts of the page. Container _style_ queries, especially, allow to query the value of CSS properties _and custom properties_. Themes provide the custom property `--sapSapThemeId`, to define CSS for specific themes (see [Theme-specific CSS for your application](https://community.sap.com/t5/technology-blog-posts-by-sap/theme-specific-css-for-your-application/ba-p/13961249)):

```css
@container style(--sapSapThemeId: sap_horizon)
  or style(--sapSapThemeId: sap_horizon_dark)
  or style(--sapSapThemeId: sap_fiori_3)
  or style(--sapSapThemeId: sap_fiori_3_dark) {
	body {
		/* CSS for low-contrast themes */
	}
}
```

### Contrast

Until browsers implement [`contrast-color()`](https://drafts.csswg.org/css-color-5/#contrast-color) properly, we can use a technique described in [On compliance vs readability: Generating text colors with CSS](https://lea.verou.me/blog/2024/contrast-color/) to implement background-color-dependent text colors. We define a helper variable, apply the technique to that variable, use a container style query to react in its value, and set the actual value accordingly:

```css
@property --_ContrastColor {
	syntax: "<color>";
	inherits: true;
	initial-value: red;
}
:root {
	--Background: #123456;
	--TextColor: #f7f8f9;
	--_ContrastColor: oklch(from var(--Background) clamp(0, (l / 0.623 - 1) * -infinity, 1) 0 0);
}
@container style(--_ContrastColor: oklch(0 0 0)) {
	/* black */
	body {
		--TextColor: #123456;
	}
}
```

If `--Background` is theme-dependent (i.e. it is defined in a container style query `--sapSapThemeId`), the `--TextColor` can't be defined on the `body`, it has to be defined inside (because the `--Background` is defined at the `body`, which then is the container the style query must match).

## Known Issues

No known issues.

## How to obtain support

[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.

For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License

Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
