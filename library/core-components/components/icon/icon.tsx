import React from 'react';
import { cx } from '@emotion/css';
import { CSSProp } from '@rangle/radius-foundations';

import { getStyles } from './icon.styles';

const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

export interface RadiusIconProps
  extends Omit<React.SVGAttributes<SVGElement>, 'fill'> {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: keyof typeof ICON_SIZES;
  fill?: CSSProp<'color'>;
  className?: string;
}

// TODO: utility to convert svg to react component? For 3rd party icons. Maybe using svgr?

export const RadiusIcon = ({
  component: IconComponent,
  size = 'medium',
  fill,
  className,
  ...rest
}: RadiusIconProps) => {
  const styles = getStyles({ fill });

  return (
    <IconComponent
      className={cx(styles, className)}
      width={ICON_SIZES[size]}
      height={ICON_SIZES[size]}
      {...rest}
    />
  );
};
