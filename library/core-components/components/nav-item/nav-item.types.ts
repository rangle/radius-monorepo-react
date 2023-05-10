import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusNavItemExtendedProps = {
  /** The content to display in the nav item */
  children: React.ReactNode;
  /** Whether the item is selected */
  selected?: boolean;
  className?: string;
};

export type RadiusNavItemProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavItemExtendedProps>;

export type RadiusNavItemComponent = <C extends React.ElementType = 'a'>(
  props: RadiusNavItemProps<C>
) => React.ReactElement | null;
