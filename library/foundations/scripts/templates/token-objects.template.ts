/*
   TEMPLATE FOR TYPESCRIPT TOKEN OBJECT
  Generates a TypeScript file with all the tokens in the theme
*/
import type { TokenLayers } from '../lib/token-parser';

// for debug purposes
// import * as sourceLayers from '../../generated/token-layers-1.2.0.json';

const EXCLUDE_LAYERS = ['radius--core'];

type NU<T> = T extends undefined ? never : T;
const isNotUndefined = <T>(u: T): u is NU<T> => u !== undefined;

type TokenValue = {
  value: string;
  layers: string[];
};

const isTokenValue = (value: unknown): value is TokenValue =>
  typeof value === 'object' && value !== null && 'value' in value;

type TokenStructure =
  | Record<string, string>
  | Record<string, TokenValue>
  | { [key: string]: TokenStructure };

const nestObject = (
  obj: TokenStructure,
  keys: string[],
  value: TokenValue,
  leafRenderer?: (value: TokenValue) => string
): TokenStructure => {
  const [currentKey, ...restKeys] = keys;
  const currentValue = obj[currentKey];

  // external renderer to convert the value to a string
  const render = leafRenderer ?? ((v: TokenValue) => v);

  const nestedValue =
    restKeys.length > 0 &&
    !isTokenValue(currentValue) &&
    typeof currentValue !== 'string'
      ? nestObject(currentValue || {}, restKeys, value, leafRenderer)
      : render(value);

  return {
    ...obj,
    [currentKey]: nestedValue,
  } as TokenStructure;
};

export const renderTokenObjects = ({ order, layers }: TokenLayers) => {
  const layerVariables = order
    .map((layer) =>
      layers.find((l) => l.name === layer && !EXCLUDE_LAYERS.includes(l.name))
    )
    .filter(isNotUndefined)
    .reduce((tokens, layer) => {
      const { name, variables } = layer;
      const previous = tokens || {};
      // accumulates variables from all layers, recording in which layers they appear
      const updated = variables.reduce((acc, curr) => {
        const previousToken = previous[curr.name] ?? {
          value: curr.key,
          layers: [layer.name],
        };
        const token = {
          ...previousToken,
          layers: [...previousToken.layers.filter((l) => l !== name), name],
        };
        return { ...acc, [curr.name]: token };
      }, {} as Record<string, TokenValue>);
      return {
        ...previous,
        ...updated,
      };
    }, {} as Record<string, TokenValue>);

  // returns an object that nests one level for every dot in the token key
  const nestedTokenValues = (renderer?: (value: TokenValue) => string) =>
    Object.entries(layerVariables).reduce(
      (allTokens, [key, value]) =>
        nestObject(allTokens, key.split('.'), value, renderer),

      {} as TokenStructure
    );

  return Buffer.from(`
        /// Nested Token Structure
        export const radiusTokensInfo = ${JSON.stringify(
          nestedTokenValues(),
          null,
          2
        )} as const;

        /// Nested Token CSS Keys
        export const radiusTokens = ${JSON.stringify(
          nestedTokenValues((v) => v.value),
          null,
          2
        )} as const;
        
        `);
};
