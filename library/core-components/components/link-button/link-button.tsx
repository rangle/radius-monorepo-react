import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusIcon } from '../icon';
import { useStyles } from './link-button.styles';
import {
  RadiusLinkButtonComponent,
  RadiusLinkButtonProps,
} from './link-button.types';
import { PolymorphicRef } from '../../utils';
import { Typography } from '../typography/typography';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';

/**
 * TODO: Write description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/GyMbhen70fwnSFOXriDZWZ/Link-Button?type=design&node-id=2-2)
 */
export const RadiusLinkButton: RadiusLinkButtonComponent = forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as,
      href,
      // size,
      disabled,
      iconRight,
      className,
      children,
      ...rest
    }: RadiusLinkButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const {
      parent,
      button: buttonStyles,
      children: childrenStyles,
    } = useStyles({ disabled });

    return (
      <Component
        className={cx(parent, className)}
        ref={ref}
        href={!disabled ? href : undefined}
        disabled={disabled}
        {...rest}
      >
        <Typography
        // className={buttonStyles}
        // component={button}
        // size={size}
        // fill={
        //   disabled
        //     ? radiusTokens.component.color.linkIcon.disabled
        //     : radiusTokens.component.color.linkIcon.default
        // }
        >
          {children}
        </Typography>
      </Component>
    );
  }
);
