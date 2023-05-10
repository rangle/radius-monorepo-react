import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { useStyles } from './nav.styles';
import { RadiusNavComponent, RadiusNavProps } from './nav.types';
import { PolymorphicRef } from '../../utils';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880)
 */
export const RadiusNav: RadiusNavComponent = forwardRef(
  <C extends React.ElementType = 'nav'>(
    { as, logos, navItems, linkIcons, className, ...rest }: RadiusNavProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'nav';
    const { styles } = useStyles();

    return (
      <Component ref={ref} className={cx(styles, className)} {...rest}>
        {/* Navigation container */}
        <RadiusAutoLayout
          padding={[
            radiusTokens.component.spacing.navigation.margins.vertical,
            radiusTokens.component.spacing.navigation.margins.horizontal,
          ]}
          space="auto"
          width="fill-parent"
        >
          {/* Company Logos */}
          <RadiusAutoLayout
            space={radiusTokens.component.spacing.navigation.gap.logos}
          >
            {logos}
          </RadiusAutoLayout>
          {/* Menu */}
          <RadiusAutoLayout
            space={radiusTokens.component.spacing.navigation.gap.menu}
          >
            {/* Nav Items */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.navItems}
            >
              {navItems}
            </RadiusAutoLayout>
            {/* Link Icons */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.resources}
            >
              {linkIcons}
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
