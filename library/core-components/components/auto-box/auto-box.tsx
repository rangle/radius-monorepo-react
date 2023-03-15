import React, { useMemo, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';
import { elementAndProps } from '../../utils/polymorphic.utils';

import { AutoLayoutProps } from './auto-box.types';
import { getStyles } from './auto-box.styles';

type RadiusAutoBoxTag = React.ElementType;
export type RadiusAutoBoxProps = PolymorphicComponentPropWithRef<
  React.ElementType,
  AutoLayoutProps
>;

export const RadiusAutoBox = forwardRef<RadiusAutoBoxTag, RadiusAutoBoxProps>(
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
        className={cx(styles, className)}
        {...element.props}
        ref={ref}
      >
        {children}
      </element.Component>
    );
  }
);
