import { promises } from 'fs';
import { parseData, writeToStdout, readStdin } from './lib/token-parser';
import { createReplaceFunction } from './lib/token-parser.utils';
import {
  TokenLayers,
  GeneratorMappingDictionary,
  GeneratorMappingFunction,
} from './lib/token-parser.types';
import {
  renderStorybookStory,
  renderCSSVariables,
  renderTokenTypes,
  renderTokenObjects,
  renderDefaultThemeSettings,
} from './templates';

type RenderFunction = (
  { order, layers }: TokenLayers,
  replaceFunction?: GeneratorMappingFunction
) => Buffer;

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

const loadGeneratorMappingModule = async (
  path: string
): Promise<GeneratorMappingDictionary | null> => {
  try {
    return (await import(path)) as GeneratorMappingDictionary;
  } catch (e) {
    return null;
  }
};

export const loadGeneratorMappings = (templateName: string) => {
  console.warn('LOADING GENERATOR MAPPINGS for', templateName);
  const mapping = [
    `./mapping/${templateName}-generator`,
    `./mapping/all-generator`,
    `./mapping/generator`,
  ].reduce<Promise<GeneratorMappingDictionary>>(async (res, path) => {
    const loadedModule = await loadGeneratorMappingModule(path);
    const previousResult = await res;
    const map = loadedModule ? loadedModule['default'] : {};
    return { ...previousResult, ...map };
  }, Promise.resolve({}));

  return mapping;
};

const templates: RenderTemplateMap = {
  // render css variables
  css: renderCSSVariables,
  // render token types
  types: renderTokenTypes,
  // render token constants
  constants: renderTokenObjects,
  // render storybook theme
  storybook: renderStorybookStory,
  // render settings for the default theme
  defaultThemeSettings: renderDefaultThemeSettings,
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
  .then((input) =>
    Promise.all([parseData(input), loadGeneratorMappings(templateName)])
  )
  .then(([data, mapping]) =>
    renderTemplate(data, createReplaceFunction(mapping[templateName]))
  )
  .then(writeToStdout)
  .catch((e) => {
    console.error('ERROR:', e);
  });
