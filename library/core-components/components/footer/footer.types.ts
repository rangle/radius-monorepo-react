import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusFooterExtendedProps = {
  className?: string;
};

export type RadiusFooterProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusFooterExtendedProps>;

export type RadiusFooterComponent = <C extends React.ElementType = 'footer'>(
  props: RadiusFooterProps<C>
) => React.ReactElement | null;
