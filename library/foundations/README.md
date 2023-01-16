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

## yarn tokens:generate

This script generates the theme by using the generated token layers file with the package version as a suffix if a RADIUS_LAYERS_SUFFIX environment variable is set. It outputs the theme to the generated directory in the format specified by the second argument (in this case, css).

It is important to note that the tokens:ci and tokens:update scripts use the RADIUS_LAYERS_SUFFIX environment variable to append the package version to the output file name. It is recommended to use these scripts in the specific scenarios described above.
