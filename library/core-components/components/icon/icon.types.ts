import { CSSProp } from '@rangle/radius-foundations';

type ComponentProps = {
  /** The React SVG component to render. Mutually exclusive with `path` prop */
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** The path string to render as an SVG. Mutually exclusive with `component`
   * prop */
  path?: never;
};

type PathProps = {
  component?: never;
  path: string;
};

/**
 * By using a union type of ComponentProps and PathProps, we can ensure that
 * either `component` or `path` is passed in, but not both, as they are mutually
 * exclusive.
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
  /** Icon size. Will automatically set the `width` and `height` of the SVG */
  size: CSSProp<'sizing', 'semantic' | 'component'>;
  /** Icon fill color. Defaults to `currentColor` so that the icon will inherit
   * the color of the parent element */
  fill?: CSSProp<'color', 'component'>;
  /** Custom class name to override styling if needed */
  className?: string;
} & ExclusiveProps;

/** The props to omit from the native svg tag (since we have our own
 * implementations) */
type PropsToOmit = keyof RadiusIconExtendedProps;

/** The native react SVG attributes accepted as props */
type SVGProps = Omit<React.SVGAttributes<SVGElement>, PropsToOmit>;

export type RadiusIconProps = RadiusIconExtendedProps & SVGProps;
