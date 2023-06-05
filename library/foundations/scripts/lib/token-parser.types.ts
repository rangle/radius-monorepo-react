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

export const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === 'object' && item !== null && !Array.isArray(item);

export const isTokenOutput = (item: unknown): item is TokenOutput =>
  isObject(item) && 'key' in item && 'value' in item && 'type' in item;
