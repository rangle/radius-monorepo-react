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

    export type CSSTokenSubjects =
      | 'text'
      | 'background'
      | 'interaction'
      | 'section'
      | 'heading'
      | 'body'
      | 'link'
      | 'btn'
      | 'screen'
      | 'button';

    ${subjectNames
      .map(
        (subject) => `
    export type Radius${toCamelCase(
      subject
    )}Tokens<T extends RadiusTokenTypes=RadiusTokenTypes> = 
      Extract<RadiusTokens, \`--\${T}-${subject}-\${string}\`>;`
      )
      .join('\n')};


  // Utilities

  type CSSExpression =
    | string
    | number
    | boolean
    | null
    | undefined
    | CSSExpression[]
    | { [key: string]: CSSExpression };

  export const renderCSSProp = (prop: RadiusTokens | { css: CSSExpression }) =>
    typeof prop === 'string' ? \`var(\${prop})\` : prop.css;

  /**
   * Returns a list of tokens that match the given type T and subject S. If no subject is provided, all subjects are returned, and if no type is provided, all types are returned.
   *
   * There can be multiple subjects for a given type, so for example you may have \`--color-text-primary\` and \`--color-background-primary\`, or \`--typography-heading-sm\` and \`--typography-body-sm\`.
   *
   * @example
   * CSSProp<'color', 'text'> // returns \`--color-text-\${string}\`
   * CSSProp<'typography'>; // returns \`--typography-\${string}\`
   */
  export type CSSTokensByTypeAndSubject<
    T extends RadiusTokenTypes = RadiusTokenTypes,
    S extends CSSTokenSubjects = CSSTokenSubjects
  > = Extract<RadiusTokens, \`--\${T}-\${S}-\${string}\`>;

  /** Returns a list of tokens tokens as described by {@link CSSTokensByTypeAndSubject}, or a custom CSS expression provided inside an object with the css property.
   * @example
   * <Typography color="--color-primary-base-500" font="--typography-base-lg" />
   * // vs:
   * <Typography color={{ css: "red" }} font={{ css: "Arial" }} />
   */
  export type CSSProp<
    T extends RadiusTokenTypes = RadiusTokenTypes,
    S extends CSSTokenSubjects = CSSTokenSubjects
  > = CSSTokensByTypeAndSubject<T, S> | { css: CSSExpression };

  /** Utility type that returns the provided token type(s) wrapped with the \`var()\` function. */
  export type Var<T> = T extends string ? \`var(\${T})\` : T;
  `);
};
