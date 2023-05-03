import React, { useMemo, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { getStyles } from './image-text-item.styles';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { Typography } from '../typography/typography';

export type ImageTextItemProps = {
  /** Whether to render the large or small Image Text Item variant */
  // variant: 'large' | 'small';
  /** Title text */
  title: string;
  /** Body text */
  body: string;
  /** The tag to be used for the title. Should be specified on a case-by-case basis to ensure correct semantics for accessibility */
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Which side of the text the image should be displayed on */
  media?: 'left' | 'right';
  /** The image source */
  src: string;
  /** The image alt text */
  alt?: string; // ? Should this be required?
  /** Optional classname to add to the container */
  className?: string;
};

export const ImageTextItem = forwardRef<HTMLDivElement, ImageTextItemProps>(
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
        {/* Content Block */}
        <RadiusAutoLayout
          className={textContainer}
          direction="vertical"
          space="--spacing-core-spacing-8"
        >
          {/* Header */}
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
