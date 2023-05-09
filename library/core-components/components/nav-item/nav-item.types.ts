import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusNavItemExtendedProps = {
  /** The label text */
  label: string;
  /** Whether the item is selected */
  selected?: boolean;
  className?: string;
};

export type RadiusNavItemProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavItemExtendedProps>;

export type RadiusNavItemComponent = <C extends React.ElementType = 'a'>(
  props: RadiusNavItemProps<C>
) => React.ReactElement | null;
