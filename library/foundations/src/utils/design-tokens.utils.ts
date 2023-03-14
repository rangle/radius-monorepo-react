import type {
  CSSExpression,
  RadiusTokens,
} from '../../generated/design-tokens.types';

export const renderCSSProp = (prop: RadiusTokens | { css: CSSExpression }) =>
  typeof prop === 'string' ? `var(${prop})` : prop.css;
