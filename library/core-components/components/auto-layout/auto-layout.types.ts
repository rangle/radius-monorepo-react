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
  /** Used in conjunction with absolutePosition, uses and sets position: 'relative' */
  isParent?: boolean;
  /** Used in conjunction with isParent, uses and sets position: absolute */
  absolutePosition?: boolean;
  /** The direction of the layout, uses flex row or column */
  direction?: CSSProp<'direction'> | 'horizontal' | 'vertical';
  /** The space between the children, can be number (gap) or auto (justify-content: space-between;) */
  space?: CSSProp<'spacing'> | 'auto'; // auto = justify-content: space-between;
  /** Whether the content should be clipped or not, uses overflow: hidden */
  clippedContent?: boolean;
  /** The alignment of the layout, uses align-items */
  alignment?: keyof typeof mapAlignments;
  /** The width of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%) */
  width?: AutolayoutSize;
  /** The height of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%) */
  height?: AutolayoutSize;

  /** The padding around the content, can be number, object of vertical and horizontal, or object of top, right, bottom, left */
  padding?: CSSProp<'spacing'>;
  /** Opacity of the component. A number between 0 and 1 */
  opacity?: CSSProp; // TODO: narrow this type

  /** Used in conjunction with absolutePosition, sets left or right depending on horizontal constraint. Does not act the same as Figma */
  x?: Size;
  /** Used in conjunction with absolutePosition, sets top or bottom depending on verticalConstraint. Does not act the same as Figma */
  y?: Size;
  /** Used in conjunction with absolutePosition, sets left or right. We are missing functionality from figma */
  horizontalConstraint?: HorizontalConstraint;
  /** Used in conjunction with absolutePosition, sets top or bottom. We are missing functionality from figma */
  verticalConstraint?: VerticalConstraint;

  /** Background colour. Color can be assigned as hex or rgba(0-255,0-255,0-255,0-1) */
  fill?: CSSProp<'color'>;
  /** Border colour. We are currently missing dashed borders */
  stroke?: CSSProp<'color'>;
  /** Border width, can be number or object of top, right, bottom, left */
  strokeWidth?: CSSProp; // TODO: narrow this type
  /** Border alignment, inside or outside. We are missing middle alignment */
  strokeAlign?: StrokeAlign;
  // strokeSide?: StrokeSide;
  // strokeCap?: StrokeCap;

  /** Border radius, can be number or object of topLeft, topRight, bottomRight, bottomLeft */
  cornerRadius?: CSSProp; // TODO: narrow this type

  // effects
  dropShadow?: DropShadow;
  innerShadow?: InnerShadow;
  layerBlur?: Blur;
  backgroundBlur?: Blur;

  // blendMode?: BlendMode; // not needed

  /** Whether this AutoLayout should behave as a grid */
  grid?: boolean;
  /** The number of columns this item should take up in a parent's grid */
  gridColSpan?: CSSProp<'other'>;
  /** The starting column position of this item in a parent's grid */
  gridColStart?: CSSProp<'other'>;
  /** The ending column position of this item in a parent's grid */
  gridColEnd?: CSSProp<'other'>;
  /** The number of rows this item should take up in a parent's grid */
  gridRowSpan?: CSSProp<'other'>;
  /** The starting row position of this item in a parent's grid */
  gridRowStart?: CSSProp<'other'>;
  /** The ending row position of this item in a parent's grid */
  gridRowEnd?: CSSProp<'other'>;
};

export type AutoLayoutProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, AutoLayoutExtendedProps>;

export type AutoLayoutComponent = <C extends React.ElementType = 'div'>(
  props: AutoLayoutProps<C>
) => React.ReactElement | null;
