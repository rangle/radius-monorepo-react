import React, { forwardRef } from 'react';
import { radiusTokens } from '@rangle/radius-foundations';
import {
  RadiusAutoLayout,
  Typography,
} from '@rangle/radius-react-core-components';

import { useStyles } from './nav-item.styles';
import { cx } from '@emotion/css';
import { RadiusNavItemProps } from './nav-item.types';
import { PolymorphicRef } from '@rangle/radius-shared';

/**
 * A navigation item component to be used with the `RadiusNav` component. It
 * is polymorphic and can be passed a custom wrapper component via the `as`
 * prop, eg. using React Router's `Link` component. By default it renders an `a`
 * tag.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880&t=lEv9YPz7daN5CFPv-0)
 */
export const RadiusNavItem = forwardRef(
  <C extends React.ElementType = 'a'>(
    { as, label, selected, className, ...rest }: RadiusNavItemProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const { styles, label: labelStyles, underline } = useStyles({ selected });

    return (
      <Component ref={ref} className={cx(className, styles)} {...rest}>
        <RadiusAutoLayout
          direction="vertical"
          space={
            radiusTokens.component.spacing['navigation-item'].gap.underline
          }
        >
          <Typography
            className={cx(labelStyles, 'nav-item-label')}
            as="span"
            font={radiusTokens.component.typography.navigationItem.label.font}
            fill={
              selected
                ? radiusTokens.component.color.navigationItem.selected.label
                : radiusTokens.component.color.navigationItem.default.label
            }
          >
            {label}
          </Typography>
          <RadiusAutoLayout
            className={cx(underline, 'nav-item-underline')}
            width="fill-parent"
            fill={
              selected
                ? radiusTokens.component.color.navigationItem.selected.accent
                : radiusTokens.component.color.navigationItem.default.accent
            }
          />
        </RadiusAutoLayout>
      </Component>
    );
  }
);
