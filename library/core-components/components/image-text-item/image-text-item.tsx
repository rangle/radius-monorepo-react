import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { useStyles } from './image-text-item.styles';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { Typography } from '../typography/typography';
import { RadiusImageTextItemProps } from './image-text-item.types';

/**
 * A component that renders an image and text side by side. It has two variants,
 * large and small, which can be passed via the `variant` prop. The large variant
 * has a larger image and a header, while the small variant has a smaller image
 * and no header.
 *
 * It should be used in conjunction with the `RadiusImageTextList` component,
 * which handles the layout of the items.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/84QBrU7F6mSMEwQhxYrffk/Image-Text-List?type=design&node-id=2-2)
 */
export const RadiusImageTextItem = forwardRef<
  HTMLDivElement,
  RadiusImageTextItemProps
>(
  (
    {
      variant,
      header,
      headingLevel,
      body,
      imageAlignment = 'left',
      src,
      alt,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const { styles, imageContainer, image, textContainer } = useStyles({
      imageAlignment,
      variant,
    });

    return (
      <RadiusAutoLayout
        ref={ref}
        className={cx(styles, className)}
        direction={
          variant === 'large'
            ? radiusTokens.component.direction.largeImageTextItem.component
            : radiusTokens.component.direction.smallImageTextItem.component
        }
        space={
          variant === 'large'
            ? radiusTokens.component.spacing.largeImageTextItem.gap.content
            : radiusTokens.component.spacing.smallImageTextItem.gap.image
        }
        width="fill-parent"
        alignment="center"
        {...rest}
      >
        {/* Image Container */}
        <RadiusAutoLayout
          className={imageContainer}
          width="fill-parent"
          height="fill-parent"
          cornerRadius={
            radiusTokens.component.borderRadius.largeImageTextItem.image
          }
          clippedContent
        >
          <RadiusAutoLayout
            as="img"
            src={src}
            alt={alt}
            width="fill-parent"
            height="fill-parent"
            className={image}
          />
        </RadiusAutoLayout>
        {/* Text Container */}
        <RadiusAutoLayout
          className={textContainer}
          direction={
            radiusTokens.component.direction.largeImageTextItem.textContainer
          }
          space={radiusTokens.component.spacing.largeImageTextItem.gap.content}
          width="fill-parent"
        >
          {/* Header */}
          {variant === 'large' && (
            <Typography
              as={headingLevel}
              font={
                radiusTokens.component.typography.largeImageTextItem.header.font
              }
              fill={radiusTokens.component.color.largeImageTextItem.header}
            >
              {header}
            </Typography>
          )}
          {/* Body */}
          <Typography
            font={
              variant === 'large'
                ? radiusTokens.component.typography.largeImageTextItem.body.font
                : radiusTokens.component.typography.smallImageTextItem.body.font
            }
            fill={
              variant === 'large'
                ? radiusTokens.component.color.largeImageTextItem.body
                : radiusTokens.component.color.smallImageTextitem.body
            }
          >
            {body}
          </Typography>
          {/* Optional additional content */}
          {children}
        </RadiusAutoLayout>
      </RadiusAutoLayout>
    );
  }
);
