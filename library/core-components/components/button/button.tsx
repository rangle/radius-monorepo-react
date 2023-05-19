import React, { forwardRef } from 'react';
import { cx } from '@emotion/css';

import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { PolymorphicRef } from '../../utils';

import { RadiusButtonProps, RadiusButtonComponent } from './button.types';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';
import { RadiusIcon } from '../icon/icon';
import { Typography } from '../typography/typography';
import { useStyles } from './button.styles';

// Adding comments before the component will be added to the documentation in storybook.
/** # RadiusButton Component
 * A polymorphic component that represents either an html _button_ or _anchor_
 * exposes all attributes of the selected tag, plus the specific attributes
 * declared in the Specific Props type above
 *
 * Makes use of the react forwardRef function to ensure that the `ref` property is available
 * and points to the html dom element inside.
 *
 * See https://reactjs.org/docs/forwarding-refs.html for more information
 */
export const RadiusButton: RadiusButtonComponent = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      as,
      children, // extract children
      variant = 'primary',
      rightIcon,
      className, // extract className
      ...rest // the remainder should be the original tag's attributes
    }: RadiusButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button';

    // one suggested idiom is to extract all specific props in the render function props param
    // and let 'rest' contain only the native html attributes

    // Styling the component using [Emotion](https://emotion.sh/).
    // The styling logic, however, is encapsulated in the custom `useStyles` function.
    // The `className` is generated by the styles module, and is automatically memoized to
    // prevent unnecessary renders.
    // note that we only pass the props that are needed.
    const style = useStyles({ variant });
    // extracting the props that are supported by Typography from the token
    const { font, letterSpacing, textDecoration } =
      radiusTokens.component.typography.button.label;

    return (
      <Component className={cx(style, className)} ref={ref} {...rest}>
        <RadiusAutoLayout
          space="--spacing-component-button-gap"
          alignment="center"
          padding={[
            '--spacing-component-button-padding-vertical',
            '--spacing-component-button-padding-horizontal',
          ]}
        >
          <Typography as="span" {...{ font, letterSpacing, textDecoration }}>
            {children}
          </Typography>
          {rightIcon && (
            <RadiusIcon
              component={rightIcon}
              size={radiusTokens.component.sizing.button.icon}
            />
          )}
        </RadiusAutoLayout>
      </Component>
    );
  }
);
// ----------------------------
