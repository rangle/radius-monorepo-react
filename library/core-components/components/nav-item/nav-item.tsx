import React, { forwardRef } from 'react';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';

export type RadiusNavItemProps = {
  className?: string;
};

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880&t=lEv9YPz7daN5CFPv-0)
 */
export const RadiusNavItem = forwardRef<HTMLDivElement, RadiusNavItemProps>(
  ({ className }, ref) => {
    return (
      <RadiusAutoLayout className={className} ref={ref}>
        hi
      </RadiusAutoLayout>
    );
  }
);
