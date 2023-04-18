import type { CSSExpression } from '@rangle/radius-foundations/generated/design-tokens.types';

// TODO: move this function to `library/foundations/src/utils/design-tokens.utils.ts` - this is temporary while we figure out how to fix the build failure caused by importing it (see related issue: https://rangle.atlassian.net/browse/R20-231)
export const renderCSSProp = (
  prop: string | { css: CSSExpression } | undefined
) => {
  if (!prop) return undefined;
  if (typeof prop !== 'string') return prop.css;
  return PrefixWithVar(prop);
};

/**
 * Takes a string representing one or more tokens and adds the `var()` prefix to each.
 * This allows for multiple tokens to be used in a single CSS property.
 * @example
 * PrefixWithVar('--a') // returns 'var(--a)'
 * PrefixWithVar('--a --b') // returns 'var(--a) var(--b)'
 */
const PrefixWithVar = (prop: string) => {
  // split the string into an array of strings, separated by spaces
  const splitProp = prop.split(' ');
  // add the `var(` prefix to each item in the array
  const prefixedProp = splitProp.map((item) => `var(${item})`);
  // join the array back into a string, separated by spaces, and return it
  return prefixedProp.join(' ');
};
