import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';
import { elementAndProps } from '../../utils/polymorphic.utils';

import { getStyles } from './typography.styles';

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
  color?: string; // TODO - add css variable types here
  /** Font (css shorthand property - see https://developer.mozilla.org/en-US/docs/Web/CSS/font) */
  font?: string; // TODO - add css variable types here
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
        className={`${style} ${className}`}
        ref={element.props.ref}
        {...element.props}
      >
        {children}
      </element.Component>
    );
  }
);
