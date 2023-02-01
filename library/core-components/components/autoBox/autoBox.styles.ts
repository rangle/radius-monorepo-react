import { css } from '@emotion/css';
import './autoBox.tokens.css';

import {
  AutoLayoutProps,
  mapAlignments,
  mapStrokeAlign,
  AutolayoutSize,
  Size,
  Padding,
  Color,
  StrokeWidth,
  CornerRadius,
  HorizontalConstraint,
  VerticalConstraint,
  Effect,
} from './autoBox.types';

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

export const getPadding = (padding?: Padding) => {
  if (typeof padding !== 'object' && padding !== undefined)
    return `${getSize(padding)}`;
  if (typeof padding === 'object') {
    if ('vertical' in padding || 'horizontal' in padding) {
      return `${getCssValue(padding.vertical)} ${getCssValue(
        padding.horizontal
      )}`;
    }
    if (
      'top' in padding ||
      'right' in padding ||
      'bottom' in padding ||
      'left' in padding
    ) {
      return `${getCssValue(padding?.top)} ${getCssValue(
        padding.right
      )} ${getCssValue(padding.bottom)} ${getCssValue(padding.left)}`;
    }
  }
  return '0px';
};

export const getColor = (color?: Color) => {
  if (typeof color === 'string') return color;
  if (typeof color === 'object')
    return `rgba(${color.r},${color.g},${color.b},${
      color.a > 1 ? color.a / 100 : color.a
    })`;
  return 'transparent';
};

export const getStrokeWidth = (strokeWidth: StrokeWidth) => {
  if (typeof strokeWidth !== 'object')
    return `border-width: ${getCssValue(strokeWidth)};`;
  return `border-width: ${getCssValue(strokeWidth.top)} ${getCssValue(
    strokeWidth.right
  )} ${getCssValue(strokeWidth.bottom)} ${getCssValue(strokeWidth.left)};`;
};

export const getCornerRadius = (cornerRadius: CornerRadius) => {
  if (typeof cornerRadius !== 'object')
    return `border-radius: ${getCssValue(cornerRadius)};`;
  return `border-radius: ${getCssValue(cornerRadius.topLeft)} ${getCssValue(
    cornerRadius.topRight
  )} ${getCssValue(cornerRadius.bottomRight)} ${getCssValue(
    cornerRadius.bottomLeft
  )};`;
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

export const getEffects = (effect: Effect | Effect[]) => {
  const effects = Array.isArray(effect) ? effect : [effect];
  return effects.reduce((acc: string, effect: Effect) => {
    switch (effect.type) {
      case 'drop-shadow':
        return `${acc} box-shadow: ${getCssValue(
          effect.offset[0]
        )} ${getCssValue(effect.offset[1])} ${getCssValue(
          effect.blur
        )} ${getColor(effect.color)};`;
      case 'inner-shadow':
        return `${acc} box-shadow: inset ${getCssValue(
          effect.offset[0]
        )} ${getCssValue(effect.offset[1])} ${getCssValue(
          effect.blur
        )} ${getColor(effect.color)};`;
      case 'layer-blur':
        return `${acc} filter: blur(${getCssValue(effect.blur)});`;
      case 'background-blur':
        return `${acc} backdrop-filter: blur(${getCssValue(effect.blur)});`;
    }
  }, '' as string);
};

// colours alpha can be 0-1 or 0-100
// strokeAlign is missing middle
// to add: strokeSide
// to add: strokeCap
// lines are different than borders (borders don't have ends)
// Should we add type for using em or rem? or vw or vh? What should be our suggested unit?
export const getStyles = <T extends AutoLayoutProps>({
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
  effect,
}: T) => {
  return css`
    display: flex;
    margin: 0;

    ${isParent ? 'position: relative;' : ''}
    ${absolutePosition ? 'position: absolute;' : ''}
    ${direction
      ? `flex-direction: ${direction === 'horizontal' ? 'row' : 'column'}`
      : ''};
    ${space === 'auto'
      ? 'justify-content: space-between;'
      : `gap: ${getSize(space || 10)};`};
    ${clippedContent ? 'overflow: hidden;' : ''};
    align-items: ${mapAlignments[alignment || 'top']};

    width: ${getSize(width)};
    height: ${getSize(height)};

    ${padding ? `padding: ${getPadding(padding)}` : ''};

    ${opacity !== undefined ? `opacity: ${opacity};` : ''}
    ${fill ? `background-color: ${getColor(fill)};` : ''}

    ${stroke || strokeWidth ? 'border-style: solid;' : ''}
    ${stroke ? `border-color: ${getColor(stroke)};` : ''}
    ${strokeWidth ? getStrokeWidth(strokeWidth) : ''}
    ${strokeAlign ? `box-sizing: ${mapStrokeAlign[strokeAlign]};` : ''}
    ${cornerRadius ? getCornerRadius(cornerRadius) : ''}
    ${x !== undefined || y !== undefined
      ? setPosition(x, y, horizontalConstraint, verticalConstraint)
      : ''}

    ${effect ? getEffects(effect) : ''}
  `;
};
