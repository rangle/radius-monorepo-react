/*
   TEMPLATE FOR TYPESCRIPT TOKEN TYPES
  Generates a TypeScript file with all the tokens in the theme
*/
import { TYPOGRAPHY_TOKEN_PROPS } from '../lib/token-parser';
import { toKebabCase } from '../lib/token-parser.utils';
import { TokenLayers } from '../lib/token-parser.types';

const DS_NAME = 'Radius';

const EXCLUDE_LAYERS = ['core'];

type NameIndexGroups = { [key: string]: number[] };
type TokenGroup = { [key: string]: string[] };
type TokenSpecificGroup = { key: string; values: string[] };

const SUBTOKEN_NAMES = TYPOGRAPHY_TOKEN_PROPS;

const at = <T>(arr: Array<T> | ReadonlyArray<T>, index: number) =>
  index < 0 ? arr[arr.length + index] : arr[index];

const toPascalCase = (str: string) =>
  str
    .replace(/--/g, '-')
    .replace(/-([a-zA-Z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([a-zA-Z])/g, (_, letter) => letter.toUpperCase());

type NU<T> = T extends undefined ? never : T;
const isNotUndefined = <T>(u: T): u is NU<T> => u !== undefined;

/// takes a list of dot-separated tokens and group them based on the first three segments
// e.g. groupByThreeSegments(['a.b.c.0', 'a.b.d.1', 'a.c.d.2', 'a.c.d.x']) => { 'a.b.c': [0], 'a.b.d': [1], 'a.c.d': [2, 3] }
const groupByThreeSegments = (names: string[]): NameIndexGroups => {
  return names.reduce<NameIndexGroups>((acc, name, index) => {
    const segments = name.split('.');
    const key = segments.slice(0, 3).join('.');
    const previous = acc[key] || [];
    return {
      ...acc,
      [key]: [...previous, index],
    };
  }, {});
};

/// takes a list of dot-separated tokens and group them based on selected prefixe segments
// e.g. groupByKeyPrefix([2, 0])(['a.b.c', 'a.b.d', 'a.c.d']) => { 'a.b': ['a.b.c', 'a.b.d'], 'a.c': ['a.c.d'] }
const groupByKeyPrefix =
  (segmentIndexes: number[]) =>
  (names: string[]): TokenGroup => {
    return names.reduce<TokenGroup>((acc, name) => {
      const segments = name.split('.');
      const key = segmentIndexes.map((n) => at(segments, n)).join('.');
      const previous = acc[key] || [];
      return {
        ...acc,
        [key]: [...previous, name],
      };
    }, {});
  };

const getTokenSpecificGroupNames = (groupName: string) =>
  DS_NAME + toPascalCase(groupName.replace(/\./g, '-')) + 'Tokens';

const assembleTokenGroup = (
  name: string,
  group: TokenGroup,
  render = getTokenSpecificGroupNames
) => {
  const pascalCaseName = toPascalCase(name);
  const keys = Object.keys(group);
  return {
    filterKeys: {
      name: `${DS_NAME}Token${pascalCaseName}s`,
      values: keys.map((key) => `'${toKebabCase(key)}'`),
    },
    groupMap: {
      name: `${DS_NAME}Token${pascalCaseName}Map`,
      values: keys.reduce((result, name) => {
        const key = toKebabCase(name);
        const previous = result[key] || [];
        return {
          ...result,
          [key]: [...previous, ...group[name].map(render)],
        };
      }, {} as { [key: string]: string[] }),
    },
    tokenBy: {
      name: `TokensBy${pascalCaseName}`,
    },
  };
};

type AssembledTokenGroup = ReturnType<typeof assembleTokenGroup>;

const renderTokenSpecificGroup = (group: TokenSpecificGroup) => {
  const tokenSpecificGroupName = getTokenSpecificGroupNames(group.key);
  const tokenKeyPrefix = toKebabCase(group.key);
  return `
export interface ${tokenSpecificGroupName}Index { 
  ['${tokenKeyPrefix}']: ${group.values.map((key) => `'${key}'`).join(' | ')};
};
export type ${tokenSpecificGroupName} = ${tokenSpecificGroupName}Index['${tokenKeyPrefix}'];
`;
};

const renderTokenGroup = (assembledTokenGroup: AssembledTokenGroup) => {
  const keyListName = assembledTokenGroup.filterKeys.name;
  const groupMapName = assembledTokenGroup.groupMap.name;
  const tokenByName = assembledTokenGroup.tokenBy.name;
  return `
export type ${keyListName} = ${assembledTokenGroup.filterKeys.values.join(
    ' | '
  )};
export type ${groupMapName} = {
${Object.keys(assembledTokenGroup.groupMap.values)
  .map(
    (key) =>
      `  ['${key}']: ${assembledTokenGroup.groupMap.values[key].join('|')};`
  )
  .join('\n')}
};
export type ${tokenByName}<L extends ${keyListName}> = ${groupMapName}[L];
`;
};

export const renderTokenTypes = ({ order, layers }: TokenLayers) => {
  const layerVariables = order
    .map((layer) =>
      layers.find((l) => l.name === layer && !EXCLUDE_LAYERS.includes(l.name))
    )
    .filter(isNotUndefined)
    .map((layer) => {
      const { name, variables } = layer;
      return {
        name: toPascalCase(name),
        keys: variables.map((variable) => variable.key),
        names: variables.map((variable) => variable.name),
      };
    });

  const allKeys = layerVariables.flatMap(({ keys }) => keys);
  const allNames = layerVariables.flatMap(({ names }) => names);

  const nameKeyMap = allNames.reduce((acc, name, index) => {
    return {
      ...acc,
      [name]: allKeys[index],
    };
  }, {} as { [key: string]: string });

  const keysBySpecificSegment = groupByThreeSegments(allNames);

  const groupByType = groupByKeyPrefix([1]); // layer.{type}.subject.rest
  const groupByLayer = groupByKeyPrefix([0]); // {layer}.type.subject.rest
  const groupBySubject = groupByKeyPrefix([2]); // layer.type.{subject}.rest

  // -- not used for now, but could be useful in the future
  // const groupByTypeAndSubject = groupByKeyPrefix([0, 2]);
  // const groupByLayerSubjectAndType = groupByKeyPrefix([0, 2, 1]);

  const groupBySubtoken = groupByKeyPrefix([-1]); // layer.type.subject.rest.{subtoken}

  const allTokenGroupsAndKeys = Object.entries(keysBySpecificSegment).map(
    ([key, indexes]): TokenSpecificGroup => ({
      key,
      values: indexes.map((i: number) => allKeys[i]),
    })
  );

  const allSpecificSegmentNames = Object.keys(keysBySpecificSegment);

  const allTokensByType = groupByType(allSpecificSegmentNames);
  const allTokensByLayer = groupByLayer(allSpecificSegmentNames);
  const allTokensBySegment = groupBySubject(allSpecificSegmentNames);

  // list of all tokens that are either a subtoken type or a subtoken themselves
  const allTokensBySubtoken = groupBySubtoken(
    allNames.filter((name) => SUBTOKEN_NAMES.find((t) => name.match(`.${t}$`)))
  );

  return Buffer.from(`

// Tokens By Layer, Type and Subject
${allTokenGroupsAndKeys.map(renderTokenSpecificGroup).join('\n')}
// Token groups By Segment
${renderTokenGroup(assembleTokenGroup('subject', allTokensBySegment))}
// Token groups by Layer
${renderTokenGroup(assembleTokenGroup('layer', allTokensByLayer))}
// Token groups by Type
${renderTokenGroup(assembleTokenGroup('type', allTokensByType))}
// Subtoken groups
${renderTokenGroup(
  assembleTokenGroup(
    'subtoken',
    allTokensBySubtoken,
    (s) => `'${nameKeyMap[s]}'`
  )
)}

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
     T extends ${DS_NAME}TokenTypes | ${DS_NAME}TokenSubtokens = ${DS_NAME}TokenTypes,
     S extends ${DS_NAME}TokenSubjects = ${DS_NAME}TokenSubjects,
     L extends ${DS_NAME}TokenLayers = ${DS_NAME}TokenLayers
   > = T extends ${DS_NAME}TokenSubtokens
     ? Extract<TokensBySubtoken<T>, \`--\${string}-\${L}-\${S}-\${string}\`>
     : T extends ${DS_NAME}TokenTypes
     ? TokensBySubject<S> & TokensByType<T> & TokensByLayer<L>
     : never;

/** 
   * Describes a single token as described by
   * {@link CSSTokensByTypeAndSubject}, an array of
   * {@link CSSTokensByTypeAndSubject}, or a custom CSS expression provided
   * inside an object with the css property.
   * 
   * @example
   * // Single token
   * <${DS_NAME}AutoLayout padding="--spacing-component-spacing-button-padding">
   * // Multiple tokens (will be resolved in order in CSS)
   * <${DS_NAME}AutoLayout padding={[
        '--spacing-component-spacing-button-padding-vertical',
        '--spacing-component-spacing-button-padding-horizontal',
      ]}
      >
   * // Custom CSS expression
   * <${DS_NAME}AutoLayout padding={{ css: '10px 20px' }}>
   */
export type CSSProp<
  T extends ${DS_NAME}TokenTypes | ${DS_NAME}TokenSubtokens = ${DS_NAME}TokenTypes,
  S extends ${DS_NAME}TokenSubjects = ${DS_NAME}TokenSubjects,
  L extends ${DS_NAME}TokenLayers = ${DS_NAME}TokenLayers
> =
  | CSSTokensByTypeAndSubject<T, S, L>
  | Array<CSSTokensByTypeAndSubject<T, S, L> | 0>
  | { css: CSSExpression };

/** Utility type that returns the provided token type(s) wrapped with the \`var()\` function. */
export type Var<T> = T extends string ? \`var(\${T})\` : T;
  `);
};
