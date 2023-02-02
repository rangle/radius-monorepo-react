import React, { useMemo, forwardRef } from 'react';
import { PolymorphicComponentPropWithRef } from '../../utils/polymorphic.types';
import { elementAndProps } from '../../utils/polymorphic.utils';

import { getStyles, StylesProps } from './button.styles';

/// Button types
export type RadiusButtonVariant = 'primary' | 'secondary';

/**  Props that belong the RadiusButton itself.
 * in many cases, they will be equivalent to the props
 * required by the styles (ex.: size), but not always (ex.:variant)
 * the second case can be useful when you don't want to expose implementation details
 * to the component API -- you want the component props to represent intention,
 * whereas the internal properties might be more descriptive for maintenance
 */
export type RadiusButtonExtendedProps = {
  variant?: RadiusButtonVariant;
  size?: StylesProps['size'];
};

/// Valid Element Types for the RadiusButton
type RadiusButtonTag = 'a' | 'button';

/** The Component Props
 * it is a mix of the Specific props declared above
 * and the props of the html tag the component represents
 * this will, for example, help you expose all the
 * appropriate aria- attributes without having to do it manually
 * check the file [library/core-components/utils/polymorphic.types.ts]
 * for more details
 */
export type RadiusButtonProps = PolymorphicComponentPropWithRef<
  RadiusButtonTag,
  RadiusButtonExtendedProps
>;

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
export const RadiusButton = forwardRef<RadiusButtonTag, RadiusButtonProps>(
  (
    {
      children, // extract children
      variant,
      className, // extract className
      size, // extract your extensions
      ...rest // the remainder should be the original tag's attributes
    },
    ref
  ) => {
    // one suggested idiom is to extract all specific props in the render function props param
    // and let 'rest' contain only the native html attributes and the `as` prop
    // afterwards, you can use our `elementAndProps` utility to make sure the props are
    // properly typed according to the html tag
    const element = elementAndProps(rest, ref, 'button');

    // Styling the component using [Emotion](https://emotion.sh/).
    // the styling logic, however, is encapsulated in the getStyles function:
    // className generated by the styles module, memoized to prevent unnecessary renders
    // note that we only pass the props that are needed
    const style = useMemo(
      () =>
        getStyles({
          appearance: variant === 'primary' ? 'filled' : 'hollow',
          size,
        }),
      [variant, size]
    );

    if (element.Component === 'button') {
      /// Typescript will constrain the `element` object will to the right type inside this block.
      /// That means you can do specific things you might need to do if you know this component
      /// will be rendered as a button. any attempt to use things that do not belong in a button
      /// will result in a typescript error you can catch as you write.

      //   const { props } = element;
      //   const ok = props.value;  // works fine
      //   const er = props.href;   // typescript error

      return (
        <element.Component
          className={`${style} ${className}`}
          ref={element.props.ref}
          {...element.props}
        >
          {children}
        </element.Component>
      );
    } else {
      /// if you only have two options (button and anchor) typescript will know that if it's not a button
      /// your component is definitely an anchor, and will narrow down the types accordingly in this block

      //   const { props } = element;
      //   const er = props.value; // typescript error
      //   const ok = props.href;  // works fine
      return (
        <element.Component
          className={`${style} ${className}`}
          ref={element.props.ref}
          {...element.props}
        >
          {children}
        </element.Component>
      );
    }
  }
);
// ----------------------------
