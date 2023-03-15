import type {
  CSSExpression,
  RadiusTokens,
} from '@rangle/radius-foundations/generated/design-tokens.types';

// TODO: use this function in `library/foundations/src/utils/design-tokens.utils.ts` - this is temporary while we figure out how to fix the build failure caused by importing it
export const renderCSSProp = (prop: RadiusTokens | { css: CSSExpression }) =>
  typeof prop === 'string' ? `var(${prop})` : prop.css;
