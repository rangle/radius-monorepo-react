import React, { forwardRef } from 'react';
import { CSSProp } from '@rangle/radius-foundations';

import { RadiusIcon } from '../icon';
import { RadiusAutoLayout } from '../../components/auto-layout/auto-layout';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { useStyles } from './link-icon.styles';

export type RadiusLinkIconProps = {
  /** The url for the link */
  href: string;
  /** The icon to display */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** The size of the icon */
  size: CSSProp<'sizing', 'component'>;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** The class name to apply to the component */
  className?: string;
};

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/f8ht6hWwgGcBAjRvhPAiOZ/Link-Icon?type=design&node-id=2-2&t=FZCihaVJwuEpv1c6-0)
 */
export const RadiusLinkIcon = forwardRef<
  HTMLAnchorElement,
  RadiusLinkIconProps
>(({ href, icon, size, disabled, className }, ref) => {
  const { icon: iconStyles } = useStyles({ disabled });

  return (
    <RadiusAutoLayout
      className={className}
      ref={ref}
      as="a"
      href={!disabled ? href : undefined}
    >
      <RadiusIcon
        className={iconStyles}
        component={icon}
        size={size}
        fill={
          disabled
            ? radiusTokens.component.color.linkIcon.disabled
            : radiusTokens.component.color.linkIcon.default
        }
      ></RadiusIcon>
    </RadiusAutoLayout>
  );
});
