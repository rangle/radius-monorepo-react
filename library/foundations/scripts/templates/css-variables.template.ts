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
} from '../lib/token-parser';

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

export const renderCSSVariables = ({ order, layers }: TokenLayers) =>
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
