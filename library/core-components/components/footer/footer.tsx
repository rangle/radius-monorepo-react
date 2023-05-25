import React, { forwardRef } from 'react';
// import { cx } from '@emotion/css';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

// import { useStyles } from './nav.styles';
import { RadiusFooterComponent, RadiusFooterProps } from './footer.types';
import { PolymorphicRef } from '../../utils';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { useStyles } from './footer.styles';
import { RadiusLinkButton } from '../link-button';
import { Typography } from '../typography';
import { RadiusLinkIcon } from '../link-icon';
import { RadiusButton } from '../button';
import { RadiusInlineLink } from '../inline-link/inline-link';

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
      logo,
      pageLinks,
      className,
      inquiriesHeader,
      inquiriesLinks,
      newsLetterHeader,
      newsLetterLinks,
      copyright,
      privacyPolicy,
      connectHeader,
      connectLinkIcons,
      connectButtonProps,
      ...rest
    }: RadiusFooterProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'footer';

    const {
      firstContainer,
      // pagesContainer,
      // inquiriesContainer,
      secondContainer,
      thirdContainer,
      fourthContainer,
    } = useStyles();

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
          {logo}
          {/* Grid Wrapper */}
          <RadiusAutoLayout
            grid
            width="fill-parent"
            space={radiusTokens.component.spacing.footer.gap.rows}
          >
            {/* First container */}
            <RadiusAutoLayout className={firstContainer}>
              {/* Pages */}
              <RadiusAutoLayout
                // className={pagesContainer}
                space={radiusTokens.component.spacing.footer.gap.links}
                direction="vertical"
                width="fill-parent"
              >
                {pageLinks.map((pageLinkProps) => (
                  <RadiusLinkButton {...pageLinkProps} />
                ))}
              </RadiusAutoLayout>
              {/* General Inquiries */}
              <RadiusAutoLayout
                // className={inquiriesContainer}
                space={radiusTokens.component.spacing.footer.gap.categories}
                direction="vertical"
                gridColSpan={
                  radiusTokens.component.layout.footer.gridSpan.rowContainer
                }
                width="fill-parent"
              >
                <Typography
                  fill={radiusTokens.component.color.navigation.foreground}
                  {...radiusTokens.component.typography.footer.header}
                >
                  {inquiriesHeader}
                </Typography>
                {/* Links Container */}
                <RadiusAutoLayout
                  space={radiusTokens.component.spacing.footer.gap.links}
                  direction="vertical"
                >
                  {inquiriesLinks.map((inquiriesLinkProps) => (
                    <RadiusInlineLink
                      {...inquiriesLinkProps}
                      typography={
                        radiusTokens.component.typography.inlineText.label.large
                      }
                    />
                  ))}
                </RadiusAutoLayout>
              </RadiusAutoLayout>
            </RadiusAutoLayout>
            {/* Third Container */}
            {/* Newsletter */}
            <RadiusAutoLayout
              className={thirdContainer}
              space={radiusTokens.component.spacing.footer.gap.categories}
              direction="vertical"
            >
              <Typography
                fill={radiusTokens.component.color.navigation.foreground}
                {...radiusTokens.component.typography.footer.header}
              >
                {newsLetterHeader}
              </Typography>
              {newsLetterLinks.map((newsLetterLinkProps) => (
                <RadiusLinkButton {...newsLetterLinkProps} />
              ))}
            </RadiusAutoLayout>

            {/* Second container */}
            {/* Legal */}
            <RadiusAutoLayout
              className={secondContainer}
              space={radiusTokens.component.spacing.footer.gap.legal}
              direction={radiusTokens.component.direction.footer.legalContainer}
              height="fill-parent"
              alignment="center"
            >
              <Typography
                fill={radiusTokens.component.color.navigation.foreground}
                {...radiusTokens.component.typography.footer.legal}
              >
                {copyright}
              </Typography>
              <RadiusInlineLink
                {...privacyPolicy}
                typography={
                  radiusTokens.component.typography.inlineText.label.small
                }
              />
            </RadiusAutoLayout>

            {/* Fourth Container */}
            {/* Connect */}
            <RadiusAutoLayout
              className={fourthContainer}
              space={radiusTokens.component.spacing.footer.gap.connect}
              direction={
                radiusTokens.component.direction.footer.connectContainer
              }
              alignment="center"
            >
              <RadiusAutoLayout>
                {connectLinkIcons.map((connectLinkIconProps) => (
                  <RadiusLinkIcon
                    {...connectLinkIconProps}
                    // TODO: add sizing token when available
                    size={{ css: '24px' }}
                  />
                ))}
              </RadiusAutoLayout>
              <RadiusButton {...connectButtonProps} variant="secondary" />
            </RadiusAutoLayout>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </Component>
    );
  }
);
