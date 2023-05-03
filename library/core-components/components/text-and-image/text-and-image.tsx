import React, { useMemo, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { TextAndImageProps } from './text-and-image.types';
import { getStyles } from './text-and-image.styles';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { Typography } from '../typography/typography';

export const TextAndImage = forwardRef<HTMLDivElement, TextAndImageProps>(
  (
    { title, headingLevel, body, media = 'left', src, alt, className, ...rest },
    ref
  ) => {
    const { container, imageContainer, textContainer } = useMemo(
      () => getStyles({ media }),
      [media]
    );

    return (
      <RadiusAutoLayout
        ref={ref}
        className={cx(container, className)}
        space="--spacing-core-spacing-8"
        width="fill-parent"
        alignment="center"
        {...rest}
      >
        {/* Image Container */}
        <RadiusAutoLayout className={imageContainer}>
          <RadiusAutoLayout as="img" src={src} alt={alt} width="fill-parent" />
        </RadiusAutoLayout>
        {/* Text Container */}
        <RadiusAutoLayout
          className={textContainer}
          // @ts-expect-error - this component needs refactor with new tokens
          direction="vertical"
          space="--spacing-core-spacing-8"
        >
          {/* Title */}
          <Typography
            as={headingLevel}
            // @ts-expect-error - this component needs refactor with new tokens
            font="--typography-heading-lg"
            // @ts-expect-error - this component needs refactor with new tokens
            fill="--color-text-on-base-primary"
          >
            {title}
          </Typography>
          {/* Body */}
          <Typography
            // @ts-expect-error - this component needs refactor with new tokens
            font="--typography-body-md"
            // @ts-expect-error - this component needs refactor with new tokens
            fill="--color-text-on-base-secondary"
          >
            {body}
          </Typography>
        </RadiusAutoLayout>
      </RadiusAutoLayout>
    );
  }
);
