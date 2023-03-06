import React, { useMemo, forwardRef } from 'react';

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
        className={`${container} ${className}`}
        space="var(--spacing-core-space-8x)"
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
          space="var(--spacing-core-space-8x)"
        >
          {/* Title */}
          <Typography
            as={headingLevel}
            font="var(--typography-heading-lg)"
            color="var(--color-text-on-base-primary)"
          >
            {title}
          </Typography>
          {/* Body */}
          <Typography
            font="var(--typography-body-md)"
            color="var(--color-text-on-base-secondary)"
          >
            {body}
          </Typography>
        </RadiusAutoBox>
      </RadiusAutoBox>
    );
  }
);
