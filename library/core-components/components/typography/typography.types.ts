import { CSSProp } from '@rangle/radius-foundations/generated/design-tokens.types';
import { PolymorphicComponentPropWithRef } from '@rangle/radius-shared/utils';

export type Alignment = 'left' | 'center' | 'right';

// Not currently used - TODO: implement type restrictions on polymorphic components
export type TypographyTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'em'
  | 'strong';

export type TypographyExtendedProps = {
  /** The content of the Typography component */
  children: React.ReactNode;
  /** Text color */
  fill?: CSSProp<'color'>;
  /** Text alignment (corresponds to `text-align` style) */
  align?: Alignment;
  /** Font (css shorthand property - see https://developer.mozilla.org/en-US/docs/Web/CSS/font) */
  font?: CSSProp<'font'>;
  /** Letter Spacing - affect `letter-spacing` style in addition to `font` prop */
  letterSpacing?: CSSProp<'letter-spacing'>;
  /** Text Decoration - affect `text-decoration` style in addition to `font` prop */
  textDecoration?: CSSProp<'text-decoration'>;
};

export type TypographyProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, TypographyExtendedProps>;

export type TypographyComponent = <C extends React.ElementType = 'p'>(
  props: TypographyProps<C>
) => React.ReactElement | null;
