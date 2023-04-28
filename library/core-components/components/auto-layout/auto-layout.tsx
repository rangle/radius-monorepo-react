import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicRef } from '../../utils/polymorphic.types';

import { AutoLayoutComponent, AutoLayoutProps } from './auto-layout.types';
import { useStyles } from './auto-layout.styles';

export const RadiusAutoLayout: AutoLayoutComponent = forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      children,
      className,
      isParent = false,
      absolutePosition = false,
      direction = 'vertical',
      space,
      clippedContent = false,
      alignment = 'top',
      width = 'hug-contents',
      height = 'hug-contents',
      padding,
      opacity,
      x,
      y,
      horizontalConstraint = 'left',
      verticalConstraint = 'top',
      fill,
      stroke,
      strokeWidth,
      strokeAlign,
      cornerRadius,
      dropShadow,
      innerShadow,
      layerBlur,
      backgroundBlur,
      ...rest // the remainder should be the original tag's attributes
    }: AutoLayoutProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'div';
    const styles = useStyles({
      direction,
      space,
      clippedContent,
      alignment,
      width,
      height,
      padding,
      opacity,
      fill,
      stroke,
      strokeWidth,
      strokeAlign,
      cornerRadius,
      isParent,
      absolutePosition,
      x,
      y,
      horizontalConstraint,
      verticalConstraint,
      dropShadow,
      innerShadow,
      layerBlur,
      backgroundBlur,
    });
    return (
      <Component className={cx(styles, className)} {...rest} ref={ref}>
        {children}
      </Component>
    );
  }
);
