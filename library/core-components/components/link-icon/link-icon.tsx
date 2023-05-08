import React, { forwardRef } from 'react';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
// import { Typography } from '../typography/typography';
// import { useStyles } from './nav-item.styles';
// import { cx } from '@emotion/css';

export type RadiusLinkIconProps = {
  className?: string;
};

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/f8ht6hWwgGcBAjRvhPAiOZ/Link-Icon?type=design&node-id=2-2&t=FZCihaVJwuEpv1c6-0)
 */
export const RadiusLinkIcon = forwardRef<HTMLDivElement, RadiusLinkIconProps>(
  ({ className }, ref) => {
    // const { link, underline } = useStyles({ selected });

    return (
      <RadiusAutoLayout className={className} ref={ref}>
        hi
      </RadiusAutoLayout>
    );
  }
);
