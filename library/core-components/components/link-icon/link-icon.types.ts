import { CSSProp, RadiusTokenSubjects } from '@rangle/radius-foundations';
import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusLinkIconExtendedProps = {
  /** The icon to display */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** The size of the icon */
  size: CSSProp<'sizing', RadiusTokenSubjects, 'component'>;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** The class name to apply to the component */
  className?: string;
};

export type RadiusLinkIconProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusLinkIconExtendedProps>;

export type RadiusLinkIconComponent = <C extends React.ElementType = 'a'>(
  props: RadiusLinkIconProps<C>
) => React.ReactElement | null;
