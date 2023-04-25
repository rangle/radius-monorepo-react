import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { elementAndProps } from '../../utils/polymorphic.utils';

import { useStyles } from './typography.styles';
import { TypographyProps, TypographyTag } from './typography.types';

/** # Typography Component
 * A polymorphic component that represents a text element.
 * Exposes all attributes of the selected tag, plus the specific attributes
 * declared in the Specific Props type above.
 */
export const Typography = forwardRef<TypographyTag, TypographyProps>(
  (
    {
      align,
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
    },
    ref
  ) => {
    const element = elementAndProps(rest, ref, 'p');

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
      <element.Component
        className={cx(styles, className)}
        ref={element.props.ref}
        {...element.props}
      >
        {children}
      </element.Component>
    );
  }
);
