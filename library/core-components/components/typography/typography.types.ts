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
  /** Text alignment */
  align?: Alignment;
  /** Text color */
  fill?: CSSProp<'color'>;
  /** Font (css shorthand property - see https://developer.mozilla.org/en-US/docs/Web/CSS/font) */
  font?: CSSProp<'typography'>;
  fontFamily?: CSSProp<'fontFamilies'>;
  lineHeight?: CSSProp<'lineHeights'>;
  fontWeight?: CSSProp<'fontWeights'>;
  fontSize?: CSSProp<'fontSizes'>;
  letterSpacing?: CSSProp<'letterSpacing'>;
  textDecoration?: CSSProp<'textDecoration'>;
  children: React.ReactNode;
};

export type TypographyProps = PolymorphicComponentPropWithRef<
  TypographyTag,
  TypographyExtendedProps
>;
