import React from 'react';
import { cx } from '@emotion/css';

import { getStyles } from './icon.styles';
import { RadiusIconProps, ICON_SIZES } from './icon.types';
import { withIcon } from './utils';

// TODO: forwardRef?

/** # RadiusIcon Component
 * A component that renders an svg icon and exposes all the attributes of the svg tag along with custom
 * attributes like size and fill.
 *
 * It can be used in two ways:
 *
 * 1. by passing an SVG component using the `component` prop, like those generated in
 * `'@rangle/radius-foundations/generated/icons'`. Note: the component must not have a `fill` attribute on any of its
 * children or it will override the `fill` prop of this component.
 * 2. by passing the path of the icon as a string using the `path` prop. This is useful when you want
 * to use an icon that is not in the library.
 *
 * The component will automatically set the width and height of the svg to the size specified in the
 * `size` prop. The default size is `medium`.
 *
 * The `fill` prop can be used to set the color of the icon. The default color is `currentColor`, which
 * means that the icon will inherit the color of the parent element.
 */
export const RadiusIcon = ({
  component,
  path,
  size = 'medium',
  fill,
  className,
  ...rest
}: RadiusIconProps) => {
  const styles = getStyles({ fill });
  const IconComponent = component ? component : withIcon(path);

  return (
    <IconComponent
      className={cx(styles, className)}
      width={ICON_SIZES[size]}
      height={ICON_SIZES[size]}
      {...rest}
    />
  );
};
