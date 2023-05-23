import { CSSProp, RadiusTokenSubjects } from '@rangle/radius-foundations';
import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusInlineLinkExtendedProps = {
  /** The label */
  children: React.ReactNode;
  /** The size of the icon */
  size: CSSProp<'sizing', RadiusTokenSubjects, 'component'>;
  /** Whether the link is disabled */
  disabled?: boolean;
  /** The class name to apply to the component */
  className?: string;
};

export type RadiusInlineLinkProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, RadiusInlineLinkExtendedProps>;

export type RadiusInlineLinkComponent = <C extends React.ElementType = 'a'>(
  props: RadiusInlineLinkProps<C>
) => React.ReactElement | null;
