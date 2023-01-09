/*
 * Polymorphic types source: https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
import {
  PropsWithChildren,
  ElementType,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from 'react';

// Helper types to allow components to become polymorphic

// ## What are Polymorphic components?
// React components should expose typical HTML attributes,
// like `aria-` and `readonly` for example.
// Polymorphic components will change which attributes are exposed
// based on the undelying html the component is using to render.
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

/** type fragment containing the 'children' prop */
export type ChildrenProp = Pick<PropsWithChildren<unknown>, 'children'>;

/*** generic type representing the `ref` prop */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>;

export type ComponentPropsWitAs<C extends ElementType> = AsProp<C> &
  ComponentPropsWithoutRef<C>;

/*** generic type representing the props of a given component of type `C` - without the `ref` prop */
export type PolymorphicComponentProp<C extends ElementType, Props> = Props &
  ComponentPropsWitAs<C>;

/*** generic type representing the props of a given component of type `C` - with the `ref` prop */
export type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props
> = PolymorphicComponentProp<C, Props> & PolymorphicRef<C>;
