import * as data from '../tokens.json';

/*
 * FIGMA TOKENS JSON PARSER
 * - flattens the JSON structure
 * - maps the Contexts from the JSON file to first class Layers
 * - built as a single file with no dependencies -- for portability
 * - in the future, can be integrated to the Radius CLI
 */

// TODO: remove duplicate names in keys
// TODO: add convert expressions to calc
// TODO: resolve references
// TODO: render layers properly
// TODO: render media queries for resolution layers

const template = (content: string) => `
:root {
  ${content}
  }
  `;

const outputCSSVariables = async (lines: string[]) => {
  const content = lines.join('\n');
  console.log(template(content));
};

/* GENERIC JSON STRUCTURES ON THE DATA FILE */

/** Leaf node containing a string value */
type JSONLeaf = {
  value: string;
  type: string;
};

/** Composite node containing a more complex value */
type JSONCompositeLeaf = {
  type: string;
  value: Record<string, string> | Array<Record<string, string>>;
};

/** Generic node */
type JSONStructure = {
  [key: string]: JSONLeaf | JSONStructure;
};

/** Root structure of the JSON file */
type TokenStructure = Record<string, JSONStructure> & {
  $themes: unknown[];
  $metadata: {
    tokenSetOrder: string[];
  };
};

/** Output Token Descriptor */
type TokenOutput = {
  name: string;
  key: string;
  type: string;
  value: string;
};

/* SPECIAL TOKEN STRUCTURES TO CREATE SHORTHAND DEFINITIONS */

type BoxShadowDefinition = {
  color: string;
  type: 'dropShadow'; // there should be a 2nd kind
  x: string;
  y: string;
  blur: string;
  spread: string;
};

export type CompositeLeafBoxShadow = {
  type: 'boxShadow';
  value: Array<BoxShadowDefinition> | BoxShadowDefinition;
};

export const isCompositeLeafBoxShadow = (
  u: JSONCompositeLeaf
): u is CompositeLeafBoxShadow =>
  (<CompositeLeafBoxShadow>u).type === 'boxShadow';

export type CompositeLeafTypography = {
  type: 'typography';
  value: {
    fontFamily: string;
    fontWeight: string;
    lineHeight: string;
    fontSize: string;
    letterSpacing: string;
    paragraphSpacing: string;
    textCase: string;
    textDecoration: string;
  };
};

export const isCompositeLeafTypography = (
  u: JSONCompositeLeaf
): u is CompositeLeafTypography =>
  (<CompositeLeafTypography>u).type === 'typography';

const isString = (u: unknown): u is string => typeof u === 'string';

const isArray = <T>(u: T | T[]): u is T[] =>
  typeof u === 'object' && Array.isArray(u);

const isJSONLeaf = (u: unknown): u is JSONLeaf =>
  typeof (<JSONLeaf>u).type === 'string' &&
  typeof (<JSONLeaf>u).value === 'string';

const isCompositeLeaf = (u: unknown): u is JSONCompositeLeaf =>
  typeof (<JSONCompositeLeaf>u).type === 'string' &&
  typeof (<JSONCompositeLeaf>u).value === 'object';

// convert names to kebab-case in case they come as CamelCase or pascalCase
const toKebabCase = (s: string) =>
  s
    .replace(/\./g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-');

// create a formatted key that's more css-friendly
const formatKey = (str: string) => toKebabCase(str);

// create a token description base on a JSONLeaf
const renderToken = (name: string, item: JSONLeaf) => ({
  key: `--${item.type}-${formatKey(name)}`,
  name,
  value: item.value,
  type: item.type,
});

const renderCompositeToken = (name: string, item: JSONCompositeLeaf) => {
  // TODO: evaluate moving this to the renderer, as this looks too biased to CSS
  if (isCompositeLeafBoxShadow(item)) {
    const value = isArray(item.value) ? item.value : [item.value];
    return renderToken(name, {
      type: item.type,
      value: value
        .map(
          ({ x, y, blur, spread, color }) =>
            `${x} ${y} ${blur} ${spread} ${color}`
        )
        .join(','),
    });
  }
  if (isCompositeLeafTypography(item)) {
    {
      const { fontWeight, fontSize, lineHeight, fontFamily } = item.value;
      return renderToken(name, {
        type: item.type,
        value: `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`,
      });
    }
  }
  console.log(item);
  throw new Error('Unsupported CompositeLeaf type');
};

export const extractTokens = (
  dataSet: JSONStructure,
  parentName: string,
  references: Record<string, string> = {},
  results?: TokenOutput[]
): TokenOutput[] => {
  let finalResult = results ?? [];
  for (const key in dataSet) {
    // create keyname with the same patter as the references
    const keyName = `${parentName ? `${parentName}.` : ''}${key}`;

    // this is the item we want
    const item = dataSet[key];
    // if it's a single token, process it
    if (isJSONLeaf(item)) {
      references[`{${keyName}}`] = item.value;
      finalResult = [...finalResult, renderToken(keyName, item)];

      // if it's a composite token, we should render it with our special functions
    } else if (isCompositeLeaf(item)) {
      finalResult = [...finalResult, renderCompositeToken(keyName, item)];
    } else if (isString(item)) {
      finalResult = [
        ...finalResult,
        renderToken(keyName, {
          type: 'lone-string',
          value: item,
        }),
      ];
    }
    // if it's just an empty level, go one level deeper, carrying the keyName
    else {
      finalResult = [
        ...finalResult,
        ...extractTokens(item, keyName, references),
      ];
    }
  }
  return finalResult;
};

const formatLayerName = (str: string) =>
  str.toLowerCase().replace(/\s/g, '').replace(/\//g, '--');

const bracketsAround = /[\{][a-zA-Z0-9.\-]*[\}]/;
const isReference = (u: string) => u.match(bracketsAround);

const formatValue = (value: string) => {
  if (isReference(value) != null) {
    if (value.includes('*')) {
      // TODO: detect expressions
    } else {
      // TODO: replace reference with their value
    }
  }
  return value;
};

data; //?

const processReferences = (refs: Record<string, string>) => (t: TokenOutput) =>
  t;

const processLayers = <T extends TokenStructure>(input: T) => {
  const {
    $metadata: { tokenSetOrder },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $themes,
    ...tokenData
  } = input;
  const references: Record<string, string> = {};
  const layers = Object.keys(tokenData)
    .map((key) => {
      const layer = tokenData[key];
      const name = formatLayerName(key);
      const variables = extractTokens(layer, '', references);
      return { name, variables };
    })
    .map(({ variables, ...rest }) => ({
      ...rest,
      variables: variables.map(processReferences(references)),
    }));
  return { layers, order: tokenSetOrder.map(formatLayerName) };
};

const layerList = processLayers(data);

layerList;

const core = layerList.layers[1];
core;
console.log(core);
