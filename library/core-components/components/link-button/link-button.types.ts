import { CSSProp } from '@rangle/radius-foundations';
import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusLinkButtonExtendedProps = {
  /** The icon to display */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** The size of the icon */
  size: CSSProp<'sizing', 'component'>;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** The optional icon to display to the right of the content */
  iconRight?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** The class name to apply to the component */
  className?: string;
};

export type RadiusLinkButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusLinkButtonExtendedProps>;

export type RadiusLinkButtonComponent = <C extends React.ElementType = 'a'>(
  props: RadiusLinkButtonProps<C>
) => React.ReactElement | null;
