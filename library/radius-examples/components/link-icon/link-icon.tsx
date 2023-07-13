import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { RadiusIcon } from '@rangle/radius-react-core-components';

import { useStyles } from './link-icon.styles';
import {
  RadiusLinkIconComponent,
  RadiusLinkIconProps,
} from './link-icon.types';
import { PolymorphicRef } from '@rangle/radius-shared/utils';

/**
 * A component that renders an icon as a link or button. It is a wrapper around
 * the RadiusIcon component, and can be passed any react SVG icon component.
 *
 * It can be used as an `a` tag or `button` depending on the `as` prop (defaults
 * to `a`).
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/f8ht6hWwgGcBAjRvhPAiOZ/Link-Icon?type=design&node-id=2-2&t=FZCihaVJwuEpv1c6-0)
 */
export const RadiusLinkIcon: RadiusLinkIconComponent = forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as,
      href,
      icon,
      size,
      disabled,
      className,
      ...rest
    }: RadiusLinkIconProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const { parent, icon: iconStyles } = useStyles({ disabled });

    return (
      <Component
        className={cx(parent, className)}
        ref={ref}
        href={!disabled ? href : undefined}
        disabled={disabled}
        {...rest}
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
      </Component>
    );
  }
);
