import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { useStyles } from './inline-link.styles';
import {
  RadiusInlineLinkComponent,
  RadiusInlineLinkProps,
} from './inline-link.types';
import { PolymorphicRef } from '../../utils';
import { Typography } from '../typography/typography';

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/EUSxceIm71tCWSzPE27BwW/Inline-Link?type=design&node-id=2-2)
 */
export const RadiusInlineLink: RadiusInlineLinkComponent = forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as,
      children,
      href,
      size,
      disabled,
      className,
      ...rest
    }: RadiusInlineLinkProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const { styles, label } = useStyles({ disabled });

    return (
      <Component
        className={cx(styles, className)}
        ref={ref}
        href={!disabled ? href : undefined}
        disabled={disabled}
        {...rest}
      >
        <Typography
          className={label}
          fill={
            disabled
              ? radiusTokens.component.color.inlineText.disabled
              : radiusTokens.component.color.inlineText.default
          }
        >
          {children}
        </Typography>
      </Component>
    );
  }
);
