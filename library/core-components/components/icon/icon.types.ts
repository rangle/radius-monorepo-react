import { CSSProp } from '@rangle/radius-foundations';

export const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

type ComponentProps = {
  /** Mutually exclusive with `path` prop */
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Mutually exclusive with `component` prop */
  path?: never;
};

type PathProps = {
  /** Mutually exclusive with `path` prop */
  component?: never;
  /** Mutually exclusive with `component` prop */
  path: string;
};

/**
 * By using a union type of ComponentProps and PathProps, we can ensure that either `component` or `path`
 * is passed in, but not both, as they are mutually exclusive.
 *
 * @example
 * // Valid
 * <RadiusIcon component={icon} />
 * <RadiusIcon path={path} />
 *
 * // Invalid
 * <RadiusIcon component={icon} path={path} />
 * <RadiusIcon />
 */
type ExclusiveProps = ComponentProps | PathProps;

/** Custom props extending the functionality of the base svg component */
type RadiusIconExtendedProps = {
  /** Icon size */
  size?: keyof typeof ICON_SIZES;
  /** Icon color */
  fill?: CSSProp<'color'>;
  /** Custom class name to override styling if needed */
  className?: string;
} & ExclusiveProps;

/** The props to omit from the native svg tag (since we have our own implementations) */
type PropsToOmit = keyof RadiusIconExtendedProps;

/** The native react SVG attributes accepted as props */
type SVGProps = Omit<React.SVGAttributes<SVGElement>, PropsToOmit>;

export type RadiusIconProps = RadiusIconExtendedProps & SVGProps;
