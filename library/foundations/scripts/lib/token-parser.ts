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

// For debugging purposes, you can run this script with:
// import data from '../../tokens-typography.json' assert { type: 'json' };

// TODO: remove duplicate names in keys
// TODO: add these features to Radius CLI Styles command

// CONFIGURATION
// ---
// Variables that identify special layers.
// when a Layer contains these variables, it means they should
// be added as `parameters` as well as `variables`
// ---
export const PARAM_SECTION_NAME = 'section-name';
export const PARAM_SCREEN_MIN_WIDTH = 'screen-min-width';
export const PARAM_SCREEN_MAX_WIDTH = 'screen-max-width';

const SPECIAL_LAYER_VARIABLES = [
  PARAM_SECTION_NAME,
  PARAM_SCREEN_MIN_WIDTH,
  PARAM_SCREEN_MAX_WIDTH,
];

export const FLAG_EXPAND_TYPOGRAPHY_TOKENS = true;
export const TYPOGRAPHY_TOKEN_PROPS = [
  'font',
  'fontFamily',
  'fontWeight',
  'lineHeight',
  'fontSize',
  'letterSpacing',
  'paragraphSpacing',
  'paragraphIndent',
  'textCase',
  'textDecoration',
] as const;

// ----

/* GENERIC JSON STRUCTURES TO DESCRIBE THE DATA FILE */

/** Leaf node containing a string value */
export type JSONLeaf = {
  value: string;
  type: string;
  description?: string;
};

/** Composite node containing a more complex value */
export type JSONCompositeLeaf = {
  type: string;
  value: Record<string, string> | Array<Record<string, string>>;
  description?: string;
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
  subtoken?: string;
  description?: string;
  value: string;
  rawValue?: string;
};
/* REFERENCE TOKEN */

type BasicReference = {
  key: string;
  sources: string[];
  isStatic: boolean;
};

export type SingleTokenReference = BasicReference & {
  token: TokenOutput;
};

export type CompositeTokenReference = BasicReference & {
  references: Record<string, TokenReference>;
  isReference: true;
};

export type TokenReference = SingleTokenReference | CompositeTokenReference;

export const isSingleTokenReference = (
  u: TokenReference
): u is SingleTokenReference =>
  isObject(u) &&
  (<SingleTokenReference>u).sources !== undefined &&
  (<SingleTokenReference>u).token !== undefined &&
  !('isReference' in u);

export const isCompositeTokenReference = (
  u: TokenReference
): u is CompositeTokenReference =>
  isObject(u) &&
  (<CompositeTokenReference>u).sources !== undefined &&
  (<CompositeTokenReference>u).references !== undefined &&
  (<CompositeTokenReference>u).isReference === true;

export type ReferenceMap = Record<string, TokenReference>;

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
  description?: string;
};

export const isCompositeLeafBoxShadow = (
  u: JSONCompositeLeaf
): u is CompositeLeafBoxShadow =>
  (<CompositeLeafBoxShadow>u).type === 'boxShadow';

