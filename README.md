# Build Your Own Themable Product With Theming Parameters And Modern CSS

<!--- Register repository https://api.reuse.software/register, then add REUSE badge:
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ui5con-2025-theming-workshop)](https://api.reuse.software/info/github.com/SAP-samples/ui5con-2025-theming-workshop)
-->

## Description

This repository contains different starting points for the workshop "Build Your Own Themable Product With Theming Parameters And Modern CSS" held by [**@andreas-roessler**](https://github.com/andreas-roessler), [**@bhartel**](https://github.com/bhartel), [**@david-klug-sap**](https://github.com/david-klug-sap) and [**@dominikschreiber**](https://github.com/dominikschreiber) at UI5con 2025, on July 8<sup>th</sup> at SAP in St.Leon-Rot, Germany.

### Get Started

To pick a starting point, switch to one of the following branches:

- [`no-theming`](../../tree/no-theming) for a project that does not have a theming solution yet
- **[`library-less`](../../tree/library-less) for a project that has a library.less as part of the UI5 distribution build**
- [`parameters-get`](../../tree/parameters-get) for a project that uses UI5s [`Parameters.get()`](https://ui5.sap.com/#/api/sap.ui.core.theming.Parameters%23methods/sap.ui.core.theming.Parameters.get) for theming
- [`custom-theming`](../../tree/custom-theming) for a project that employs a custom theming solution

e.g.

```sh
git switch no-theming
```

### The Task

You started with a project that has a library.less as part of the UI5 distribution build. In our example, this only works for SAP-provided themes. In the real world, this relies on the existence and operability of the theming-service.

Replace the less files with a **skeleton css** that is parameterized with the CSS custom properties that are available in UI5s sap.ui.core library.css since UI5 1.127. Make use of relative colors and container style queries to **implement color functions**. As a bonus, make the project **work with UI5 < 1.127** by adding a dependency to [`@sap-theming/theming-base-content`](/sap/theming-base-content).

You can track your progress with a set of OPA5 tests:

```sh
npm test
```

If you feel stuck, you can always peek at the solution by adding `-solution` to your branch, e.g.

```sh
git switch library-less-solution
```

## Requirements

- [git](https://git-scm.com)
- [node](https://nodejs.org)
- a browser
- a text editor/IDE

## Download and Installation

```diff
  git clone git@github.com:SAP-samples/ui5con-2025-theming-workshop
  cd ui5con-2025-theming-workshop
+ git switch library-less
+ npm ci
+ npm start # starts a livereload server, opens the app in your default browser
```

## Known Issues

No known issues.

## How to obtain support

[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.

For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing

If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License

Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
