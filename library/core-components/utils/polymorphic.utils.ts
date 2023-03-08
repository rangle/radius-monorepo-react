import React from 'react';
// import { ComponentPropsWitAs } from './polymorphic.types';

export type HTMLElements =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<unknown>;

// type ElementAndPropsResult<
//   T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
// > = T extends ComponentPropsWitAs<T>['as']
//   ? {
//       Component: T;
//       props: ComponentPropsWithRef<T>;
//     }
//   : never;

// export const elementAndProps = <
//   T extends React.ElementType,
//   P extends ComponentPropsWitAs<T>,
//   R extends ComponentPropsWithRef<T>
// >(
//   { as, ...props }: P,
//   ref: R['ref'],
//   defaultTAG: Exclude<P['as'], undefined>
// ) => {
//   props = Object.entries(props).reduce((acc, [key, value]) => {
//     if (key.toLowerCase() !== key) return acc; // skip camelCase props
//     return { ...acc, [key]: value };
//   }, {} as P);
//   return {
//     props: { ...props, ref },
//     Component: as || defaultTAG,
//   } as ElementAndPropsResult<Exclude<P['as'], undefined>>;
// };
