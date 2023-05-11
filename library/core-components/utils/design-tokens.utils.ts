import type {
  CSSProp,
  CSSTokensByTypeAndSubject,
} from '@rangle/radius-foundations/generated/design-tokens.types';

// TODO: move this function to `library/foundations/src/utils/design-tokens.utils.ts` - this is temporary while we figure out how to fix the build failure caused by importing it (see related issue: https://rangle.atlassian.net/browse/R20-231)
export const renderCSSProp = (prop?: CSSProp) => {
  if (!prop) return undefined;
  if (Array.isArray(prop)) return tokenArrayToString(prop);
  if (typeof prop === 'object') return prop.css;
  return `var(${prop})`;
};

/** Takes an array of token strings and converts them to a string with
 * the `var()` prefix added to each token.
 *
 * @example
 * tokenArrayToString(['--a', '--b']) // returns 'var(--a) var(--b)'
 */
export const tokenArrayToString = (
  tokens: Array<CSSTokensByTypeAndSubject>
) => {
  return tokens.map((token) => `var(${token})`).join(' ');
};
