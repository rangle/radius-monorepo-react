import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { AutoLayoutComponent, AutoLayoutProps } from './auto-layout.types';
import { useStyles } from './auto-layout.styles';
import { PolymorphicRef } from '@rangle/radius-shared';

/**
 * A component that duplicates Figma's Auto Layout API. In Figma, Auto Layout is
 * a very powerful feature that allows you to create complex layouts with ease.
 * We've adapted its API as a Polymorphic component that will work with many of
 * the features in Auto Layout so that decisions made in Figma will be reflected
 * 1:1 in code. This has the added benefit of allowing designers to make changes
 * to the Auto Layout in Figma and have those changes reflected in code without
 * any additional work.
 *
 * Since the Auto Layout component is polymorphic, it can be used as any HTML
 * tag, as well as any React component, by passing the `as` prop. For example,
 * if you want to use the Auto Layout component as an `img` tag, you can do so
 * by passing `as="img"` to the component. The component will now accept all
 * attributes of the `img` tag, in addition to the Auto Layout specific
 * attributes. Similarly, if you want to use the Auto Layout component as a
 * `RadiusButton`, you can do so by passing `as={RadiusButton}` to the
 * component.
 *
 * ### Resources
 * [Explore Auto Layout properties](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties)
 *
 * [RadiusAutoLayout Figma Specs](https://www.figma.com/file/ODAUZaQxH8oH2GI0A9MAVb/Radius-Booster---Auto-Layout?type=design&node-id=1302-3734)
 * */
export const RadiusAutoLayout = forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      children,
      className,
      isParent = false,
      absolutePosition = false,
      direction,
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
      grid,
      gridColSpan,
      gridColEnd,
      gridColStart,
      gridRowSpan,
      gridRowEnd,
      gridRowStart,
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
      grid,
      gridColSpan,
      gridColEnd,
      gridColStart,
      gridRowSpan,
      gridRowEnd,
      gridRowStart,
    });
    return (
      <Component className={cx(styles, className)} {...rest} ref={ref}>
        {children}
      </Component>
    );
  }
);
