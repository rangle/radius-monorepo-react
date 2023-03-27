import type {
  CSSExpression,
  RadiusTokens,
} from '@rangle/radius-foundations/generated/design-tokens.types';

// TODO: move this function to `library/foundations/src/utils/design-tokens.utils.ts` - this is temporary while we figure out how to fix the build failure caused by importing it (see related issue: https://rangle.atlassian.net/browse/R20-231)
export const renderCSSProp = (
  prop: RadiusTokens | { css: CSSExpression } | undefined
) => {
  if (!prop) return undefined;
  return typeof prop === 'string' ? `var(${prop})` : prop.css;
};
