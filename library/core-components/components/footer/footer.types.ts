import {
  OmitPolymorphicProp,
  PolymorphicComponentPropWithRef,
} from '../../utils';
import { RadiusButtonProps } from '../button/button.types';
import { RadiusInlineLinkProps } from '../inline-link/inline-link.types';
import { RadiusLinkButtonProps } from '../link-button/link-button.types';
import { RadiusLinkIconProps } from '../link-icon/link-icon.types';

export type RadiusFooterExtendedProps = {
  /** The company logo to display. Accepts any valid ReactNode */
  logo: React.ReactNode;
  /**
   * The page links to display in the first column.
   * Takes an array of objects, containing the props for each link (see the
   * `RadiusLinkButton` component for the available props).
   *
   * @example
   * ```
   * pageLinks={[
   *  { children: 'Link 1', href: '#', iconRight: ArrowRight },
   *  { children: 'Link 2', href: '#', iconRight: ArrowRight },
   * ]}
   * ```
   *
   * Since the `RadiusLinkButton` component is polymorphic, they can be rendered
   * as any element or component using the `as` prop like (for example) a React
   * Router Link:
   *
   * @example
   * ```
   * pageLinks={[
   * { children: 'Link 1', as: Link, to: '/link-1', iconRight: ArrowRight },
   * { children: 'Link 2', as: Link, to: '/link-2', iconRight: ArrowRight },
   * ]}
   * ```
   * */
  pageLinks: Array<RadiusLinkButtonProps<React.ElementType>>;
  /** The header text for the `General Inquiries` section */
  inquiriesHeader: string;
  /**
   * The links to display in the `General Inquiries` section in the second column.
   * Takes an array of objects, containing the props for each link (see the
   * `RadiusInlineLink` component for the available props). Note that the
   * `typography` prop is not required here as it is automatically set within
   * the footer component.
   *
   * @example
   * ```
   * inquiriesLinks={[
   *  { children: 'Link 1', href: '#' },
   *  { children: 'Link 2', href: '#' },
   * ]}
   * ```
   *
   * Since the `RadiusInlineLink` component is polymorphic, they can be rendered
   * as any element or component using the `as` prop like (for example) a React
   * Router Link:
   *
   * @example
   * ```
   * inquiriesLinks={[
   *  { children: 'Link 1', as: Link, to: '/link-1' },
   *  { children: 'Link 2', as: Link, to: '/link-2' },
   * ]}
   * ```
   * */
  inquiriesLinks: Array<
    OmitPolymorphicProp<RadiusInlineLinkProps<React.ElementType>, 'typography'>
  >;
  /** The header text for the `Newsletter` section in the third column */
  newsLetterHeader: string;
  /**
   * The links to display in the `Newsletter` section in the second column.
   * Takes an array of objects, containing the props for each link (see the
   * `RadiusLinkButton` component for the available props).
   *
   * @example
   * ```
   * newsLetterLinks={[
   *  { children: 'Link 1', href: '#', iconRight: ArrowRight },
   *  { children: 'Link 2', href: '#', iconRight: ArrowRight },
   * ]}
   * ```
   *
   * Since the `RadiusLinkButton` component is polymorphic, they can be rendered
   * as any element or component using the `as` prop like (for example) a React
   * Router Link:
   *
   * @example
   * ```
   * newsLetterLinks={[
   *  { children: 'Link 1', as: Link, to: '/link-1', iconRight: ArrowRight },
   *  { children: 'Link 2', as: Link, to: '/link-2', iconRight: ArrowRight },
   * ]}
   * ```
   * */
  newsLetterLinks: Array<RadiusLinkButtonProps<React.ElementType>>;
  /** The text for the copyright notice at the bottom of the footer */
  copyright: string;
  /**
   * The link to the privacy policy page at the bottom of the footer.
   * Takes an object containing the props for the link (see the
   * `RadiusInlineLink` component for the available props). Note that the
   * `typography` prop is not required here as it is automatically set within
   * the footer component.
   *
   * @example
   * ```
   * privacyPolicy={{ children: 'Privacy Policy', href: '#' }}
   * ```
   *
   * Since the privacy `RadiusInlineLink` component is polymorphic, it can be
   * rendered as any element or component using the `as` prop like (for example)
   * a React Router Link:
   *
   * @example
   * ```
   * privacyPolicy={{ children: 'Privacy Policy', as: Link, to: '/privacy-policy' }}
   * ```
   * */
  privacyPolicy: OmitPolymorphicProp<
    RadiusInlineLinkProps<React.ElementType>,
    'typography'
  >;
  /**
   * The social link icons to display in the Contact section.
   * Takes an array of objects, containing the props for each link (see the
   * `RadiusLinkIcon` component for the available props). Note that the
   * `size` prop is not required here as it is automatically set within
   * the footer component.
   *
   * @example
   * ```
   * connectLinkIcons={[
   *  { icon: Facebook, href: '#', 'aria-label': 'Descriptive text' },
   *  { icon: Twitter, href: '#', 'aria-label': 'Descriptive text' },
   * ]}
   * ```
   *
   * Since the `RadiusLinkIcon` component is polymorphic, they can be rendered
   * as any element or component using the `as` prop like (for example) a React
   * Router Link:
   *
   * @example
   * ```
   * connectLinkIcons={[
   *  { icon: Facebook, as: Link, to: '/facebook', 'aria-label': 'Descriptive text' },
   *  { icon: Twitter, as: Link, to: '/twitter', 'aria-label': 'Descriptive text' },
   * ]}
   * ```
   * */
  connectLinkIcons: Array<
    OmitPolymorphicProp<RadiusLinkIconProps<React.ElementType>, 'size'>
  >;
  /**
   * The button to display in the Contact section.
   * Takes an object containing the props for the button (see the
   * `RadiusButton` component for the available props). Note that the
   * `variant` prop is not required here as it is automatically set within
   * the footer component.
   *
   * @example
   * ```
   * connectButtonProps={{ children: 'Contact Us', onClick: () => {}, iconRight: ArrowRight }}
   * ```
   *
   * Since the `RadiusButton` component is polymorphic, it can be rendered
   * as any element or component using the `as` prop like (for example)
   * a React Router Link:
   *
   * @example
   * ```
   * connectButtonProps={{ children: 'Contact Us', as: Link, to: '/contact-us', iconRight: ArrowRight }}
   * ```
   * */
  connectButtonProps: OmitPolymorphicProp<
    RadiusButtonProps<React.ElementType>,
    'variant'
  >;
  /** Optional className to apply to the root element */
  className?: string;
};

export type RadiusFooterProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusFooterExtendedProps>;

export type RadiusFooterComponent = <C extends React.ElementType = 'footer'>(
  props: RadiusFooterProps<C>
) => React.ReactElement | null;
