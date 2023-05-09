import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusNavExtendedProps = {
  className?: string;
};

export type RadiusNavProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavExtendedProps>;

export type RadiusNavComponent = <C extends React.ElementType = 'nav'>(
  props: RadiusNavProps<C>
) => React.ReactElement | null;
