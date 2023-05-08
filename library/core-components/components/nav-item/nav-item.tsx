import React, { forwardRef } from 'react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
import { Typography } from '../typography/typography';
import { useStyles } from './nav-item.styles';
import { cx } from '@emotion/css';

export type RadiusNavItemProps = {
  /** The label text */
  label: string;
  /** The url for the link */
  href: string;
  /** Whether the item is selected */
  selected?: boolean;
  className?: string;
};

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/cr1TnhNnQE1q93AXS7pAoo/Navigation?type=design&node-id=1-2880&t=lEv9YPz7daN5CFPv-0)
 */
export const RadiusNavItem = forwardRef<HTMLAnchorElement, RadiusNavItemProps>(
  ({ label, href, selected, className }, ref) => {
    const { link, underline } = useStyles({ selected });

    return (
      <RadiusAutoLayout
        className={cx(className, link)}
        ref={ref}
        as="a"
        href={href}
        direction="vertical"
        space={radiusTokens.component.spacing['navigation-item'].gap.underline}
      >
        <Typography
          as="span"
          font={radiusTokens.component.typography.navigationItem.label}
          fill={
            selected
              ? radiusTokens.component.color.navigationItem.selected.label
              : radiusTokens.component.color.navigationItem.default.label
          }
        >
          {label}
        </Typography>
        <RadiusAutoLayout
          className={underline}
          width="fill-parent"
          fill={
            selected
              ? radiusTokens.component.color.navigationItem.selected.accent
              : radiusTokens.component.color.navigationItem.default.accent
          }
        />
      </RadiusAutoLayout>
    );
  }
);
