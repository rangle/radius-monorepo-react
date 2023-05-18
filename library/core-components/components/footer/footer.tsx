import React, { forwardRef } from 'react';
// import { cx } from '@emotion/css';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

// import { useStyles } from './nav.styles';
import { RadiusFooterComponent, RadiusFooterProps } from './footer.types';
import { PolymorphicRef } from '../../utils';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/6wmTw9t9kiutJssWjO890d/Footer?type=design&node-id=1-2880)
 */
export const RadiusFooter: RadiusFooterComponent = forwardRef(
  <C extends React.ElementType = 'footer'>(
    {
      as,
      // logos,
      // navItems,
      // linkIcons,
      // socials,
      className,
      ...rest
    }: RadiusFooterProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'footer';

    // const {
    //   styles,
    //   navContainer,
    //   menu,
    //   toggleButton,
    //   secondaryActionsContainer,
    // } = useStyles({
    //   isOpen,
    // });

    return (
      <Component ref={ref} className={className} {...rest}>
        {/* Footer Container */}
        <RadiusAutoLayout
          padding={[
            radiusTokens.component.spacing.footer.margins.vertical,
            radiusTokens.component.spacing.footer.margins.horizontal,
          ]}
          space={radiusTokens.component.spacing.footer.gap.rows}
          fill={radiusTokens.component.color.footer.background}
          direction="vertical"
        >
          <p>logo</p>
          {/* Menu */}
          <RadiusAutoLayout
            space={radiusTokens.component.spacing.footer.gap.menu}
            width="fill-parent"
            grid
          >
            {/* Pages */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.footer.gap.links}
              direction="vertical"
              gridSpan={
                radiusTokens.component.layout.footer.gridSpan.rowContainer
              }
            >
              <p>Design</p>
              <p>Development</p>
            </RadiusAutoLayout>
            {/* General Inquiries */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.footer.gap.categories}
              direction="vertical"
              gridSpan={
                radiusTokens.component.layout.footer.gridSpan.rowContainer
              }
            >
              <p>General Inquiries</p>
              <p>info@rangle.io</p>
            </RadiusAutoLayout>
            {/* Newsletter */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.footer.gap.categories}
              direction="vertical"
              gridSpan={
                radiusTokens.component.layout.footer.gridSpan.rowContainer
              }
            >
              <p>Our Newsletter</p>
              <p>Sign up</p>
            </RadiusAutoLayout>
          </RadiusAutoLayout>
          {/* Legal & Connect */}
          <RadiusAutoLayout width="fill-parent" grid>
            {/* Legal */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.footer.gap.legal}
              gridSpan={
                radiusTokens.component.layout.footer.gridSpan.legalContainer
              }
              direction={radiusTokens.component.direction.footer.legalContainer}
            >
              <p>Copyright</p>
              <p>Privacy Policy</p>
            </RadiusAutoLayout>
            {/* Connect */}
            <RadiusAutoLayout
              space={radiusTokens.component.spacing.footer.gap.connect}
              gridSpan={
                radiusTokens.component.layout.footer.gridSpan.connectContainer
              }
              direction={
                radiusTokens.component.direction.footer.connectContainer
              }
            >
              <p>Connect with us</p>
              <p>icons icons</p>
              <p>Button</p>
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
