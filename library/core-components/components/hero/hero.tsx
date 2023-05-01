import React from 'react';
import { cx } from '@emotion/css';
import { ArrowRight } from '@rangle/radius-foundations/generated/icons';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
import { RadiusButton } from '../../components/button/button';
import { Typography } from '../../components/typography/typography';
import { useStyles } from './hero.styles';

export type HeroProps = {
  header: string;
  eyebrow: string;
  buttonLabel: string;
  imageSrc: string;
  ctaUrl: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const RadiusHero = ({
  header,
  eyebrow,
  buttonLabel,
  imageSrc,
  ctaUrl,
  className,
  ...rest
}: HeroProps) => {
  const { contentContainer, imageContainer, textContainer } = useStyles();
  return (
    <RadiusAutoLayout
      className={cx(className)}
      padding={[
        '--spacing-component-spacing-hero-padding-vertical',
        '--spacing-component-spacing-hero-padding-horizontal',
      ]}
      fill="--color-component-color-hero-background"
      {...rest}
    >
      <RadiusAutoLayout
        width="fill-parent"
        space="--spacing-component-spacing-hero-gap-image"
        alignment="center"
        className={contentContainer}
      >
        <RadiusAutoLayout
          className={imageContainer}
          width="fill-parent"
          fill="--color-component-color-hero-image"
        >
          <RadiusAutoLayout as="img" src={imageSrc} width="fill-parent" />
        </RadiusAutoLayout>
        <RadiusAutoLayout direction="vertical" className={textContainer}>
          <RadiusAutoLayout
            padding={{
              css: '0 0 var(--spacing-component-spacing-hero-gap-content) 0',
            }}
          >
            <Typography
              font="--typography-component-typography-hero-eyebrow"
              fill="--color-component-color-hero-eyebrow"
            >
              {eyebrow}
            </Typography>
          </RadiusAutoLayout>
          <Typography
            as="h1"
            font="--typography-component-typography-hero-header"
            fill="--color-component-color-hero-header"
          >
            {header}
          </Typography>
          <RadiusAutoLayout
            padding={{
              css: 'var(--spacing-component-spacing-hero-gap-above-button) 0 0 0',
            }}
          >
            <RadiusButton as="a" href={ctaUrl} rightIcon={ArrowRight}>
              {buttonLabel}
            </RadiusButton>
          </RadiusAutoLayout>
        </RadiusAutoLayout>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  );
};
