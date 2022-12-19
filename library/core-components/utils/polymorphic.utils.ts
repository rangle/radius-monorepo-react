import React, { ComponentProps } from 'react';
import { ComponentPropsWitAs } from './polymorphic.types';

type ElementAndPropsResult<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>
> = T extends ComponentPropsWitAs<T>['as']
  ? {
      Component: T;
      props: ComponentProps<T>;
    }
  : never;

export const elementAndProps = <
  T extends React.ElementType,
  P extends ComponentPropsWitAs<T>
>(
  { as, ...props }: P,
  defaultTAG: Exclude<P['as'], undefined>
) =>
  ({ props, Component: as || defaultTAG } as ElementAndPropsResult<
    Exclude<P['as'], undefined>
  >);
