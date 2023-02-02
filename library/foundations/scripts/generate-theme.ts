import { promises } from 'fs';
import {
  parseData,
  TokenLayers,
  writeToStdout,
  readStdin,
} from './lib/token-parser';
import { renderStorybookStory, renderCSSVariables } from './templates';

type RenderFunction = ({ order, layers }: TokenLayers) => Buffer;

type RenderTemplateMap = Record<string, RenderFunction>;

const [, , templateName] = process.argv;

if (!templateName) {
  console.error(
    `Usage:  cat token-layers.json | ts-node ${__filename} <template>`
  );
  process.exit(1);
}

export const loadPreviousLayersFile = (fileName: string) => {
  console.warn('LAYERS PROCESSED. VALIDATING', fileName);
  return promises.readFile(fileName);
};

const templates: RenderTemplateMap = {
  // render css variables
  css: renderCSSVariables,
  // render storybook theme
  storybook: renderStorybookStory,
  // default template for the test runner
  runner: renderCSSVariables,
};

const renderTemplate = templates[templateName];

/*
  # MAIN EXECUTION
  - reads layers from standard input
  - parses the data into a JSON
  - renders each layer, using the appropriate template
  - writes the file to stdout so it can be saved to disk
    to be used by the Design System packages
*/

readStdin()
  .then(parseData)
  .then(renderTemplate)
  .then(writeToStdout)
  .catch((e) => {
    console.error('ERROR:', e);
  });
