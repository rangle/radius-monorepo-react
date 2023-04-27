import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicRef } from '../../utils/polymorphic.types';

import { TypographyProps, TypographyComponent } from './typography.types';
import { useStyles } from './typography.styles';

/** # Typography Component
 * A polymorphic component that represents a text element.
 * Exposes all attributes of the selected tag, plus the specific attributes
 * declared in the Specific Props type above.
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
