import { CSSProp } from '@rangle/radius-foundations/generated/design-tokens.types';

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

export type AutoLayoutProps = {
  isParent?: boolean;
  absolutePosition?: boolean;
  direction?: 'horizontal' | 'vertical';
  space?: Size | 'auto'; //number is considered fixed auto is justify-content: space-between;
  clippedContent?: boolean;
  alignment?: keyof typeof mapAlignments;
  width?: AutolayoutSize;
  height?: AutolayoutSize;

  padding?: Padding;
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

type FullPadding = {
  top?: Size;
  left?: Size;
  bottom?: Size;
  right?: Size;
};
type VerticalHorizontalPadding = {
  vertical?: Size;
  horizontal?: Size;
};
export type Padding = Size | FullPadding | VerticalHorizontalPadding;
