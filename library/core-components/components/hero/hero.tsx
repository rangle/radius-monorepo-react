import React, { forwardRef } from 'react';
import { ArrowRight } from '@rangle/radius-foundations/generated/icons';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
import { RadiusButton } from '../../components/button/button';
import { Typography } from '../../components/typography/typography';
import { useStyles } from './hero.styles';

export type RadiusHeroProps = {
  /** The main header text */
  header: string;
  /** The eyebrow text */
  eyebrow: string;
  /** The button label text */
  buttonLabel: string;
  /** The image source */
  imageSrc: string;
  /** The url for the Call To Action link button. If not provided, the button will not be shown */
  ctaUrl?: string;
  className?: string;
};

/**
 * The Hero component is used to display a large image with a header, eyebrow,
 * and optional CTA button. If the `ctaUrl` prop is not provided, the Call To
 * Action link button will not be shown.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/hW6DtJyTGtGlLkRB3jK68v/Booster---Hero?node-id=2-2)
 */
export const RadiusHero = forwardRef<HTMLDivElement, RadiusHeroProps>(
  ({ header, eyebrow, buttonLabel, imageSrc, ctaUrl, className }, ref) => {
    const { contentContainer, imageContainer, textContainer } = useStyles();
    return (
      <RadiusAutoLayout
        className={className}
        ref={ref}
        padding={[
          '--spacing-component-spacing-hero-padding-vertical',
          '--spacing-component-spacing-hero-padding-horizontal',
        ]}
        fill="--color-component-color-hero-background"
      >
        {/* Content Container */}
        <RadiusAutoLayout
          height="fill-parent"
          space="--spacing-component-spacing-hero-gap-image"
          alignment="center"
          className={contentContainer}
        >
          {/* Image Container */}
          <RadiusAutoLayout
            className={imageContainer}
            width="fill-parent"
            height="fill-parent"
            fill="--color-component-color-hero-image"
          >
            {/* Image */}
            <RadiusAutoLayout as="img" src={imageSrc} width="fill-parent" />
          </RadiusAutoLayout>
          {/* Outer Text Container */}
          <RadiusAutoLayout
            direction="vertical"
            space="--spacing-component-spacing-hero-gap-above-button"
            width="fill-parent"
            className={textContainer}
          >
            {/* Inner Text Container */}
            <RadiusAutoLayout
              direction="vertical"
              space="--spacing-component-spacing-hero-gap-content"
              width="fill-parent"
            >
              {/* Eyebrow */}
              <Typography
                font="--typography-component-typography-hero-eyebrow"
                fill="--color-component-color-hero-eyebrow"
              >
                {eyebrow}
              </Typography>
              {/* Header */}
              <Typography
                as="h1"
                font="--typography-component-typography-hero-header"
                fill="--color-component-color-hero-header"
              >
                {header}
              </Typography>
            </RadiusAutoLayout>
            {/* CTA Button */}
            {ctaUrl && (
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
