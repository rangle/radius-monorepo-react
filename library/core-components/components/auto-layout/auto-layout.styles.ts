import { renderCSSProp, css } from '../../utils';

import { RadiusAutoLayout } from './auto-layout';
import {
  mapAlignments,
  mapStrokeAlign,
  AutolayoutSize,
  Size,
  HorizontalConstraint,
  VerticalConstraint,
} from './auto-layout.types';

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
  x = 0 as Size,
  y = 0 as Size,
  horizontalConstraint = 'left' as HorizontalConstraint,
  verticalConstraint = 'top' as VerticalConstraint
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

/** When no item spacing is specified, figma defaults to 10px */
const FIGMA_DEFAULT_SPACING = '10px';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusAutoLayout>,
  | 'direction'
  | 'space'
  | 'clippedContent'
  | 'alignment'
  | 'width'
  | 'height'
  | 'padding'
  | 'opacity'
  | 'fill'
  | 'stroke'
  | 'strokeWidth'
  | 'strokeAlign'
  | 'cornerRadius'
  | 'isParent'
  | 'absolutePosition'
  | 'x'
  | 'y'
  | 'horizontalConstraint'
  | 'verticalConstraint'
  | 'dropShadow'
  | 'innerShadow'
  | 'layerBlur'
  | 'backgroundBlur'
>;

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
}: StyleProps) => {
  return css`
    display: flex;
    margin: 0;
    box-sizing: ${mapStrokeAlign[strokeAlign || 'inside']};
    align-items: ${mapAlignments[alignment || 'top']};
    width: ${getSize(width)};
    height: ${getSize(height)};

    ${isParent ? 'position: relative;' : ''}
    ${absolutePosition ? 'position: absolute;' : ''}
    ${direction
      ? `flex-direction: ${direction === 'horizontal' ? 'row' : 'column'}`
      : ''};
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
    ${cornerRadius ? `border-radius: ${renderCSSProp(cornerRadius)}` : ''}
    ${x !== undefined || y !== undefined
      ? setPosition(x, y, horizontalConstraint, verticalConstraint)
      : ''}
    ${dropShadow ? `box-shadow: ${renderCSSProp(dropShadow)};` : ''}
    ${innerShadow ? `box-shadow: inset ${renderCSSProp(innerShadow)};` : ''}
    ${layerBlur ? `filter: blur(${getCssValue(layerBlur)});` : ''}
    ${backgroundBlur
      ? `backdrop-filter: blur(${getCssValue(backgroundBlur)});`
      : ''}
  `;
};
