import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusImageTextListProps } from './image-text-list.types';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';

// import { useStyles } from './image-text-item.styles';
// import { RadiusAutoLayout } from '../auto-layout/auto-layout';
// import { Typography } from '../typography/typography';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/84QBrU7F6mSMEwQhxYrffk/Image-Text-List?type=design&node-id=2-2)
 */
export const RadiusImageTextList = forwardRef<
  HTMLDivElement,
  RadiusImageTextListProps
>(
  (
    {
      variant,
      // header,
      // headingLevel,
      // body,
      // imageAlignment = 'left',
      // src,
      // alt,
      className,
      ...rest
    },
    ref
  ) => {
    // const { styles, imageContainer, textContainer } = useStyles({
    //   imageAlignment,
    //   variant,
    // });

    return (
      <RadiusAutoLayout ref={ref} className={className} {...rest}>
        hi
      </RadiusAutoLayout>
    );
  }
);
