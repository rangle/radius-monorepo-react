import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';

import { AutoLayoutProps } from './auto-box.types';
import { getStyles } from './auto-box.styles';
import { elementAndProps } from '../../utils/polymorphic.utils';

type RadiusButtonTag = React.ElementType;
export type RadiusAutoBoxProps = PolymorphicComponentPropWithRef<
  React.ElementType,
  AutoLayoutProps
>;

export const RadiusAutoBox = forwardRef<RadiusButtonTag, RadiusAutoBoxProps>(
  (
    {
      children,
      className,
      ...rest // the remainder should be the original tag's attributes
    },
    ref
  ) => {
    const element = elementAndProps(rest, ref, 'div');
    const styles = useMemo(() => getStyles(rest), [rest]);
    return (
      <element.Component
        className={`${styles} ${className || ''}`}
        {...element.props}
        ref={ref}
      >
        {children}
      </element.Component>
    );
  }
);
