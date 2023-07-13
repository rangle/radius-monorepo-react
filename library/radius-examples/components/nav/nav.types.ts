import {
  OmitPolymorphicProp,
  PolymorphicComponentPropWithRef,
} from '@rangle/radius-shared/utils';
import { RadiusLinkIconProps } from '../link-icon/link-icon.types';
import { RadiusNavItemProps } from '../nav-item/nav-item.types';

export type RadiusNavExtendedProps = {
  /**
   * The company logos to display on the left side of the nav. Spacing between
   * them is automatically applied - if passing multiple elements, they should
   * be wrapped in a Fragment (`<></>`), or passed as an array.
   */
  logos: React.ReactNode;
  /**
   * The nav items to display on the right side of the nav.
   * Takes an array of objects, containing the props for each nav item (see the
   * `RadiusNavItem` component for the available props).
   *
   * @example
   * ```
   * navItems={[
   *   { children: 'Menu Item 1', href: '#', selected: true },
   *   { children: 'Menu Item 2', href: '#' }
   * ]}
   * ```
   *
   * Since the nav items are polymorphic, they can be rendered as any element
   * or component using the `as` prop, like (for example) a React Router Link:
   *
   * @example
   * ```
   * navItems={[
   *   { children: 'Menu Item 1', as: Link, to: '/menu-item-1', selected: true },
   *   { children: 'Menu Item 2', as: Link, to: '/menu-item-2' }
   * ]}
   * ```
   */
  navItems: Array<RadiusNavItemProps<React.ElementType>>;
  /**
   * The link icons to display to the right of the nav items.
   * Takes an array of objects, containing the props for each link icon (see the
   * `RadiusLinkIcon` component for the available props).
   *
   * Note: the `size` prop is not required here as it is automatically set
   * within the nav component.
   *
   * @example
   * ```
   * linkIcons={[
   *  { icon: Github, href: '#' },
   *  { icon: Figma, href: '#' },
   * ]}
   * ```
   *
   * Since the link icons are polymorphic, they can be rendered as any element
   * or component using the `as` prop, like a button:
   *
   * @example
   * ```
   * linkIcons={[
   *  { icon: Github, as: 'button', onClick: callbackFn },
   *  { icon: Figma, as: 'button', onClick: callbackFn },
   * ]}
   * ```
   */
  // TODO: see if we can infer the Component type from the `as` prop
  linkIcons: Array<
    OmitPolymorphicProp<RadiusLinkIconProps<React.ElementType>, 'size'>
  >;

  /**
   * The social icons to display at the bottom of the mobile nav
   * Takes an array of objects, containing the props for each link icon (see the
   * `RadiusLinkIcon` component for the available props).
   * 
   * Note: the `size` prop is not required here as it is automatically set
   * within the nav component.
   *
   * @example
   * ```
   * socials={[
        { icon: Instagram, href: '#' },
        { icon: LinkedIn, href: '#' },
      ]}
   * ```
   *
   * Since the link icons are polymorphic, they can be rendered as any element
   * or component using the `as` prop, like a button:
   *
   * @example
   * ```
   * linkIcons={[
        { icon: Instagram, as: 'button', onClick: callbackFn },
        { icon: LinkedIn, as: 'button', onClick: callbackFn },
      ]}
   * ```
   * */
  // TODO: see if we can infer the Component type from the `as` prop
  socials: Array<
    OmitPolymorphicProp<RadiusLinkIconProps<React.ElementType>, 'size'>
  >;
  /** Whether to display a shadow */
  hasShadow?: boolean;
  className?: string;
};

export type RadiusNavProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavExtendedProps>;

export type RadiusNavComponent = <C extends React.ElementType = 'nav'>(
  props: RadiusNavProps<C>
) => React.ReactElement | null;
