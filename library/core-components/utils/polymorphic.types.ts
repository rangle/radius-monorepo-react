/*
 * Polymorphic types source: https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
import { ElementType, ComponentPropsWithRef } from 'react';

// Helper types to allow components to become polymorphic

// ## What are Polymorphic components?
// React components should expose typical HTML attributes,
// like `aria-` and `readonly` for example.
// Polymorphic components will change which attributes are exposed
// based on the underlying html the component is using to render.
// For instance, a Button component can render as either <button> or <a>
// if it is rendered as <button> it shouldn't have the href attribute
// this is controlled by using the `as` prop.
// ex.:
//   `<MyButton type="primary" as="a" href={url} />`      -- should be valid
//   `<MyButton type="primary" as="button" href={url} />` -- typescript error: 'undefined prop href'
//   `<MyButton type="primary" as="button" type="reset" />` -- valid again

/** type fragment containing the 'as' prop
 * the 'as' prop can be the name of a tag
 */
export type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

/*** generic type representing the `ref` prop */
export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

/**
 * Generic type representing the props of a given component of type `C` -
 * without the `ref` prop.
 *
 * Note: the `AsType` argument is optional - when provided, it can be used to
 * narrow the allowed element types for the `as` prop.
 * 
 * @example
 * PolymorphicComponentProp<C, Props, 'h1' | 'p'>;
  // restricts the possible element types to 'h1' or 'p'
 */
export type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Generic type representing the props of a given component of type `C` - with
 * the `ref` prop.
 *
 * Note: the `AsType` argument is optional - when provided, it can be used to
 * narrow the allowed element types for the `as` prop.
 * 
 * @example
 * PolymorphicComponentPropWithRef<C, Props, 'h1' | 'p'>;
  // restricts the possible element types to 'h1' or 'p'
 * */
export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = Record<string, never>
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Utility to omit the specified prop(s) from complex polymorphic types.
 * The standard `Omit` utility doesn't work as expected with polymorphic types.
 *
 * @example
 * ```
 * // Omits the `size` prop from the `RadiusLinkIconProps` type
 * OmitPolymorphicProp<RadiusLinkIconProps<React.ElementType>, 'size'>
 * ```
 * */
export type OmitPolymorphicProp<T, Prop extends string> = {
  [P in keyof T as P extends Prop ? never : P]: T[P];
};
