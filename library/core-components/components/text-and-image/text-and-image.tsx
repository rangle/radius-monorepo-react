import React, { useMemo, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { TextAndImageProps } from './text-and-image.types';
import { getStyles } from './text-and-image.styles';
import { RadiusAutoBox } from '../auto-box/auto-box';
import { Typography } from '../typography/typography';

export const TextAndImage = forwardRef<React.ElementType, TextAndImageProps>(
  (
    { title, headingLevel, body, media = 'left', src, alt, className, ...rest },
    ref
  ) => {
    const { container, imageContainer, textContainer } = useMemo(
      () => getStyles({ media }),
      [media]
    );

    return (
      <RadiusAutoBox
        ref={ref}
        className={cx(container, className)}
        space="--spacing-core-space-8x"
        width="fill-parent"
        alignment="center"
        {...rest}
      >
        {/* Image Container */}
        <RadiusAutoBox className={imageContainer}>
          <RadiusAutoBox as="img" src={src} alt={alt} width="fill-parent" />
        </RadiusAutoBox>
        {/* Text Container */}
        <RadiusAutoBox
          className={textContainer}
          direction="vertical"
          space="--spacing-core-space-8x"
        >
          {/* Title */}
          <Typography
            as={headingLevel}
            font="--typography-heading-lg"
            color="--color-text-on-base-primary"
          >
            {title}
          </Typography>
          {/* Body */}
          <Typography
            font="--typography-body-md"
            color="--color-text-on-base-secondary"
          >
            {body}
          </Typography>
        </RadiusAutoBox>
      </RadiusAutoBox>
    );
  }
);
