import { PolymorphicComponentPropWithRef } from '../../../../shared/utils/polymorphic.types';

export type RadiusButtonVariant = 'primary' | 'secondary';

/** Valid Element Types for the RadiusButton  */
// Not currently used - TODO: implement type restrictions on polymorphic components
export type RadiusButtonTag = 'a' | 'button';

/**
 * Props that belong the RadiusButton itself.
 * In many cases, they will be equivalent to the props
 * required by the styles (ex.: size), but not always (ex.:variant)
 * the second case can be useful when you don't want to expose implementation details
 * to the component API -- you want the component props to represent intention,
 * whereas the internal properties might be more descriptive for maintenance
 */
export type RadiusButtonExtendedProps = {
  /** The design variant of the button (eg. Primary vs. Secondary) */
  variant?: RadiusButtonVariant;
  /** The optional icon to display to the right of the content */
  rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/**
 * The Component Props. It is a mix of the Specific props declared above
 * and the props of the html tag the component represents
 * this will, for example, help you expose all the
 * appropriate aria- attributes without having to do it manually
 * check the file [library/core-components/utils/polymorphic.types.ts]
 * for more details.
 *
 * note: In cases where you want only specific tags to be allowed for a
 * polymorphic component, you can pass a union type of the tags you want to
 * allow as the optional third argument to `PolymorphicComponentPropWithRef`,
 * like with the `RadiusButtonTag` type below.
 */
export type RadiusButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusButtonExtendedProps>;

export type RadiusButtonComponent = <C extends React.ElementType = 'button'>(
  props: RadiusButtonProps<C>
) => React.ReactElement | null;
