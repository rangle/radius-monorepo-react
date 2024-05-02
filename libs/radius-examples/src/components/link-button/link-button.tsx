import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { radiusTokens } from '@rangle/radius-foundations';
import {
  RadiusAutoLayout,
  RadiusIcon,
  Typography,
} from '@rangle/radius-react-core-components';

import { useStyles } from './link-button.styles';
import { RadiusLinkButtonProps } from './link-button.types';
import { PolymorphicRef } from '@rangle/radius-shared';

/**
 * A component that renders a link button. It is polymorphic and can be passed a
 * custom wrapper component via the `as` prop, eg. using React Router's `Link`
 * component. By default it renders an `a` tag.
 *
 * ### Resources
 * [Figma Design Specs](https://www.figma.com/file/GyMbhen70fwnSFOXriDZWZ/Link-Button?type=design&node-id=2-2)
 */
export const RadiusLinkButton = forwardRef(
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
            font={radiusTokens.component.typography.linkButton.label.font}
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
