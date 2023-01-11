import React, { ComponentPropsWithRef, Ref } from 'react';
import { ComponentPropsWitAs } from './polymorphic.types';

type ElementAndPropsResult<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = T extends ComponentPropsWitAs<T>['as']
  ? {
      Component: T;
      props: ComponentPropsWithRef<T>;
    }
  : never;

export const elementAndProps = <
  T extends React.ElementType,
  P extends ComponentPropsWitAs<T>,
  R extends ComponentPropsWithRef<T>
>(
  { as, ...props }: P,
  ref: R['ref'],
  defaultTAG: Exclude<P['as'], undefined>
) =>
  ({
    props: { ...props, ref },
    Component: as || defaultTAG,
  } as ElementAndPropsResult<Exclude<P['as'], undefined>>);
