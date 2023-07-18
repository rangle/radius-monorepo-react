# Overview

This repository contains foundation scripts and variables for Design Systems. It provides a set of scripts that can be executed to validate, parse and generate the theme for the design system.

## Scripts

This repository contains several scripts that can be executed through the command line using yarn. Here's a breakdown of what each script does:

## yarn test

This script runs the tests for the repository. It uses the testing framework Jest and transpiles the TypeScript files with ts-jest.

## yarn tokens:ci

This script is meant to be used in the pipeline when a change is made to the tokens.json file by the design team. It validates the token layers and appends the package version as a suffix to the generated layers file.

## yarn tokens:update

This script is meant to be used locally to update the css variables in the theme. It parses the tokens, generates the token layers and appends the package version as a suffix to the generated layers file.

## yarn tokens:parse

This script parses the tokens and generates the token layers. It appends the package version as a suffix to the generated layers file if a RADIUS_LAYERS_SUFFIX environment variable is set.

## yarn tokens:validate

This script validates the token layers by comparing them with the original tokens file. It uses the generated layers file with the package version as a suffix if a RADIUS_LAYERS_SUFFIX environment variable is set.

The validator identifies **four** types of contexts/layers:
- **Source layers (`core`)** — tokens there are not supposed to be used directly in the code, only as reference to others. they need no special treatment — the exporter detects them automatically and resolves their variables to values during the build
- **Semantic layers** are divided in two specialized categories:
  - **Selectable layers** (`mode-light` or `mode-dark`) apply to some or all website features in a way developers can select using a className. To identify one of these, the exporter looks for a token named `section-name`. The value is the name of the scenario for each mode (ex.: `Light Mode` or `High Constrast`) that will be normalized automatically by the exporter to become a className (ex.: light-mode or high-contrast). The important thing to know about selectable layers is that they need to have the same tokens — or the exporter will throw an error.
  - **Viewport size layers** (`breakpoint-large`, etc) apply automatically to semantic situations that vary based on the viewport size (mobile vs desktop, for example). In order for this to work, they should have special tokens `screen-min-size` and `screen-max-size`  - to indicate their tokens are active when the viewport is between these values. Like selectable tokens, they  also need to have the same tokens — or the exporter will throw an error.
- **Consolidation layers** (`components`) will only contain references to other layers. If these references come from more than one semantic layer (for example, if a token called `component.button.background` points to a token `semantic.surface.action` that exists in both `mode-light` and `mode-dark`) the exporter will take note and make sure the selection is properly controlled by the changes in the semantic layers (for example, in CSS, adding all the necessary classes to the `@radius-components` CSS Layer). Consolidation layers do not need special variables, like ‘screen-min-size’ or ’section-name). The exporter detects them automatically

## yarn tokens:generate

This script generates the theme by using the generated token layers file with the package version as a suffix if a RADIUS_LAYERS_SUFFIX environment variable is set. It outputs the theme to the generated directory in the format specified by the second argument (in this case, css).

It is important to note that the tokens:ci and tokens:update scripts use the RADIUS_LAYERS_SUFFIX environment variable to append the package version to the output file name. It is recommended to use these scripts in the specific scenarios described above.

## yarn tokens:types

This script generates type definition files by using the generated token layers file. It outputs them to the generated directory as a typescript file. It will run prettier afterwards to ensure the file obeys
linting rules.

These type definitions allow developers to use tokens in their component files without resorting to 
javascript themes in runtime.