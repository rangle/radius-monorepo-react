import { PolymorphicComponentPropWithRef } from '../../utils';
import {
  RadiusLinkIconExtendedProps,
  RadiusLinkIconProps,
} from '../link-icon/link-icon.types';
import { RadiusNavItemProps } from '../nav-item/nav-item.types';

export type RadiusNavExtendedProps = {
  /**
   * The company logos to display on the left side of the nav. Spacing between
   * them is automatically applied - if passing multiple elements, they should
   * be wrapped in a Fragment (`<></>`), or passed as an array.
   */
  logos: React.ReactNode;
  // logos: React.ReactElement<typeof RadiusLinkIcon>[];
  /** The nav items to display on the right side of the nav. */
  navItems: React.ReactNode;
  // navItems: Array<RadiusNavItemProps<React.ElementType>>;
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
   *  { icon: EventNote, href: '#' },
   * ]}
   * ```
   *
   * Since the link icons are polymorphic, they can be rendered as any element
   * or component using the `as` prop, like (for example) as React Router
   * components:
   *
   * @example
   * ```
   * linkIcons={[
   *  { icon: Github, as: Link, to: '#' },
   *  { icon: Figma, as: Link, to: '#' },
   *  { icon: EventNote, as: Link, to: '#' },
   * ]}
   * ```
   */
  // linkIcons: React.ReactNode;
  // linkIcons: Array<React.ReactElement<typeof RadiusLinkIcon>>;
  // ? Can the polymorphic type be inferred somehow?
  linkIcons: Array<OmitSize<RadiusLinkIconProps<React.ElementType>>>;
  // linkIcons: Array<RadiusLinkIconExtendedProps>;

  /** The social icons to display at the bottom of the mobile nav */
  socials: Array<Omit<RadiusLinkIconProps<React.ElementType>, 'size'>>;
  className?: string;
};

export type RadiusNavProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusNavExtendedProps>;

export type RadiusNavComponent = <C extends React.ElementType = 'nav'>(
  props: RadiusNavProps<C>
) => React.ReactElement | null;

/** Utility to omit the `size` prop from complex polymorphic LinkIcon prop type */
type OmitSize<T extends RadiusLinkIconProps<React.ElementType>> = {
  [P in keyof T as P extends 'size' ? never : P]: T[P];
};

type IconProps<C = React.ElementType> = C extends React.ElementType
  ? {
      as: C;
      size: number;
    } & React.ComponentProps<C>
  : never;

type IconList = ReadonlyArray<IconProps>;

type PropsOfComponent<X extends React.ElementType, P> = {
  as: X;
} & React.ComponentProps<React.ElementType<P>>;

type XIconProps<X = React.ElementType> = IconProps<infer P>
  ? PropsOfComponent<X, P>
  : never;

const x: XIconProps = {
  as: 'a',
  href: '',
  onClick: ''
};

// const iconlist: IconList = [
//   { size:  }
// ]
