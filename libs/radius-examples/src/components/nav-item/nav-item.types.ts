import { PolymorphicComponentPropWithRef } from '@rangle/radius-shared';

export type RadiusNavItemExtendedProps = {
  /** The content to display in the nav item */
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
