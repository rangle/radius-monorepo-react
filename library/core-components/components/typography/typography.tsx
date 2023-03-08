import React, { useMemo, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';
import { elementAndProps } from '../../utils/polymorphic.utils';

import { getStyles } from './typography.styles';
import {
  RadiusColorTokens,
  RadiusTypographyTokens,
  Var,
} from '../../../foundations/generated/design-tokens.types';

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
  color?: Var<RadiusColorTokens>; // ? How to handle optional string values? This completely invalidates the type safety & intellisense value of the design token types
  /** Font (css shorthand property - see https://developer.mozilla.org/en-US/docs/Web/CSS/font) */
  font?: Var<RadiusTypographyTokens>;
  children: React.ReactNode;
};

export type TypographyProps = PolymorphicComponentPropWithRef<
  TypographyTag,
  TypographyExtendedProps
>;

/** # Typography Component
 * A polymorphic component that represents a text element.
 * Exposes all attributes of the selected tag, plus the specific attributes
 * declared in the Specific Props type above.
 */
export const Typography = forwardRef<TypographyTag, TypographyProps>(
  (
    {
      align = 'left',
      color = 'var(--color-text-on-base-primary)',
      font = 'var(--typography-body-md)',
      children,
      className,
      ...rest
    }: TypographyProps,
    ref
  ) => {
    const element = elementAndProps(rest, ref, 'p');

    const style = useMemo(
      () =>
        getStyles({
          align,
          color,
          font,
        }),
      [align, color, font]
    );

    return (
      <element.Component
        className={cx(style, className)}
        ref={element.props.ref}
        {...element.props}
      >
        {children}
      </element.Component>
    );
  }
);
