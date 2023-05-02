import React, { forwardRef } from 'react';
import { ArrowRight } from '@rangle/radius-foundations/generated/icons';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
import { RadiusButton } from '../../components/button/button';
import { Typography } from '../../components/typography/typography';
import { useStyles } from './hero.styles';

export type RadiusHeroProps = {
  /** The main header text */
  header: string;
  /** The eyebrow text */
  eyebrow: string;
  /** The image source */
  imageSrc: string;
  /** The image alt text */
  imageAlt: string;
  /** The button label text. If not provided, the button will not be shown */
  buttonLabel?: string;
  /** The url for the Call To Action link button. If not provided, the button will not be shown */
  ctaUrl?: string;
  className?: string;
};

/**
 * The Hero component is used to display a large image with a header, eyebrow,
 * and optional CTA button.
 *
 * If either the `ctaUrl` or `buttonLabel` prop are not provided, the Call To
 * Action link button will not be shown.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/hW6DtJyTGtGlLkRB3jK68v/Booster---Hero?node-id=2-2)
 */
export const RadiusHero = forwardRef<HTMLDivElement, RadiusHeroProps>(
  (
    { header, eyebrow, buttonLabel, imageSrc, imageAlt, ctaUrl, className },
    ref
  ) => {
    const { contentContainer } = useStyles();
    return (
      <RadiusAutoLayout
        className={className}
        ref={ref}
        padding={[
          radiusTokens.component.spacing.hero.padding.vertical,
          radiusTokens.component.spacing.hero.padding.horizontal,
        ]}
        fill={radiusTokens.component.color.hero.background}
      >
        {/* Content Container */}
        <RadiusAutoLayout
          height="fill-parent"
          width="fill-parent"
          alignment="center"
          space={radiusTokens.component.spacing.hero.gap.image}
          className={contentContainer}
        >
          {/* Image Container */}
          <RadiusAutoLayout
            width="fill-parent"
            height="fill-parent"
            fill={radiusTokens.component.color.hero.image}
          >
            {/* Image */}
            <RadiusAutoLayout
              as="img"
              src={imageSrc}
              alt={imageAlt}
              width="fill-parent"
            />
          </RadiusAutoLayout>
          {/* Outer Text Container */}
          <RadiusAutoLayout
            width="fill-parent"
            direction="vertical"
            space={radiusTokens.component.spacing.hero.gap.aboveButton}
          >
            {/* Inner Text Container */}
            <RadiusAutoLayout
              width="fill-parent"
              direction="vertical"
              space={radiusTokens.component.spacing.hero.gap.content}
            >
              {/* Eyebrow */}
              <Typography
                font={radiusTokens.component.typography.hero.eyebrow}
                fill={radiusTokens.component.color.hero.eyebrow}
              >
                {eyebrow}
              </Typography>
              {/* Header */}
              <Typography
                as="h1"
                font={radiusTokens.component.typography.hero.header}
                fill={radiusTokens.component.color.hero.header}
              >
                {header}
              </Typography>
            </RadiusAutoLayout>
            {/* CTA Button */}
            {ctaUrl && buttonLabel && (
              <RadiusButton as="a" href={ctaUrl} rightIcon={ArrowRight}>
                {buttonLabel}
              </RadiusButton>
            )}
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </RadiusAutoLayout>
    );
  }
);
