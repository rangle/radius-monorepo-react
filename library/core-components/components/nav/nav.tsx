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
import { RadiusNavItem } from '../nav-item';

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
      toggleButton,
      secondaryActionsContainer,
    } = useStyles({
      isOpen,
    });

    return (
      <Component ref={ref} className={cx(styles, className)} {...rest}>
        {/* Navigation container */}
        <RadiusAutoLayout
          className={navContainer}
          padding={[
            radiusTokens.component.spacing.navigation.margins.vertical,
            radiusTokens.component.spacing.navigation.margins.horizontal,
          ]}
          space={radiusTokens.component.spacing.navigation.gap.navContainer}
          direction={
            radiusTokens.component.direction.navigation.navigationContainer
          }
          width="fill-parent"
          fill={radiusTokens.component.color.navigation.background}
        >
          {/* Controls */}
          <RadiusAutoLayout space="auto" width="fill-parent" alignment="center">
            {/* Company Logos */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.logos}
              direction={radiusTokens.component.direction.navigation.logos}
              // TODO: set height of all children using token
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
              size={radiusTokens.component.sizing.navigation.controlIcon}
              onClick={() => setOpen(!isOpen)}
            />
          </RadiusAutoLayout>
          {/* Menu */}
          <RadiusAutoLayout
            className={menu}
            space={radiusTokens.component.spacing.navigation.gap.menu}
            direction={
              radiusTokens.component.direction.navigation.menuContainer
            }
          >
            {/* Nav Items */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.navItems}
              direction={radiusTokens.component.direction.navigation.navItems}
            >
              {navItems.map((navItemProps) => (
                <RadiusNavItem {...navItemProps} />
              ))}
            </RadiusAutoLayout>
            {/* Link Icons */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.resources}
            >
              {linkIcons.map((linkIconProps) => (
                <RadiusLinkIcon
                  {...linkIconProps}
                  size={radiusTokens.component.sizing.navigation.menuIcon}
                />
              ))}
            </RadiusAutoLayout>
          </RadiusAutoLayout>
          {/* Secondary Actions Container */}
          <RadiusAutoLayout
            className={secondaryActionsContainer}
            space={
              radiusTokens.component.spacing.navigation.gap.secondaryAction
            }
            width="fill-parent"
            direction={
              radiusTokens.component.direction.navigation
                .secondaryActionContainer
            }
          >
            <RadiusButton rightIcon={ArrowRight}>Action</RadiusButton>
            {/* Social Container */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.socials}
            >
              {socials.map((socialIconProps) => (
                <RadiusLinkIcon
                  {...socialIconProps}
                  size={radiusTokens.component.sizing.navigation.socialIcon}
                />
              ))}
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
