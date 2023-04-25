import { CSSProp } from '@rangle/radius-foundations/generated/design-tokens.types';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';

export type Alignment = 'left' | 'center' | 'right';

// TODO - fix polymorphic types (type errors due to different expected props for some tags)
export type TypographyTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'div';
// | 'span'
// | 'a'
// | 'article'
// | 'section'
// | 'em'
// | 'strong';

export type TypographyExtendedProps = {
  /** Text color */
  fill?: CSSProp<'color'>;
  /** Text alignment (corresponds to `text-align` style) */
  align?: Alignment;
  /** Font (css shorthand property - see https://developer.mozilla.org/en-US/docs/Web/CSS/font) */
  font?: CSSProp<'typography'>;
  /** Font Family - will override `font-family` style of the `font` prop */
  fontFamily?: CSSProp<'fontFamilies'>;
  /** Line Height - will override `line-height` style of the `font` prop */
  lineHeight?: CSSProp<'lineHeights'>;
  /** Font Weight - will override `font-weight` style of the `font` prop */
  fontWeight?: CSSProp<'fontWeights'>;
  /** Font Size - will override `font-size` style of the `font` prop */
  fontSize?: CSSProp<'fontSizes'>;
  /** Letter Spacing - will override `letter-spacing` style of the `font` prop */
  letterSpacing?: CSSProp<'letterSpacing'>;
  /** Text Decoration - will override `text-decoration` style of the `font` prop */
  textDecoration?: CSSProp<'textDecoration'>;
  /** The content of the Typography component */
  children: React.ReactNode;
};

export type TypographyProps = PolymorphicComponentPropWithRef<
  TypographyTag,
  TypographyExtendedProps
>;
