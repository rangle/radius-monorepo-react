import React, { forwardRef } from 'react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';

import { RadiusImageTextListProps } from './image-text-list.types';
import { RadiusImageTextItem } from '../image-text-item';

/**
 * A component that renders a list of `RadiusImageTextItem` components. It has
 * two variants, large and small, which can be passed via the `variant` prop,
 * and automatically determines the variant of the children.
 *
 * See the `RadiusImageTextItem` component for details on expected props for
 * each item.
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
          ? radiusTokens.component.spacing.imageTextList.large.gap.column
          : radiusTokens.component.spacing.imageTextList.small.gap.column
      }
      direction={radiusTokens.component.direction.imageTextList.component}
      {...rest}
    >
      {variant === 'large' &&
        items.map((itemProps, idx) => (
          <RadiusImageTextItem
            {...itemProps}
            variant={variant}
            imageAlignment={idx % 2 ? 'right' : 'left'}
            key={idx}
          />
        ))}
      {variant === 'small' &&
        // for every 2 items, create a row using RadiusAutoLayout
        items
          .reduce<JSX.Element[][]>((acc, item, idx) => {
            const newItem = (
              <RadiusImageTextItem {...item} variant={variant} key={idx} />
            );
            if (idx % 2 === 0) {
              acc.push([newItem]);
            } else {
              acc[acc.length - 1].push(newItem);
            }
            return acc;
          }, [])
          .map((row, idx) => (
            <RadiusAutoLayout
              space={
                radiusTokens.component.spacing.imageTextList.small.gap.column
              }
              direction={
                radiusTokens.component.direction.imageTextList.rowContainer
              }
              padding={[
                0,
                radiusTokens.component.spacing.imageTextList.small.padding
                  .horizontal,
              ]}
              key={idx}
            >
              {row.map((item) => item)}
            </RadiusAutoLayout>
          ))}
    </RadiusAutoLayout>
  );
});
