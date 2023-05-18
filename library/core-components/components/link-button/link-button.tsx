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
      disabled,
      iconRight,
      className,
      children,
      ...rest
    }: RadiusLinkButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const Component = as || 'a';
    const styles = useStyles({ disabled });

    return (
      <Component
        className={cx(styles, className)}
        ref={ref}
        href={!disabled ? href : undefined}
        disabled={disabled}
        {...rest}
      >
        <RadiusAutoLayout
          space={radiusTokens.component.spacing.linkButton.gap}
          alignment="center"
        >
          <Typography
            as="span"
            font={radiusTokens.component.typography.linkButton.label}
          >
            {children}
          </Typography>
          {iconRight && (
            <RadiusIcon
              component={iconRight}
              size={radiusTokens.component.sizing.button.icon}
            />
          )}
        </RadiusAutoLayout>
      </Component>
    );
  }
);
