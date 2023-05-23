import { CSSProp, RadiusTokenSubjects } from '@rangle/radius-foundations';
import { PolymorphicComponentPropWithRef } from '../../utils';

export type RadiusInlineLinkExtendedProps = {
  /** The label */
  children: React.ReactNode;
  /** The typography of the icon. Expects an object containing tokens
   * representing the individual typography properties (found in
   * `library/foundations/generated/design-tokens.constants.ts`)
   */
  typography: Record<
    string,
    CSSProp<'typography', RadiusTokenSubjects, 'component'>
  >;
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
