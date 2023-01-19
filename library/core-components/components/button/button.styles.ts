import { css, CSSObject } from '@emotion/css';
import './button.tokens.css';
// Discrimitated unions are an excellent way to add type safety
// and self-documentation to your code -- even internal implementations
export type RadiusButtonSize = 'small' | 'medium' | 'large';
export type RadiusButtonStyleType =
  | 'filled'
  | 'filledFocus'
  | 'filledActive'
  | 'filledHover'
  | 'filledDisabled'
  | 'hollow'
  | 'hollowFocus'
  | 'hollowActive'
  | 'hollowHover'
  | 'hollowDisabled';
/** Props that affect the CSS of this component
 * this type can be merged directly into the component props
 * _if_ they map 1:1 with those. otherwise this type can be used by the
 * component code to set styles properly
 */
export type StylesProps = {
  // TODO: replace example props with yours
  appearance?: 'filled' | 'hollow';
  size?: RadiusButtonSize;
};

/** Simple Map from size props to spacing
 * An example of a useful map that helps select simple css values based on props
 */
// TODO: replace values with css variables
const buttonSize: Record<RadiusButtonSize, string> = {
  small:
    'var(--spacing-button-vertical-padding-sm) var(--spacing-button-horizontal-padding-sm)',
  medium:
    'var(--spacing-button-vertical-padding-md) var(--spacing-button-horizontal-padding-md)',
  large:
    'var(--spacing-button-vertical-padding-lg) var(--spacing-button-horizontal-padding-lg)',
};

/** Map from color props to css
 * An example of a useful map that helps select css props based on props
 */
// TODO: replace values with css variables
const buttonColors: Record<
  RadiusButtonStyleType,
  Pick<CSSObject, 'color' | 'background' | 'border'>
> = {
  filled: {
    color: 'var(--color-button-primary-label-default)',
    background: 'var(--color-button-primary-surface-default)',
    border: 'var(--color-button-primary-border-default)',
  },
  filledFocus: {
    color: 'var(--color-button-primary-label-focus)',
    background: 'var(--color-button-primary-surface-focus)',
    border: 'var(--color-button-primary-border-focus)',
  },
  filledActive: {
    color: 'var(--color-button-primary-label-active)',
    background: 'var(--color-button-primary-surface-active)',
    border: 'var(--color-button-primary-border-active)',
  },
  filledHover: {
    color: 'var(--color-button-primary-label-hover)',
    background: 'var(--color-button-primary-surface-hover)',
    border: 'var(--color-button-primary-border-hover)',
  },
  filledDisabled: {
    color: 'var(--color-button-primary-label-disabled)',
    background: 'var(--color-button-primary-surface-disabled)',
    border: 'var(--color-button-primary-border-disabled)',
  },
  hollow: {
    color: 'var(--color-button-secondary-label-default)',
    background: 'var(--color-button-secondary-surface-default)',
    border: 'var(--color-button-secondary-border-default)',
  },
  hollowFocus: {
    color: 'var(--color-button-secondary-label-focus)',
    background: 'var(--color-button-secondary-surface-focus)',
    border: 'var(--color-button-secondary-border-focus)',
  },
  hollowActive: {
    color: 'var(--color-button-secondary-label-active)',
    background: 'var(--color-button-secondary-surface-active)',
    border: 'var(--color-button-secondary-border-active)',
  },
  hollowHover: {
    color: 'var(--color-button-secondary-label-hover)',
    background: 'var(--color-button-secondary-surface-hover)',
    border: 'var(--color-button-secondary-border-hover)',
  },
  hollowDisabled: {
    color: 'var(--color-button-secondary-label-disabled)',
    background: 'var(--color-button-secondary-surface-disabled)',
    border: 'var(--color-button-secondary-border-disabled)',
  },
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>({
  appearance = 'hollow',
  size = 'medium',
}: T) => {
  console.log('get Styles ', appearance, size);
  /* Example styles. Adjust with styles for your implementation */
  const normal = buttonColors[appearance];
  const focus = buttonColors[`${appearance}Focus`];
  const active = buttonColors[`${appearance}Active`];
  const hover = buttonColors[`${appearance}Hover`];
  const disabled = buttonColors[`${appearance}Disabled`];
  const padding = buttonSize[size];
  /* Emotion `css` function generates the CSS
   * and returns the class name pointing to those styles
   * HINT: it is important to memoize the results of this function
   */

  return css`
    /* note that values that do not vary with props can be added 
    *  directly as css variables representing design tokens */
    color: ${normal.color};
    background: ${normal.background};
    border: ${normal.border};
    padding: ${padding};
    border-radius: var(--borderWidth-button-border-width-md);
    font-size: var(--button--typography-text);
    margin: var(--button--typography-text);
    font-size: var(--button--typography-text);
    font-size: var(--button--typography-text);
    &:hover {
      color: ${hover.color};
      background: ${hover.background};
      border: ${hover.border};
    }
    &:focus {
      color: ${focus.color};
      background: ${focus.background};
      border: ${focus.border};
    }
    &:active {
      color: ${active.color};
      background: ${active.background};
      border: ${active.border};
    }
    &:disabled {
      color: ${disabled.color};
      background: ${disabled.background};
      border: ${disabled.border};
    }
  `;
};
