import React, { forwardRef, useState } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import {
  Close,
  Menu,
  ArrowRight,
} from '@rangle/radius-foundations/generated/icons';

import { useStyles } from './nav.styles';
import { RadiusNavComponent, RadiusNavProps } from './nav.types';
import { PolymorphicRef } from '../../utils';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { RadiusLinkIcon } from '../link-icon';
import { RadiusButton } from '../button/button';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880)
 */
export const RadiusNav: RadiusNavComponent = forwardRef(
  <C extends React.ElementType = 'nav'>(
    {
      as,
      logos,
      navItems,
      linkIcons,
      socials,
      className,
      ...rest
    }: RadiusNavProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'nav';

    const [isOpen, setOpen] = useState(false);

    const {
      styles,
      navContainer,
      menu,
      navItems: navItemsStyles,
      toggleButton,
      info,
    } = useStyles({ isOpen });

    return (
      <Component ref={ref} className={cx(styles, className)} {...rest}>
        {/* Outer Container */}
        <RadiusAutoLayout
          padding={[
            radiusTokens.component.spacing.navigation.margins.vertical,
            radiusTokens.component.spacing.navigation.margins.horizontal,
          ]}
          direction="vertical"
          // TODO: add spacing token when available
        >
          {/* Navigation container */}
          <RadiusAutoLayout
            className={navContainer}
            // TODO: make this dynamic with a token
            space="auto"
            width="fill-parent"
            fill={radiusTokens.component.color.navigation.background}
          >
            {/* Controls */}
            <RadiusAutoLayout
              space="auto"
              width="fill-parent"
              alignment="center"
            >
              {/* Company Logos */}
              <RadiusAutoLayout
                space={radiusTokens.component.spacing.navigation.gap.logos}
              >
                {logos}
              </RadiusAutoLayout>
              {/* Toggle Button */}
              <RadiusLinkIcon
                className={toggleButton}
                as="button"
                aria-label={
                  isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'
                }
                icon={isOpen ? Close : Menu}
                // TODO: replace this with component token once created
                size={radiusTokens.component.sizing.linkIcon.large}
                onClick={() => setOpen(!isOpen)}
              />
            </RadiusAutoLayout>
            {/* Menu */}
            <RadiusAutoLayout
              className={menu}
              space={radiusTokens.component.spacing.navigation.gap.menu}
            >
              {/* Nav Items */}
              <RadiusAutoLayout
                className={navItemsStyles}
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
          {/* Info Container */}
          <RadiusAutoLayout
            className={info}
            // TODO: make this dynamic with a token
            space={radiusTokens.component.spacing.navigation.gap.infoMenu}
            width="fill-parent"
          >
            <RadiusButton rightIcon={ArrowRight}>Action</RadiusButton>
            {/* Social Container */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.socials}
            >
              {socials}
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
