import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusNavExtendedProps = {
  /**
   * The company logos to display on the left side of the nav. Spacing between
   * them is automatically applied - if passing multiple elements, they should
   * be wrapped in a Fragment (`<></>`), or passed as an array.
   */
  logos: React.ReactNode;
  /** The nav items to display on the right side of the nav. */
  navItems: React.ReactNode;
  /** The link icons to display to the right of the nav items. */
  linkIcons: React.ReactNode;
  className?: string;
};

export type RadiusNavProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavExtendedProps>;

export type RadiusNavComponent = <C extends React.ElementType = 'nav'>(
  props: RadiusNavProps<C>
) => React.ReactElement | null;
