import React, { forwardRef } from 'react';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

// import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
// import { Typography } from '../typography/typography';
// import { useStyles } from './nav.styles';
import { cx } from '@emotion/css';
import { RadiusNavComponent, RadiusNavProps } from './nav.types';
import { PolymorphicRef } from '../../utils';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880)
 */
export const RadiusNav: RadiusNavComponent = forwardRef(
  <C extends React.ElementType = 'nav'>(
    { as, className, ...rest }: RadiusNavProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'nav';
    // const { styles, label: labelStyles, underline } = useStyles({ selected });

    return (
      <Component ref={ref} className={cx(className)} {...rest}>
        hi
      </Component>
    );
  }
);
