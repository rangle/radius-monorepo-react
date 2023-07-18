import React, { forwardRef, useMemo } from 'react';
import { cx } from '@emotion/css';

import { getStyles } from './icon.styles';
import { RadiusIconProps } from './icon.types';
import { withIcon } from './utils';

/**
 * A component that renders an svg icon and exposes all the attributes of the
 * svg tag along with custom attributes like size and fill.
 *
 * It can be used in two ways:
 *
 * 1. by passing an SVG component using the `component` prop, like those
 * generated in `'@rangle/radius-foundations'`.
 * 2. by passing the path of the icon as a string using the `path` prop. This is
 * useful when you want to use an icon that is not in the library.
 *
 * The component will automatically set the width and height of the svg to the
 * size specified in the `size` prop.
 *
 * The `fill` prop can be used to set the color of the icon. The default color
 * is `currentColor`, which means that the icon will inherit the color of the
 * parent element.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/QsjLCOnkQR4lgIxlz2a5Va/Icon?type=design&node-id=11-804)
 */
export const RadiusIcon = forwardRef<SVGSVGElement, RadiusIconProps>(
  ({ component, path, size, fill, className, ...rest }, ref) => {
    const styles = useMemo(() => getStyles({ fill, size }), [fill, size]);
    const IconComponent = useMemo(
      () => (component ? component : withIcon(path)),
      [component, path]
    );

    return (
      <IconComponent className={cx(styles, className)} ref={ref} {...rest} />
    );
  }
);
