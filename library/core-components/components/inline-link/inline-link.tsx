import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { useStyles } from './inline-link.styles';
import {
  RadiusInlineLinkComponent,
  RadiusInlineLinkProps,
} from './inline-link.types';
import { PolymorphicRef } from '../../utils';

/**
 * TODO: Add description
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/EUSxceIm71tCWSzPE27BwW/Inline-Link?type=design&node-id=2-2)
 */
export const RadiusInlineLink: RadiusInlineLinkComponent = forwardRef(
  <C extends React.ElementType = 'a'>(
    { as, href, size, disabled, className, ...rest }: RadiusInlineLinkProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const { styles } = useStyles({ disabled });

    return (
      <Component
        className={cx(styles, className)}
        ref={ref}
        href={!disabled ? href : undefined}
        disabled={disabled}
        {...rest}
      >
        hi
      </Component>
    );
  }
);
