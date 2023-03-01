import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';
import { elementAndProps } from '../../utils/polymorphic.utils';

import { getStyles } from './typography.styles';

export type Alignment = 'center' | 'left' | 'right';

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
// | 'a'
// 'span' |
// | 'article'
// | 'section'
// | 'em'
// | 'strong';

export type TypographyExtendedProps = {
  align?: Alignment;
  color?: string;
  font?: string;
  children: React.ReactNode;
};

export type TypographyProps = PolymorphicComponentPropWithRef<
  TypographyTag,
  TypographyExtendedProps
>;

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

    // TODO - add variants based on tokens?
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
