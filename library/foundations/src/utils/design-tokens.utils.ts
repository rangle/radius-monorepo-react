import type {
  CSSExpression,
  RadiusTokens,
} from '../../generated/design-tokens.types';

// TODO: fix imports from `core-components` (currently causes build failure). For now this is unused in favor of a copy here: `library/core-components/utils/design-tokens.utils.ts`
export const renderCSSProp = (prop: RadiusTokens | { css: CSSExpression }) =>
  typeof prop === 'string' ? `var(${prop})` : prop.css;
