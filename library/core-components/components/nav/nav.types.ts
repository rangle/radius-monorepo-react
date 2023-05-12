import {
  OmitPolymorphicProp,
  PolymorphicComponentPropWithRef,
} from '../../utils';
import { RadiusLinkIconProps } from '../link-icon/link-icon.types';

export type RadiusNavExtendedProps = {
  /**
   * The company logos to display on the left side of the nav. Spacing between
   * them is automatically applied - if passing multiple elements, they should
   * be wrapped in a Fragment (`<></>`), or passed as an array.
   */
  logos: React.ReactNode;
  /** The nav items to display on the right side of the nav. */
  navItems: React.ReactNode;
  /**
   * The link icons to display to the right of the nav items.
   * Takes an array of objects, containing the props for each link icon.
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
  // linkIcons: Array<RadiusLinkIconExtendedProps>;

  /**
   * The social icons to display at the bottom of the mobile nav
   * Takes an array of objects, containing the props for each link icon.
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
  className?: string;
};

export type RadiusNavProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavExtendedProps>;

export type RadiusNavComponent = <C extends React.ElementType = 'nav'>(
  props: RadiusNavProps<C>
) => React.ReactElement | null;
