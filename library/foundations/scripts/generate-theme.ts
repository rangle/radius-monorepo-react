import { promises } from 'fs';
import {
  isExpression,
  PARAM_SCREEN_MAX_WIDTH,
  parseData,
  TokenLayers,
  TokenOutput,
  writeToStdout,
  PARAM_SECTION_NAME,
  PARAM_SCREEN_MIN_WIDTH,
  readStdin,
} from './lib/token-parser';

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

// Wraps special layers based on detecting specific parameters.
// It is possible to create more sophisticated parameters for layers in the future
const layerWrapper = (params: Record<string, string>, template: string) => {
  if (params[PARAM_SECTION_NAME])
    return `
  /* this layer requires a class to be added to a section or the body */
  .${params[PARAM_SECTION_NAME]} {
    ${template}
  }
    `;

  if (params[PARAM_SCREEN_MIN_WIDTH] && params[PARAM_SCREEN_MAX_WIDTH])
    return `
  /* this layer automatically activates when the screen is between two specific sizes */
  @media screen and (min-width: ${params[PARAM_SCREEN_MIN_WIDTH]}) and (max-width: ${params[PARAM_SCREEN_MAX_WIDTH]}) {
    ${template}
  }
    `;

  if (params[PARAM_SCREEN_MIN_WIDTH])
    return `
  /* this layer automatically activates when the screen is bigger than a specific size */
  @media screen and (min-width: ${params[PARAM_SCREEN_MIN_WIDTH]}) {
    ${template}
  }
    `;

  if (params[PARAM_SCREEN_MAX_WIDTH])
    return `
  /* this layer automatically activates when the screen is smaller than a specific size */
  @media screen and (max-width: ${params[PARAM_SCREEN_MAX_WIDTH]}) {
    ${template}
  }
    `;

  // if it's not a special case, returns only the template
  return `${template}`;
};

const convertExpressions = (token: TokenOutput): TokenOutput =>
  isExpression(token.value)
    ? { ...token, value: `Calc(${token.value})` }
    : token;

const renderCSSVariables = ({ order, layers }: TokenLayers) =>
  Buffer.from(`
@layer ${order.join()};

${layers
  .map(
    ({ name, variables, parameters }) => `

@layer ${name} {
  ${layerWrapper(
    parameters,
    `
    :root {
      ${variables
        .map(convertExpressions)
        .map(
          ({ key, value }) => `
        ${key}: ${value};`
        )
        .join('')}
    }`
  )}
}`
  )
  .join('')}
`);

const templates: RenderTemplateMap = {
  css: renderCSSVariables,
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

// for Debug Purposes
// loadPreviousLayersFile(`${__dirname}/../token-layers.json`)
readStdin()
  .then(parseData)
  .then(renderTemplate)
  .then(writeToStdout)
  .catch((e) => {
    console.error('ERROR:', e);
  });