export type CompositeLeafTypography = {
  type: 'typography';
  description?: string;
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
  parameters: Record<string, string | undefined>;
  dependencies: string[];
  isStatic: boolean;
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

/* GENERATOR MAP TYPES */

export type GeneratorMappingFrom = string | RegExp;

export type GeneratorMappingTo =
  | string
  | ((value: string) => string)
  | ((value: string, match: RegExpMatchArray | null) => string);

export type GeneratorMappingGenericDictionaryItem = readonly [
  from: GeneratorMappingFrom,
  to: GeneratorMappingTo
];

export type GeneratorMappingSpecificDictionaryItem = readonly [
  tokenPattern: RegExp,
  item: Array<readonly [from: GeneratorMappingFrom, to: GeneratorMappingTo]>
];

export type GeneratorMappingDictionaryItem =
  | GeneratorMappingGenericDictionaryItem
  | GeneratorMappingSpecificDictionaryItem;

export type GeneratorMappingDictionary = {
  [template: string]: Array<GeneratorMappingDictionaryItem>;
};

export type GeneratorMappingFunction = (key: string, value: string) => string;

export const isGeneratorMappingGenericDictionaryItem = (
  u: unknown
): u is GeneratorMappingGenericDictionaryItem =>
  isArray(u) &&
  u.length === 2 &&
  (isString(u[0]) || u[0] instanceof RegExp) &&
  (isString(u[1]) || typeof u[1] === 'function');

export const isGeneratorMappingSpecificDictionaryItem = (
  u: unknown
): u is GeneratorMappingSpecificDictionaryItem =>
  isArray(u) &&
  u.length === 2 &&
  u[0] instanceof RegExp &&
  isArray(u[1]) &&
  u[1].every(isGeneratorMappingGenericDictionaryItem);

/** createReplaceFunction
 * parse the mapping dictionary and return a function that takes a key and a value and returns the value with the replacements
 * @param mapping Dictionary of mappings to replace values
 * @returns a function that takes a key and a value and returns the value with the replacements
 */
export const createReplaceFunction = (
  mapping: GeneratorMappingDictionary[string]
): GeneratorMappingFunction => {
  const items = mapping || [];
  const replacingFunctions = items.flatMap((item) => {
    if (isGeneratorMappingSpecificDictionaryItem(item)) {
      const [tokenRegex, specificItems] = item;
      return specificItems.map(([from, to]) => {
        const regex = isString(from) ? new RegExp(from) : from;

        return (key: string, value: string) =>
          tokenRegex.test(key) && regex.test(value)
            ? value.replace(
                regex,
                isString(to) ? to : to(value, value.match(regex))
              )
            : value;
      });
    } else {
      const [from, to] = item;
      const regex = isString(from) ? new RegExp(`^${from}$`) : from;

      return (_: string, value: string) =>
        regex.test(value)
          ? value.replace(
              regex,
              isString(to) ? to : to(value, value.match(regex))
            )
          : value;
    }
  });

  return (key: string, value: string) =>
    replacingFunctions.reduce<string>((acc, fn) => fn(key, acc), value);
};

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
    .replace(/\s/g, '-')
    .replace(/--/g, '-');

// create a formatted key that's more css-friendly
export const formatKey = (str: string) => toKebabCase(str);

export const renderKey = <T extends Pick<TokenOutput, 'name' | 'type'>>(
  { name, type }: T,
  subtoken?: string
): string =>
  type !== 'other'
    ? `--${type}-${formatKey(name.replace(type, ''))}${
        subtoken ? `-${toKebabCase(subtoken)}` : ''
      }`
    : renderOtherKey(name, subtoken);

export const renderOtherKey = (name: string, subtoken?: string): string => {
  const [layer, type, ...rest] = name.split('.');
  return `--${type}-${formatKey(`${layer}.${rest.join('.')}`)}${
    subtoken ? `-${toKebabCase(subtoken)}` : ''
  }`;
};

export const renderName = <T extends Pick<TokenOutput, 'name' | 'type'>>(
  { name }: T,
  subtoken?: string
): string => `${name}${subtoken ? `.${subtoken}` : ''}`;

export const isEqual = <T extends Record<string, string | undefined>>(
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

const hasParameters = (parameters: Record<string, string>) =>
  Object.keys(parameters).filter((key) => key !== 'description').length > 0;

export const removeDuplicates = <T>(arr: T[]): T[] =>
  arr.filter((value, index, array) => array.indexOf(value) === index);

export const processParameters = (
  specialNames: string[],
  dataSet: JSONStructure
) =>
  Object.entries(dataSet)
    .filter(
      ([name, { value }]) =>
        specialNames.includes(name) && typeof value === 'string'
    )
    .reduce(
      (res, [name, { value }]) => ({ ...res, [name]: value as string }),
      {} as Record<string, string>
    );

/* RENDERING RESULT FUNCTIONS */

// create a token description base on a JSONLeaf
export const renderToken = (
  name: string,
  item: JSONLeaf,
  subtoken?: string
): TokenOutput => ({
  key: renderKey({ name, type: item.type }, subtoken),
  name: renderName({ name, type: item.type }, subtoken),
  value: item.value,
  type: item.type,
  description: item.description,
  ...(subtoken ? { subtoken } : {}),
});

// create a token description of a composite token. Optionally also expands all the individual tokens
export const renderCompositeToken = (
  name: string,
  item: JSONCompositeLeaf,
  expandTokens: boolean
) => {
  // TODO: evaluate moving this to the renderer, as this looks too biased to CSS
  // TODO: expand the individual tokens into individual variables for non-web targets
  if (isCompositeLeafBoxShadow(item)) {
    const value = isArray(item.value) ? item.value : [item.value];
    return [
      renderToken(name, {
        type: item.type,
        value: value
          .map(
            ({ x, y, blur, spread, color }) =>
              `${x} ${y} ${blur} ${spread} ${color}`
          )
          .join(','),
      }),
    ];
  }
  // if this is a typography composite token, we need to expand it into individual tokens
  if (isCompositeLeafTypography(item)) {
    const { fontWeight, fontSize, lineHeight, fontFamily } = item.value;
    // shorthand CSS font property will hold a helper for CSS
    const shortHandToken = renderToken(
      name,
      {
        type: item.type,
        description: item.description || 'Shorthand CSS font property',
        value: `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`,
      },
      'font'
    );
    // individual tokens for each property coming from figma
    const expandedTokens = expandTokens
      ? Object.entries(item.value).map(([key, value]) =>
          renderToken(
            name,
            {
              type: item.type,
              description: item.description || `CSS ${key} property`,
              value,
            },
            key
          )
        )
      : [];
    return [shortHandToken, ...expandedTokens];
  } else throw new Error('Unsupported CompositeLeaf type');
};

const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === 'object' && item !== null && !Array.isArray(item);

const isTokenOutput = (item: unknown): item is TokenOutput =>
  isObject(item) && 'key' in item && 'value' in item && 'type' in item;

/* TOKEN REFERENCE MANAGER */

/* REFERENCE PROCESSOR */
const bracketsAround = /[\{][a-zA-Z][a-zA-Z0-9.\-]*[\}]/g;
export const isReference = (u: string) => u.match(bracketsAround);
const isPresent = <T>(a: T[], b: T[]) => a.some((item) => b.includes(item));

// for each reference, replace it with either a static value or a dynamic reference
// preappy dependencies, callback and prop, return a function to be added to a reduce function
const processReference =
  (
    dependencies: string[],
    getRef: (ref: TokenOutput, prop?: string) => string,
    prop?: string
  ) =>
  (value: string, baseRef: TokenReference) => {
    const ref = (
      isCompositeTokenReference(baseRef) &&
      isSingleTokenReference(baseRef.references[prop || ''])
        ? baseRef.references[prop || '']
        : baseRef
    ) as SingleTokenReference;

    const key = ref.key;
    // if it's a normal reference, replace it with the token key
    if (!ref.isStatic) {
      // if the reference is not static, add its dependencies to the list of dependencies
      if (!isPresent(ref.sources, dependencies))
        // add all elements of the sources array to the dependencies array if they are not already present
        dependencies.push(
          ...ref.sources.filter((s) => !dependencies.includes(s))
        );
      // return a reference to the token key instead of the token name
      return value.replace(key, `{${renderKey(ref.token, prop)}}`);
    }

    if (isReference(ref.token.value)) {
      // if the reference is a static reference,
      // recursively replace it with the value or the reference
      return getRef(ref.token, prop);
    }

    // othewrwise, replace the reference with the final value
    return value
      .replace(key, ref.token.value)
      .replace(baseRef.key, ref.token.value);
  };

let once = false;

const getReferencesFromValue = (
  refs: ReferenceMap,
  value: string,
  recursive = false
): TokenReference[] => {
  const referenceNames: string[] = value.match(bracketsAround) || [];

  // otherwise, process _all_ references you found creating an array with the actual references
  const references = referenceNames.reduce((res, key) => {
    // if key is falsy, return the result
    if (!key) return res;
    const ref = refs[key];
    if (!ref) {
      console.warn(`reference: ${key} not found`);
      if (!once) {
        console.warn(refs);
        once = true;
      }
      return res;
    }
    // optionally, looks recursively for references in the value of the reference
    if (
      recursive &&
      isSingleTokenReference(ref) &&
      isReference(ref.token.value)
    ) {
      return [
        ...res,
        ...getReferencesFromValue(refs, ref.token.value, recursive),
      ];
    }
    return [...res, ref];
  }, [] as TokenReference[]);
  return references;
};
// creates the reduce function for the processReferences function
const createProcessReferenceReduceFunction =
  (refs: ReferenceMap, getRef: (ref: TokenOutput, prop?: string) => string) =>
  // for every token being processed...
  (current: TokenOutput[], token: TokenOutput): TokenOutput[] => {
    // find all its references in the value
    // ex: token.value = "1px solid {color.primary}"
    const valueReferences = getReferencesFromValue(refs, token.value, true);
    // if there's none, return it as is
    if (valueReferences.length === 0) return [...current, token];
    // extract expanded references
    const expandedReferences = valueReferences.filter(
      isCompositeTokenReference
    );

    // if there are expanded references, we create one replica of the token for each of them
    const propsFromReferences =
      expandedReferences.length > 0
        ? Object.keys(expandedReferences[0].references)
        : undefined;
    const propsFromTypography =
      token.type === 'typography' && !token.subtoken
        ? TYPOGRAPHY_TOKEN_PROPS
        : undefined;
    const noExtraProps = [undefined];

    // if the type of token is typography and it's not already expanded, we expand it
    const props: ReadonlyArray<string | undefined> =
      propsFromReferences || propsFromTypography || noExtraProps;
    return [
      ...current,
      ...props.map((prop) => ({
        ...token,
        name: renderName(token, prop),
        key: renderKey(token, prop),
        value: getRef(token, prop),
        rawValue: token.value,
        ...(prop ? { subtoken: prop } : {}),
      })),
    ];
  };

/** Process references main function
 * references can be of two types:
 * 1. static references, which are resolved to their value in the parser
 * 2. dynamic references, which are resolved to their value in runtime
 * as a rule, any reference to a static layer should be a static reference
 * @param referenceMap - a dictionary of references
 * @param dependencies - array to be populated with the dependencies between layers
 * @returns a function that takes a string and returns a string with all references processed
 */

export const processReferences = (
  referenceMap: ReferenceMap,
  dependencies: string[]
) => {
  const getRef = (token: TokenOutput, prop?: string): string => {
    const { value } = token;

    // obtain all references mentioned in the value (in case there are more than one)
    const references = getReferencesFromValue(referenceMap, value);

    // if there are no references in the value, return the value itself
    if (references.length === 0) return value;

    // now process all references
    return references.reduce(
      processReference(dependencies, getRef, prop),
      value
    );
  };
  // returns a reducer function that receives a token, and replaces its value with the
  // processed version of this value -- replacing any references it can find
  // with the values stored in the reference map. It preserves the original value
  // in the `rawValue` attribute, in case the renderer needs it
  // it also expands composite tokens and tokens that reference composite tokens
  return createProcessReferenceReduceFunction(referenceMap, getRef);
};

/* MAIN PARSER OF TOKENS */

/** recursively extract tokens from a JSONStructure
 * and return a list of TokenOutput objects
 * @param dataSet JSONStructure to extract tokens from
 * @param parentName name of the parent node
 * @param references a dictionary of references to be used to resolve expressions
 * @param isStatic whether the layer we are parsing is static or not
 * @param source the section-name that controls the layer we are parsing
 * @param results the list of tokens to be returned
 * @returns a list of TokenOutput objects
 */

export const extractTokens = (
  dataSet: JSONStructure,
  parentName: string,
  references: ReferenceMap = {},
  isStatic = false,
  source: string | null = null,
  results?: TokenOutput[]
): TokenOutput[] => {
  let finalResult = results ?? [];
  const registerReference = (
    keyName: string,
    content: TokenOutput | ReferenceMap
  ) => {
    const referenceKey = `{${keyName}}`;
    const existingReference: Partial<TokenReference> =
      references[referenceKey] || {};
    if (isTokenOutput(content)) {
      // add it to the references dictionary - this is used to resolve expressions and dependencies between layers
      references[referenceKey] = {
        key: referenceKey,
        sources: [
          ...(existingReference.sources ?? []),
          ...(source ? [source] : []),
        ],
        isStatic,
        ...{ token: content },
      };
    } else if (!('token' in existingReference)) {
      references[referenceKey] = {
        key: referenceKey,
        sources: [
          ...(existingReference.sources ?? []),
          ...(source ? [source] : []),
        ],
        isStatic,
        isReference: true,
        ...{ references: content },
      };
    } else {
      throw new Error(
        `Reference ${referenceKey} already exists and is not a reference`
      );
    }
    return [references[referenceKey], referenceKey] as const;
  };

  for (const key in dataSet) {
    // create keyname with the same pattern as the references
    const keyName = `${parentName ? `${parentName}.` : ''}${key}`;

    // this is the item we want
    const item = dataSet[key];
    // if it's a single token, process it
    if (isJSONLeaf(item)) {
      const token = renderToken(keyName, item);

      // register a reference for this token if needed
      registerReference(keyName, token);

      // create the object and add it to the final result
      finalResult = [...finalResult, token];

      // if it's a composite token, we should render it with our special functions
    } else if (isCompositeLeaf(item)) {
      const compositeTokens = renderCompositeToken(
        keyName,
        item,
        FLAG_EXPAND_TYPOGRAPHY_TOKENS
      );
      const addedReferences = compositeTokens.reduce((refs, token) => {
        const [ref, refKey] = registerReference(token.name, token);
        const propKey =
          isSingleTokenReference(ref) && ref.token.subtoken
            ? ref.token.subtoken
            : refKey;
        return { ...refs, [propKey]: ref };
      }, {});
      if (item.type === 'typography') {
        registerReference(keyName, addedReferences);
      }
      finalResult = [...finalResult, ...compositeTokens];
    } else if (isString(item)) {
      // if it's a string, it means there's something strange going on. add it as a 'lone string'
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
        ...extractTokens(item, keyName, references, isStatic, source),
      ];
    }
  }
  return finalResult;
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

export const removeParameters = (parameters: Record<string, string>) => {
  return (token: TokenOutput): boolean => !parameters[token.name];
};

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
  const references: ReferenceMap = {};
  const layers: TokenLayer[] = Object.keys(tokenData)
    .map((key) => {
      const layer = tokenData[key];
      const name = formatLayerName(key);
      const parameters = processParameters(SPECIAL_LAYER_VARIABLES, layer);
      // if there is at least one parameter other than 'description', it is a dynamic layer
      const isStatic = !hasParameters(parameters);
      const variables = extractTokens(
        layer,
        '',
        references,
        isStatic,
        parameters[PARAM_SECTION_NAME]
      ).filter(removeParameters(parameters));
      return { name, variables, parameters, isStatic };
    })
    .map((layer): TokenLayer => {
      const { variables, parameters, ...rest } = layer;
      const dependencies: string[] = [];
      return {
        ...rest,
        variables: variables.reduce(
          processReferences(references, dependencies),
          []
        ),
        parameters,
        dependencies: removeDuplicates(dependencies),
      };
    });
  return {
    layers,
    order: tokenSetOrder.map(formatLayerName),
  };
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

// for debugging purposes
// const ls = processLayers(data as unknown as TokenStructure);
// const componentLayer = ls.layers[3];
// console.log(
//   componentLayer?.variables.filter(({ type }) => type === 'typography')
// );
