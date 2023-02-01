/*
 * EXPERIMENTAL FIGMA TOKEN STUDIO JSON PARSER
 * This script contains functions to parse the data from a JSON passed to it
 * from stdin and process it to extract the relevant information.
 * The final goal is to export the result to stdout -- so
 * a second script can validate and render the resulting Layers
 * into styling that can be used in the component library
 *
 * CONSTRAINTS
 * - built as a single file with no dependencies -- for portability
 * - in the future, can be integrated to the Radius CLI and Supernova scripts
 */

// TODO: remove duplicate names in keys
// TODO: add these features to Radius CLI Styles command

// CONFIGURATION
// ---
// Variables that identify special layers.
// when a Layer contains these variables, it means they should
// be added as `parameters` as well as `variables`
// ---
export const PARAM_SECTION_NAME = 'section-name';
export const PARAM_SCREEN_MIN_WIDTH = 'min-width';
export const PARAM_SCREEN_MAX_WIDTH = 'max-width';

const SPECIAL_LAYER_VARIABLES = [
  PARAM_SECTION_NAME,
  PARAM_SCREEN_MIN_WIDTH,
  PARAM_SCREEN_MAX_WIDTH,
];

// ----

/* GENERIC JSON STRUCTURES TO DESCRIBE THE DATA FILE */

/** Leaf node containing a string value */
export type JSONLeaf = {
  value: string;
  type: string;
};

/** Composite node containing a more complex value */
export type JSONCompositeLeaf = {
  type: string;
  value: Record<string, string> | Array<Record<string, string>>;
};

/** Generic node */
export type JSONStructure = {
  [key: string]: JSONLeaf | JSONCompositeLeaf | JSONStructure;
};

/** Root structure of the JSON file */
export type TokenStructure = Record<string, JSONStructure> & {
  $themes: unknown[];
  $metadata: {
    tokenSetOrder: string[];
  };
};

/** Output Token Descriptor */
export type TokenOutput = {
  name: string;
  key: string;
  type: string;
  value: string;
  rawValue?: string;
};

/* SPECIAL TOKEN STRUCTURES TO CREATE SHORTHAND DEFINITIONS *EXPERIMENTAL* */

export type BoxShadowDefinition = {
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

export type TokenLayer = {
  variables: TokenOutput[];
  name: string;
  parameters: Record<string, string>;
};

export type TokenLayers = {
  layers: TokenLayer[];
  order: string[];
};

export const isCompositeLeafTypography = (
  u: JSONCompositeLeaf
): u is CompositeLeafTypography =>
  (<CompositeLeafTypography>u).type === 'typography' &&
  typeof (<CompositeLeafTypography>u).value === 'object' &&
  !!(<CompositeLeafTypography>u).value.fontFamily &&
  !!(<CompositeLeafTypography>u).value.fontSize &&
  !!(<CompositeLeafTypography>u).value.fontWeight &&
  !!(<CompositeLeafTypography>u).value.lineHeight;

/* TYPE GUARDS TO HELP IDENTIFY THE TYPE OF NODES */

export const isString = (u: unknown): u is string => typeof u === 'string';

export const isArray = <T>(u: T | T[]): u is T[] =>
  typeof u === 'object' && Array.isArray(u);

export const isJSONLeaf = (u: unknown): u is JSONLeaf =>
  typeof (<JSONLeaf>u).type === 'string' &&
  typeof (<JSONLeaf>u).value === 'string';

export const isCompositeLeaf = (u: unknown): u is JSONCompositeLeaf =>
  typeof (<JSONCompositeLeaf>u).type === 'string' &&
  typeof (<JSONCompositeLeaf>u).value === 'object';

export const isTokenStudioJSON = (u: unknown): u is TokenStructure =>
  typeof (<TokenStructure>u).$themes === 'object' &&
  isArray((<TokenStructure>u).$themes) &&
  typeof (<TokenStructure>u).$metadata === 'object' &&
  typeof (<TokenStructure>u).$metadata.tokenSetOrder === 'object' &&
  isArray((<TokenStructure>u).$metadata.tokenSetOrder);

/* UTILTY FUNCTIONS */

// convert names to kebab-case in case they come as CamelCase or pascalCase
export const toKebabCase = (s: string) =>
  s
    .replace(/\./g, '-')
    .replace(/[^A-Za-z0-9_-]/g, ' ')
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s|--/g, '-');

// create a formatted key that's more css-friendly
export const formatKey = (str: string) => toKebabCase(str);

export const isEqual = <T extends Record<string, string>>(
  a: T,
  b: T
): boolean => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) return false;
  return aProps.every((propName, index) => a[propName] === b[bProps[index]]);
};

const expressionPattern =
  /^\d+(\.\d+)?(rem|px)?\s*[+\-*/]\s*\d+(\.\d+)?(rem|px)?(?:\s*[+\-*/]\s*\d+(\.\d+)?(rem|px)?)*$/g;
export const isExpression = (input: string): boolean => {
  return !!input.replace(' ', '').match(expressionPattern);
};

/* RENDERING RESULT FUNCTIONS */

// create a token description base on a JSONLeaf
export const renderToken = (name: string, item: JSONLeaf) => ({
  key: `--${item.type}-${formatKey(name)}`,
  name,
  value: item.value,
  type: item.type,
});

// create a token description of a composite token
export const renderCompositeToken = (name: string, item: JSONCompositeLeaf) => {
  // TODO: evaluate moving this to the renderer, as this looks too biased to CSS
  // TODO: expand the individual tokens into individual variables for non-web targets
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

  throw new Error('Unsupported CompositeLeaf type');
};

