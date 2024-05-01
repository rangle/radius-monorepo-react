import React, { forwardRef, useState } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations';
import { Close, Menu, ArrowRight } from '@rangle/radius-foundations';
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';

import { useStyles } from './nav.styles';
import { RadiusNavProps } from './nav.types';
import { PolymorphicRef } from '@rangle/radius-shared';
import { RadiusLinkIcon } from '../link-icon';
import { RadiusButton } from '../button/button';
import { RadiusNavItem } from '../nav-item';

/**
 * A navigation component that renders a navigation menu, with a toggle button
 * at tablet and mobile breakpoints to open and close the menu. It is polymorphic and
 * can be passed a custom wrapper component via the `as` prop, but by default
 * renders a `nav` tag.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880)
 */
export const RadiusNav = forwardRef(
  <C extends React.ElementType = 'nav'>(
    {
      as,
      logos,
      navItems,
      linkIcons,
      socials,
      hasShadow,
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
      hasShadow,
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
              {navItems.map((navItemProps, idx) => (
                <RadiusNavItem key={idx} {...navItemProps} />
              ))}
            </RadiusAutoLayout>
            {/* Link Icons */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.navigation.gap.resources}
            >
              {linkIcons.map((linkIconProps, idx) => (
                <RadiusLinkIcon
                  {...linkIconProps}
                  size={radiusTokens.component.sizing.navigation.menuIcon}
                  key={idx}
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
              {socials.map((socialIconProps, idx) => (
                <RadiusLinkIcon
                  {...socialIconProps}
                  size={radiusTokens.component.sizing.navigation.socialIcon}
                  key={idx}
                />
              ))}
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
