import {
  OmitPolymorphicProp,
  PolymorphicComponentPropWithRef,
} from '../../utils';
import { RadiusButtonProps } from '../button/button.types';
import { RadiusInlineLinkProps } from '../inline-link/inline-link.types';
import { RadiusLinkButtonProps } from '../link-button/link-button.types';
import { RadiusLinkIconProps } from '../link-icon/link-icon.types';

export type RadiusFooterExtendedProps = {
  className?: string;
  logo: React.ReactNode;
  pageLinks: Array<RadiusLinkButtonProps<React.ElementType>>;
  inquiriesHeader: string;
  inquiriesLinks: Array<
    OmitPolymorphicProp<RadiusInlineLinkProps<React.ElementType>, 'typography'>
  >;
  newsLetterHeader: string;
  newsLetterLinks: Array<RadiusLinkButtonProps<React.ElementType>>;
  copyright: string;
  privacyPolicy: OmitPolymorphicProp<
    RadiusInlineLinkProps<React.ElementType>,
    'typography'
  >;
  connectHeader: string;
  connectLinkIcons: Array<RadiusLinkIconProps<React.ElementType>>;
  connectButtonProps: OmitPolymorphicProp<
    RadiusButtonProps<React.ElementType>,
    'variant'
  >;
};

export type RadiusFooterProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusFooterExtendedProps>;

export type RadiusFooterComponent = <C extends React.ElementType = 'footer'>(
  props: RadiusFooterProps<C>
) => React.ReactElement | null;
