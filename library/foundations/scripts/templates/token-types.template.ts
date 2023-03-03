/*
   TEMPLATE FOR TYPESCRIPT TOKEN TYPES
  Generates a TypeScript file with all the tokens in the theme
*/
import type { TokenLayers } from '../lib/token-parser';

const EXCLUDE_LAYERS = ['radius--core'];

// convert kebab case to CamelCase. convers a special case when there's two dashes
const toCamelCase = (str: string) =>
  str
    .replace(/--/g, '-')
    .replace(/-([a-zA-Z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([a-zA-Z])/g, (_, letter) => letter.toUpperCase());

// groups an array of dash-separated strings into an object with the first part of the string as the key
// and the value is an array of all the strings that start with the key
const groupByPrefix = (index: number, arr: string[]) =>
  arr.reduce((acc, curr) => {
    const prefix = curr.split('-')[index];
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    return { ...acc, [prefix]: [...acc[prefix], curr] };
  }, {} as Record<string, string[]>);

type NU<T> = T extends undefined ? never : T;
const isNotUndefined = <T>(u: T): u is NU<T> => u !== undefined;

export const renderTokenTypes = ({ order, layers }: TokenLayers) => {
  const layerVariables = order
    .map((layer) =>
      layers.find((l) => l.name === layer && !EXCLUDE_LAYERS.includes(l.name))
    )
    .filter(isNotUndefined)
    .map((layer) => {
      const { name, variables } = layer;
      return {
        name: toCamelCase(name),
        keys: variables.map((variable) => variable.key),
      };
    });

  const allKeys = layerVariables.flatMap(({ keys }) => keys);
  const allKeysByType = groupByPrefix(2, allKeys);
  const allKeysBySubject = groupByPrefix(3, allKeys);

  const typeNames = Object.keys(allKeysByType);
  const subjectNames = Object.keys(allKeysBySubject);

  return Buffer.from(`
  // Layer Types
    ${layerVariables
      .map(
        ({ name, keys }) => `
    export type ${name}LayerTokens =
      ${keys.map((key) => `'${key}'`).join(' | ')};
    `
      )
      .join('\n')}

  // All Tokens
    export type RadiusTokens = ${layerVariables
      .map(({ name }) => `${name}LayerTokens`)
      .join(' | ')};

  // Token Types

  export type RadiusTokenTypes = ${typeNames
    .map((type) => `'${type}'`)
    .join(' | ')};

  // Tokens By Type (--color, --typography, etc.)
    ${typeNames
      .map(
        (type) => `
    export type Radius${toCamelCase(
      type
    )}Tokens = Extract<RadiusTokens, \`--${type}-\${string}\`>;`
      )
      .join('\n')};

  // Tokens By Subject (--color-button, --typography-button, etc.)
    ${subjectNames
      .map(
        (subject) => `
    export type Radius${toCamelCase(
      subject
    )}Tokens<T extends RadiusTokenTypes=RadiusTokenTypes> = 
      Extract<RadiusTokens, \`--\${T}-${subject}-\${string}\`>;`
      )
      .join('\n')};
  `);
};
