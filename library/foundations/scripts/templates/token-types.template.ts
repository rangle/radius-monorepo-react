/*
   TEMPLATE FOR TYPESCRIPT TOKEN TYPES
  Generates a TypeScript file with all the tokens in the theme
*/
import {
  TYPOGRAPHY_TOKEN_PROPS,
  TokenLayers,
  toKebabCase,
} from '../lib/token-parser';

const EXCLUDE_LAYERS = ['core'];
const COMPONENT_LAYER_NAME = 'Component';

// convert kebab case to CamelCase. convers a special case when there's two dashes
const toCamelCase = (str: string) =>
  str
    .replace(/--/g, '-')
    .replace(/-([a-zA-Z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([a-zA-Z])/g, (_, letter) => letter.toUpperCase());

// groups an array of dash-separated strings into an object with the first part of the string as the key
// and the value is an array of all the strings that start with the key
const groupByKeyPrefix = (index: number, arr: string[]) =>
  arr.reduce((acc, curr) => {
    const prefix = curr.split('-')[index];
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    return { ...acc, [prefix]: [...acc[prefix], curr] };
  }, {} as Record<string, string[]>);

const groupIndexByNamePrefix = (index: number, arr: string[]) =>
  arr.reduce((acc, curr, idx) => {
    const prefix = toCamelCase(curr.split('.')[index]);
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    return { ...acc, [prefix]: [...acc[prefix], idx] };
  }, {} as Record<string, number[]>);

const fromIndexGroupToKeyGroup =
  <R extends Record<string, string[]>>(names: string[]) =>
  (acc: R, [subject, indexes]: [string, number[]]) => ({
    ...acc,
    [subject]: indexes.map((idx) => names[idx]),
  });

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
        names: variables.map((variable) => variable.name),
      };
    });

  const allKeys = layerVariables.flatMap(({ keys }) => keys);
  const allNames = layerVariables.flatMap(({ names }) => names);

  const indexToKeys = (indexGroup: Record<string, number[]>) =>
    Object.entries(indexGroup).reduce(
      fromIndexGroupToKeyGroup(allKeys),
      {} as Record<string, string[]>
    );

  const allKeysByType = groupByKeyPrefix(2, allKeys);
  const allIndexesByLayer = groupIndexByNamePrefix(0, allNames);
  const allKeysByLayer = indexToKeys(allIndexesByLayer);
  const componentIndexes = allIndexesByLayer[COMPONENT_LAYER_NAME];
  const componentNames = componentIndexes.map((idx) => allNames[idx]);
  const componentIndexesBySubject = componentIndexes
    ? groupIndexByNamePrefix(2, componentNames)
    : {};
  const componentKeysBySubject = indexToKeys(componentIndexesBySubject);

  const typeNames = Object.keys(allKeysByType);
  const layerNames = Object.keys(allKeysByLayer);
  const subjectNames = Object.keys(componentKeysBySubject);

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

  export type RadiusSubTokenTypes = ${TYPOGRAPHY_TOKEN_PROPS.map(toKebabCase)
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

    // Typography SubTokens By Type (--typography-..-font-size, --typography-..-font-weight, etc.)
    ${TYPOGRAPHY_TOKEN_PROPS.map(toKebabCase)
      .map(
        (type) => `
    export type Radius${toCamelCase(
      type
    )}SubTokens = Extract<RadiusTokens, \`--typography-\${string}-${type}\`>;`
      )
      .join('\n')};

  // Token Layers

  export type RadiusTokenLayers = ${layerNames
    .map(toKebabCase)
    .map((layer) => `'${layer}'`)
    .join(' | ')};

  // Tokens By Layer (--color-core, --typography-mode, etc.)

    ${layerNames
      .map(toKebabCase)
      .map(
        (layer) => `
    export type Radius${toCamelCase(
      layer
    )}Tokens<T extends RadiusTokenTypes=RadiusTokenTypes> = 
      Extract<RadiusTokens, \`--\${T}-${layer}-\${string}\`>;`
      )
      .join('\n')};

  // Token Subjects

  export type RadiusTokenSubjects = ${subjectNames
    .map((subject) => `'${toKebabCase(subject)}'`)
    .join(' | ')};

  // Tokens By Subject (--color-core-button, --typography-component-button, etc.)

    ${subjectNames
      .map(toKebabCase)
      .map(
        (subject) => `
    export type Radius${toCamelCase(
      subject
    )}Tokens<T extends RadiusTokenTypes=RadiusTokenTypes, U extends RadiusTokenLayers=RadiusTokenLayers> = 
      Extract<RadiusTokens, \`--\${T}-\${U}-${subject}-\${string}\`>;`
      )
      .join('\n')};


  // for Typography, Create an umbrella type that includes subtokens
  export type TokenAndSubtokenTypes = RadiusTokenTypes | RadiusSubTokenTypes;

  // Utilities

  export type CSSExpression =
    | string
    | number
    | boolean
    | null
    | undefined
    | CSSExpression[]
    | { [key: string]: CSSExpression };


  /**
   * Describes a token that matches the given type T and subject S. If no
   * subject is provided, all subjects are returned, and if no type is provided,
   * all types are returned.
   *
   * There can be multiple subjects for a given type, so for example you may
   * have \`--color-text-primary\` and \`--color-background-primary\`, or
   * \`--typography-heading-sm\` and \`--typography-body-sm\`.
   *
   * @example
   * CSSProp<'color', 'text'> // returns \`--color-text-\${string}\`
   * CSSProp<'typography'>; // returns \`--typography-\${string}\`
   */
  export type CSSTokensByTypeAndSubject<
    T extends TokenAndSubtokenTypes = TokenAndSubtokenTypes,
    S extends RadiusTokenSubjects = RadiusTokenSubjects,
    L extends RadiusTokenLayers = RadiusTokenLayers
  > = Extract<RadiusTokens, \`--\${T}-\${L}-\${S}-\${string}\` | \`--typography-\${L}-\${S}-\${string}-\${T}\`>;


  /** 
   * Describes a single token as described by
   * {@link CSSTokensByTypeAndSubject}, an array of
   * {@link CSSTokensByTypeAndSubject}, or a custom CSS expression provided
   * inside an object with the css property.
   * 
   * @example
   * // Single token
   * <RadiusAutoLayout padding="--spacing-component-spacing-button-padding">
   * // Multiple tokens (will be resolved in order in CSS)
   * <RadiusAutoLayout padding={[
        '--spacing-component-spacing-button-padding-vertical',
        '--spacing-component-spacing-button-padding-horizontal',
      ]}
      >
   * // Custom CSS expression
   * <RadiusAutoLayout padding={{ css: '10px 20px' }}>
   */
  export type CSSProp<
    T extends TokenAndSubtokenTypes = TokenAndSubtokenTypes,
    S extends RadiusTokenSubjects = RadiusTokenSubjects,
    L extends RadiusTokenLayers = RadiusTokenLayers
  > =
    | CSSTokensByTypeAndSubject<T, S, L>
    | Array<CSSTokensByTypeAndSubject<T, S, L> | 0>
    | { css: CSSExpression };


  /** Utility type that returns the provided token type(s) wrapped with the \`var()\` function. */
  export type Var<T> = T extends string ? \`var(\${T})\` : T;
  `);
};
