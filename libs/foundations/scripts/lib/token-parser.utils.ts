import {
  TokenOutput,
  JSONStructure,
  GeneratorMappingDictionary,
  GeneratorMappingFunction,
  isGeneratorMappingSpecificDictionaryItem,
  isString,
} from './token-parser.types';

/** convert names to kebab-case in case they come as CamelCase or pascalCase */
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

/** create a formatted key that's more css-friendly */
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

export const variableReferenceRegex = /\{(--[\w-]+)\}/;
export const isVariableReference = (value: string) =>
  variableReferenceRegex.test(value);

export const hasParameters = (parameters: Record<string, string>) =>
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
