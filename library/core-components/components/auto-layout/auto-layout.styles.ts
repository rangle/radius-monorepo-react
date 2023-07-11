import { CSSExpression } from '@rangle/radius-foundations';
import { renderCSSProp, css, RequireAndPick } from '../../../../shared/utils';

import {
  mapAlignments,
  mapStrokeAlign,
  AutolayoutSize,
  Size,
  HorizontalConstraint,
  VerticalConstraint,
} from './auto-layout.types';
import { AutoLayoutExtendedProps } from './auto-layout.types';
import { mediaQueries } from '../../../../shared/constants';

export const getSize = (size?: AutolayoutSize) => {
  if (size === 'fill-parent') return '100%';
  if (size === 'hug-contents' || size === undefined) return 'auto';
  return getCssValue(size);
};

export const getCssValue = (size?: Size) => {
  if (typeof size === 'number') return `${size}px`;
  if (size) return size;
  return '0px';
};

export const setPosition = (
  x: Size = 0,
  y: Size = 0,
  horizontalConstraint: HorizontalConstraint,
  verticalConstraint: VerticalConstraint
) => {
  let out = '';
  switch (horizontalConstraint) {
    case 'left':
      out += `left: ${getSize(x)};`;
      break;
    case 'right':
      out += `right: ${getSize(x)};`;
      break;
  }
  switch (verticalConstraint) {
    case 'top':
      out += `top: ${getSize(y)};`;
      break;
    case 'bottom':
      out += `bottom: ${getSize(y)};`;
      break;
  }

  return out;
};

/**
 * Function that returns the `box-shadow` property given the dropShadow and
 * innerShadow props.
 */
const getShadow = (
  dropShadow: StyleProps['dropShadow'],
  innerShadow: StyleProps['innerShadow']
) => {
  const shadows: CSSExpression[] = [];
  if (dropShadow) shadows.push(renderCSSProp(dropShadow));
  if (innerShadow) shadows.push(`inset ${renderCSSProp(innerShadow)}`);
  return shadows.length ? shadows.join(', ') : undefined;
};

/** When no item spacing is specified, figma defaults to 10px */
const FIGMA_DEFAULT_SPACING = '10px';

/**
 * The component props that are used to generate the styles. The required props
 * are typically ones that we know are provided a default value by the component
 */
export type StyleProps = Pick<
  AutoLayoutExtendedProps,
  | 'direction'
  | 'space'
  | 'padding'
  | 'opacity'
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'strokeAlign'
  | 'cornerRadius'
  | 'x'
  | 'y'
  | 'dropShadow'
  | 'innerShadow'
  | 'layerBlur'
  | 'grid'
  | 'gridColSpan'
  | 'gridColEnd'
  | 'gridColStart'
  | 'gridRowSpan'
  | 'gridRowEnd'
  | 'gridRowStart'
  | 'backgroundBlur'
> &
  RequireAndPick<
    AutoLayoutExtendedProps,
    | 'alignment'
    | 'width'
    | 'height'
    | 'clippedContent'
    | 'isParent'
    | 'absolutePosition'
    | 'horizontalConstraint'
    | 'verticalConstraint'
  >;

/** The number of grid columns at each breakpoint */
// TODO: This should probably be generated by the importer
const gridColumns = {
  desktop: 12,
  tablet: 8,
  mobile: 4,
};

const gridStyles = `
  display: grid;
  grid-auto-rows: min-content;
  grid-template-columns: repeat(${gridColumns.desktop}, 1fr);
  // TODO: this gap should probably be generated/tokenized
  column-gap: 24px;

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(${gridColumns.tablet}, 1fr);
  }

  ${mediaQueries.mobile} {
    grid-template-columns: repeat(${gridColumns.mobile}, 1fr);
  }
`;

// colours alpha can be 0-1 or 0-100
// strokeAlign is missing middle
// to add: strokeSide
// to add: strokeCap
// lines are different than borders (borders don't have ends)
// Should we add type for using em or rem? or vw or vh? What should be our suggested unit?
export const useStyles = ({
  direction, //flex-direction
  space, // is either auto or number or zero
  clippedContent, //overflow:hidden
  alignment, //align-items
  width, //width
  height, //height
  padding, //padding
  opacity,
  fill, //background-color
  stroke,
  strokeWidth,
  strokeAlign,
  cornerRadius,
  isParent,
  absolutePosition,
  x,
  y,
  horizontalConstraint,
  verticalConstraint,
  dropShadow,
  innerShadow,
  layerBlur,
  backgroundBlur,
  grid,
  gridColSpan,
  gridColEnd,
  gridColStart,
  gridRowSpan,
  gridRowEnd,
  gridRowStart,
}: StyleProps) => {
  return css`
    display: flex;
    flex-direction: ${direction === 'vertical'
      ? 'column'
      : direction === 'horizontal'
      ? 'row'
      : renderCSSProp(direction)};
    margin: 0;
    box-sizing: ${mapStrokeAlign[strokeAlign || 'inside']};
    align-items: ${mapAlignments[alignment]};
    width: ${getSize(width)};
    height: ${getSize(height)};

    ${isParent ? 'position: relative;' : ''}
    ${absolutePosition ? 'position: absolute;' : ''}
    ${space === 'auto'
      ? 'justify-content: space-between;'
      : `gap: ${renderCSSProp(space ?? { css: FIGMA_DEFAULT_SPACING })};`};
    ${clippedContent ? 'overflow: hidden;' : ''};
    ${padding ? `padding: ${renderCSSProp(padding)}` : ''};
    ${opacity !== undefined ? `opacity: ${renderCSSProp(opacity)};` : ''}
    ${fill ? `background-color: ${renderCSSProp(fill)};` : ''}
    ${stroke || strokeWidth ? 'border-style: solid;' : ''}
    ${stroke ? `border-color: ${renderCSSProp(stroke)};` : ''}
    ${strokeWidth ? `border-width: ${renderCSSProp(strokeWidth)};` : ''}
    ${cornerRadius ? `border-radius: ${renderCSSProp(cornerRadius)};` : ''}
    ${x !== undefined || y !== undefined
      ? setPosition(x, y, horizontalConstraint, verticalConstraint)
      : ''}
    box-shadow: ${getShadow(dropShadow, innerShadow)};
    ${layerBlur ? `filter: blur(${getCssValue(layerBlur)});` : ''}
    ${backgroundBlur
      ? `backdrop-filter: blur(${getCssValue(backgroundBlur)});`
      : ''}

    ${grid ? gridStyles : ''}
    ${gridColSpan ? `grid-column: span ${renderCSSProp(gridColSpan)};` : ''}
    ${gridColEnd ? `grid-column-end: ${renderCSSProp(gridColEnd)};` : ''}
    ${gridColStart ? `grid-column-start: ${renderCSSProp(gridColStart)};` : ''}
    ${gridRowSpan ? `grid-row: span ${renderCSSProp(gridRowSpan)};` : ''}
    ${gridRowEnd ? `grid-row-end: ${renderCSSProp(gridRowEnd)};` : ''}
    ${gridRowStart ? `grid-row-start: ${renderCSSProp(gridRowStart)};` : ''}
  `;
};
