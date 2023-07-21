import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations';
import { Typography } from '@rangle/radius-react-core-components';

import { useStyles } from './inline-link.styles';
import {
  RadiusInlineLinkComponent,
  RadiusInlineLinkProps,
} from './inline-link.types';
import { PolymorphicRef } from '@rangle/radius-shared';

/**
 * A component that renders a link as a text element. It is a wrapper around
 * the `Typography` component, and can be passed text or any valid ReactNode.
 *
 * It is polymorphic and can be passed a custom wrapper component via the `as`
 * prop, eg. using React Router's `Link` component. By default it renders an `a`
 * tag.
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
      typography,
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
          {...typography}
        >
          {children}
        </Typography>
      </Component>
    );
  }
);
