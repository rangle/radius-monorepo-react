import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicRef } from '../../utils/polymorphic.types';

import { TypographyProps, TypographyComponent } from './typography.types';
import { useStyles } from './typography.styles';

/**
 * A polymorphic component that provides an interface to apply styles and
 * semantics to text content. It exposes all attributes of the selected tag,
 * plus the Typography component-specific attributes.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/zR8HXS88DxQ4rhgwqIn1lh/Radius-Booster---Foundations?type=design&node-id=213-2449)
 */
export const Typography: TypographyComponent = forwardRef(
  <C extends React.ElementType = 'p'>(
    {
      as,
      align = 'left',
      fill,
      font,
      fontFamily,
      lineHeight,
      fontWeight,
      fontSize,
      letterSpacing,
      textDecoration,
      children,
      className,
      ...rest
    }: TypographyProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'p';

    const styles = useStyles({
      align,
      fill,
      font,
      fontFamily,
      lineHeight,
      fontWeight,
      fontSize,
      letterSpacing,
      textDecoration,
    });

    return (
      <Component className={cx(styles, className)} ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
