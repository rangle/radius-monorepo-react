import { CSSProp } from '@rangle/radius-foundations/generated/design-tokens.types';
import { PolymorphicComponentPropWithRef } from '../../utils';

export const mapAlignments = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  left: 'flex-start',
  right: 'flex-end',
};

export const mapStrokeAlign = {
  inside: 'border-box',
  outside: 'content-box',
  // center: 'content-box',
};

export type BlendMode =
  | 'normal'
  | 'darken'
  | 'multiply'
  | 'color-burn'
  | 'lighten'
  | 'screen'
  | 'color-dodge'
  | 'overlay'
  | 'soft-light'
  | 'hard-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

// effects
// TODO: narrow these types (in generator)
export type DropShadow = CSSProp;
export type InnerShadow = CSSProp;
export type Blur = Size;

export type Size = number | `${number}px` | `${number}%` | `var(${string})`;
export type AutolayoutSize = Size | 'fill-parent' | 'hug-contents';

type StrokeAlign = keyof typeof mapStrokeAlign;
export type StrokeCap =
  | 'none'
  | 'round'
  | 'square'
  | 'arrow-lines'
  | 'arrow-equilateral';

export type HorizontalConstraint =
  | 'left'
  | 'right'
  | 'left and right'
  | 'center'
  | 'scale';
export type VerticalConstraint =
  | 'top'
  | 'bottom'
  | 'top and bottom'
  | 'center'
  | 'scale';

export type AutoLayoutExtendedProps = {
  isParent?: boolean;
  absolutePosition?: boolean;
  direction?: 'horizontal' | 'vertical';
  space?: CSSProp<'spacing'> | 'auto'; // auto = justify-content: space-between;
  clippedContent?: boolean;
  alignment?: keyof typeof mapAlignments;
  width?: AutolayoutSize;
  height?: AutolayoutSize;

  padding?: CSSProp<'spacing'>;
  opacity?: CSSProp; // TODO: narrow this type

  x?: Size;
  y?: Size;
  horizontalConstraint?: HorizontalConstraint;
  verticalConstraint?: VerticalConstraint;

  fill?: CSSProp<'color'>;
  stroke?: CSSProp<'color'>;
  strokeWidth?: CSSProp; // TODO: narrow this type
  strokeAlign?: StrokeAlign;
  // strokeSide?: StrokeSide;
  // strokeCap?: StrokeCap;

  cornerRadius?: CSSProp; // TODO: narrow this type

  // effects
  dropShadow?: DropShadow;
  innerShadow?: InnerShadow;
  layerBlur?: Blur;
  backgroundBlur?: Blur;

  // blendMode?: BlendMode; // not needed
};

export type AutoLayoutProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, AutoLayoutExtendedProps>;

export type AutoLayoutComponent = <C extends React.ElementType = 'div'>(
  props: AutoLayoutProps<C>
) => React.ReactElement | null;
