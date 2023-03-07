import React from 'react';
import { cx } from '@emotion/css';

import { RadiusAutoBox } from '../../components/auto-box/auto-box';
import { RadiusButton } from '../../components/button/button';
import { Typography } from '../../components/typography/typography';
import { getStyles } from './hero.styles';

export type HeroProps = {
  title: string;
  eyebrow: string;
  buttonLabel: string;
  imageSrc: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const RadiusHero = ({
  title,
  eyebrow,
  buttonLabel,
  imageSrc,
  className,
  ...rest
}: HeroProps) => {
  const heroStyle = getStyles();
  return (
    <RadiusAutoBox className={cx(heroStyle, className)} {...rest}>
      <RadiusAutoBox
        width="fill-parent"
        space={24}
        alignment="center"
        className="content-container"
      >
        <RadiusAutoBox className="image-container" width="fill-parent">
          <RadiusAutoBox as="img" src={imageSrc} width="fill-parent" />
        </RadiusAutoBox>
        <RadiusAutoBox direction="vertical" className="text-container">
          <Typography
            as="p"
            font="var(--typography-heading-md)"
            color="var(--color-text-on-base-secondary)"
          >
            {eyebrow}
          </Typography>
          <Typography as="h1" font="var(--typography-heading-xxl)">
            {title}
          </Typography>
          <RadiusAutoBox className="buttonContainer">
            <RadiusButton as="button" variant="primary" size="large">
              {buttonLabel}
            </RadiusButton>
          </RadiusAutoBox>
        </RadiusAutoBox>
      </RadiusAutoBox>
    </RadiusAutoBox>
  );
};
