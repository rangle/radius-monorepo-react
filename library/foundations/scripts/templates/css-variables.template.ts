/*
   TEMPLATE FOR CSS VARIABLES
   Generates a CSS file with all the variables in the library
*/
import {
  PARAM_SECTION_NAME,
  PARAM_SCREEN_MIN_WIDTH,
  PARAM_SCREEN_MAX_WIDTH,
  TokenOutput,
  isExpression,
  TokenLayers,
  toKebabCase,
  GeneratorMappingFunction,
} from '../lib/token-parser';

// Wraps special layers based on detecting specific parameters.
// It is possible to create more sophisticated parameters for layers in the future
const layerWrapper = (
  params: Record<string, string | undefined>,
  dependencies: string[],
  template: string
) => {
  const sectionName = params[PARAM_SECTION_NAME];
  if (sectionName)
    return `
    /* ${sectionName} */
    /* this layer requires a class to be added to a section or the body */
    .${toKebabCase(sectionName)} {
      ${template}
    }
      `;
  if (dependencies.length)
    return `
      /* consolidated layer */
      /* this layer will be effective in the relevant sections where it sources its variables from */
      ${dependencies.map((name) => `.${toKebabCase(name)}`).join(', ')} {
        ${template}
      }
        `;

  if (params[PARAM_SCREEN_MIN_WIDTH] && params[PARAM_SCREEN_MAX_WIDTH])
    return `
    /* this layer automatically activates when the screen is between two specific sizes */
    @media screen and (min-width: ${params[PARAM_SCREEN_MIN_WIDTH]}) and (max-width: ${params[PARAM_SCREEN_MAX_WIDTH]}) {
      :root {
      ${template}
      }
    }
      `;

  if (params[PARAM_SCREEN_MIN_WIDTH])
    return `
    /* this layer automatically activates when the screen is bigger than a specific size */
    @media screen and (min-width: ${params[PARAM_SCREEN_MIN_WIDTH]}) {
      :root {
      ${template}
      }
    }
      `;

  if (params[PARAM_SCREEN_MAX_WIDTH])
    return `
    /* this layer automatically activates when the screen is smaller than a specific size */
    @media screen and (max-width: ${params[PARAM_SCREEN_MAX_WIDTH]}) {
      :root {
        ${template}
      }
    }
    `;

  // if it's not a special case, returns only the template
  return `
  :root {
  ${template}
  }
  `;
};

const variableReferenceRegex = /\{(--[\w-]+)\}/g;
const isVariableReference = (value: string) =>
  variableReferenceRegex.test(value);
const convertVariableReferences = (token: TokenOutput): TokenOutput =>
  isVariableReference(token.value)
    ? {
        ...token,
        value: token.value.replace(variableReferenceRegex, 'var($1)'),
      }
    : token;

const convertExpressions = (token: TokenOutput): TokenOutput =>
  isExpression(token.value)
    ? { ...token, value: `Calc(${token.value})` }
    : token;

export const renderCSSVariables = (
  { order, layers }: TokenLayers,
  processValue: GeneratorMappingFunction = (key, value) => value
) =>
  Buffer.from(`
  @layer ${order.join()};
  
  ${layers
    .map(
      ({ name, variables, parameters, dependencies }) => `
  
  @layer ${name} {
    ${layerWrapper(
      parameters,
      dependencies,
      `
        ${variables
          .filter(({ type }) => type !== 'other')
          .map(convertVariableReferences)
          .map(convertExpressions)
          .map(
            ({ key, value }) => `
          ${key}: ${processValue(key, value)};`
          )
          .join('')}`
    )}
  }`
    )
    .join('')}
  `);
