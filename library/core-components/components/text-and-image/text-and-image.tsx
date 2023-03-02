import React, { useMemo, forwardRef } from 'react';

import { TextAndImageProps } from './text-and-image.types';
import { getStyles } from './text-and-image.styles';
import { RadiusAutoBox } from '../auto-box/auto-box';
import { Typography } from '../typography/typography';

export const TextAndImage = forwardRef<React.ElementType, TextAndImageProps>(
  ({ preTitle, title, headingLevel, body, classname, ...rest }, ref) => {
    const { container, imageContainer, textContainer } = useMemo(
      () => getStyles(),
      []
    );

    return (
      <RadiusAutoBox
        ref={ref}
        className={`${container} ${classname}`}
        // padding={{
        //   top: 'var(--spacing-core-space-26x)',
        //   bottom: 'var(--spacing-core-space-26x)',
        //   left: 'var(--spacing-core-space-18x)',
        //   right: 'var(--spacing-core-space-18x)',
        // }}
        space="var(--spacing-core-space-6x)"
        fill="var(--color-background-subtle)"
        width="fill-parent"
        alignment="center"
        {...rest}
      >
        {/* Image Container */}
        <RadiusAutoBox /* width="50%" */ classname={imageContainer}>
          <RadiusAutoBox
            as="img"
            src="https://via.placeholder.com/1500"
            alt=""
            width="fill-parent"
          />
        </RadiusAutoBox>
        {/* Text Container */}
        <RadiusAutoBox
          classname={textContainer}
          space="var(--spacing-core-space-12x)"
          direction="vertical"
          // width="50%"
        >
          {/* Pre-title */}
          {!!preTitle && (
            <Typography
              font="var(--typography-heading-md)"
              // TODO: some dark mode color tokens are incorrect and will not display correctly until fixed (see https://rangle.atlassian.net/browse/R20-200)
              color="var(--color-text-on-subtle-primary)"
            >
              {preTitle}
            </Typography>
          )}
          {/* Title */}
          <Typography
            as={headingLevel}
            font="var(--typography-heading-xxl)"
            color="var(--color-text-on-subtle-primary)"
          >
            {title}
          </Typography>
          {/* Body */}
          <Typography
            font="var(--typography-body-xl)"
            color="var(--color-text-on-subtle-secondary)"
          >
            {body}
          </Typography>
        </RadiusAutoBox>
      </RadiusAutoBox>
    );
  }
);