/* MAIN PARSER OF TOKENS */

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

/* REFERENCE PROCESSOR */

const bracketsAround = /[\{][a-zA-Z0-9.\-]*[\}]/g;
export const isReference = (u: string) => u.match(bracketsAround);

export const processParameters = (
  specialNames: string[],
  variables: TokenOutput[]
) =>
  variables
    .filter(({ name }) => specialNames.includes(name))
    .reduce(
      (res, { name, value }) => ({ ...res, [name]: value }),
      {} as Record<string, string>
    );

export const processReferences = (refs: Record<string, string>) => {
  const getRef = (value: string): string => {
    const references: string[] = value.match(bracketsAround) || [];
    // if there are no references in the value, return it
    if (references.length === 0) return value;
    // otherwise, process _all_ references you found
    return references.reduce((result, key) => {
      const res = key && refs[key];
      if (!res) {
        console.warn(`reference: ${key} not found`);
      }
      // if the result of the reference lookup is still a reference to something else...
      if (res && isReference(res)) {
        // recurse
        return getRef(res);
      } else {
        // othewrwise, replace the reference with the final value
        return result.replace(key, res);
      }
    }, value);
  };
  // returns a function that receives a token, and replaces its value with the
  // process version of this value -- replacing any references it can find
  // with the values stored in the reference map. It preserves the original value
  // in the `rawValue` attribute, in case the renderer needs it
  return (t: TokenOutput): TokenOutput => ({
    ...t,
    value: getRef(t.value),
    rawValue: t.value,
  });
};

/* INPUT JSON PARSER AND VALIDATOR */

// read data from standard input
export const readStdin = (): Promise<Buffer> => {
  if (!!process.stdin.setRawMode) {
    throw new Error(
      `This script should receive its input as data piped through standard input
       example:
         cat file.json | ts-node ${__filename} > result.json
      `
    );
  }
  return new Promise((resolve, reject) => {
    let chunks: Buffer[] = [];
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();

      if (chunk !== null) {
        chunks = [...chunks, chunk];
      }
    });
    process.stdin.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    process.stdin.on('error', reject);
  });
};

export const writeToStdout = (buffer: Buffer) => {
  process.stdout.write(buffer);
};

// converts the buffer to JSON and parse it
export const parseData = (input: Buffer) => {
  console.warn('PARSING JSON DATA');
  const fileDataAsString = input.toString();
  console.warn(` read ${fileDataAsString.length} bytes`);
  return JSON.parse(fileDataAsString);
};

// validates the JSON structure and asserts the data type
export const validateData = (u: unknown): TokenStructure => {
  console.warn('VALIDATING JSON FORMAT');

  if (isTokenStudioJSON(u)) {
    return u;
  } else {
    throw new Error('Data Structure is not Compatible with Parser');
  }
};

/* LAYER PROCESSOR */

export const formatLayerName = (str: string) =>
  str.toLowerCase().replace(/\s/g, '').replace(/\//g, '--');

// process each layer, extracting its tokens and parameters
export const processLayers = <T extends TokenStructure>(
  input: T
): TokenLayers => {
  console.warn('PROCESSING LAYERS...');

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
      const parameters = processParameters(SPECIAL_LAYER_VARIABLES, variables);
      return { name, variables, parameters };
    })
    .map(({ variables, ...rest }) => ({
      ...rest,
      variables: variables.map(processReferences(references)),
    }));
  return { layers, order: tokenSetOrder.map(formatLayerName) };
};

// Token Layer Snapshot Validator

export const compareTokenLayers = (
  snapshot: TokenLayers,
  update: TokenLayers,
  showValueDifferences: boolean
) => {
  const messages: string[] = [];
  {
    const layerOrderMap = new Map(
      snapshot.order.map((name, index) => [name, index])
    );
    const updatedExisingOrder = update.order.filter((l) =>
      layerOrderMap.has(l)
    );
    updatedExisingOrder.forEach((tokenName, index) => {
      if (tokenName !== snapshot.order[index]) {
        messages.push(
          `Different order at index ${index}: ${tokenName} vs ${snapshot.order[index]}`
        );
      }
    });
  }

  const updateLayersMap = new Map(update.layers.map((l) => [l.name, l]));

  snapshot.layers.forEach((originalLayer) => {
    const updatedLayer = updateLayersMap.get(originalLayer.name);
    if (updatedLayer) {
      if (!isEqual(updatedLayer.parameters, originalLayer.parameters)) {
        messages.push(`Different parameters in layer ${originalLayer.name}`);
      }
      {
        const variablesMap = new Map(
          updatedLayer.variables.map((v) => [v.key, v])
        );

        originalLayer.variables.forEach((originalVariable) => {
          const updatedVariable = variablesMap.get(originalVariable.key);
          if (!updatedVariable) {
            messages.push(
              `Variable removed in layer ${originalLayer.name}: ${originalVariable.key}`
            );
          } else if (showValueDifferences) {
            if (updatedVariable.value !== originalVariable.value) {
              messages.push(
                `Different variable value in layer ${originalLayer.name} for ${updatedVariable.key}
    Expected: ${originalVariable.value}
    Found: ${updatedVariable.value}`
              );
            }
          }
        });
      }
    } else {
      messages.push(`Missing layer ${originalLayer.name}`);
    }
  });
  return messages;
};
