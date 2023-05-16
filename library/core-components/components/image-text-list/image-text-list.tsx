import React, { forwardRef } from 'react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusImageTextListProps } from './image-text-list.types';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { RadiusImageTextItem } from '../image-text-item';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/84QBrU7F6mSMEwQhxYrffk/Image-Text-List?type=design&node-id=2-2)
 */
export const RadiusImageTextList = forwardRef<
  HTMLDivElement,
  RadiusImageTextListProps
>(({ variant, items, className, ...rest }, ref) => {
  return (
    <RadiusAutoLayout
      ref={ref}
      className={className}
      space={
        variant === 'large'
          ? radiusTokens.component.spacing.imageTextList.large.gap.vertical
          : radiusTokens.component.spacing.imageTextList.small.gap.vertical
      }
      direction={radiusTokens.component.direction.imageTextList.component}
      {...rest}
    >
      {variant === 'large' &&
        items.map((itemProps, idx) => (
          <RadiusImageTextItem
            {...itemProps}
            variant={variant}
            imageAlignment={
              variant === 'large' ? (idx % 2 ? 'right' : 'left') : undefined
            }
          />
        ))}
      {variant === 'small' &&
        // for every 2 items, create a row using RadiusAutoLayout
        items
          .reduce<JSX.Element[][]>((acc, item, idx) => {
            const newItem = <RadiusImageTextItem {...item} variant={variant} />;
            if (idx % 2 === 0) {
              acc.push([newItem]);
            } else {
              acc[acc.length - 1].push(newItem);
            }
            return acc;
          }, [])
          .map((row) => (
            <RadiusAutoLayout
              space={
                radiusTokens.component.spacing.imageTextList.small.gap
                  .horizontal
              }
              direction={
                radiusTokens.component.direction.imageTextList.rowContainer
              }
              padding={[
                0,
                radiusTokens.component.spacing.imageTextList.small.padding
                  .horizontal,
              ]}
            >
              {row.map((item) => item)}
            </RadiusAutoLayout>
          ))}
    </RadiusAutoLayout>
  );
});