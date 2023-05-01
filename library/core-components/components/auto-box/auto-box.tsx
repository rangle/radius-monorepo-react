import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicRef } from '../../utils/polymorphic.types';

import { AutoLayoutComponent, AutoLayoutProps } from './auto-box.types';
import { useStyles } from './auto-box.styles';

export const RadiusAutoBox: AutoLayoutComponent = forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      children,
      className,
      isParent,
      absolutePosition,
      direction,
      space,
      clippedContent,
      alignment,
      width,
      height,
      padding,
      opacity,
      x,
      y,
      horizontalConstraint,
      verticalConstraint,
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