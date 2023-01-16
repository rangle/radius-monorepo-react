import { css, CSSObject } from '@emotion/css';

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
  small: '0.8rem',
  medium: '1rem',
  large: '1.2rem',
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
    color: 'var(--radius-button-primary-text-color)',
    background: 'var(--radius-button-primary-background-color)',
    border: 'var(--radius-button-primary-border-color)',
  },
  filledFocus: {
    color: 'var(--radius-button-primary-text-color-focus)',
    background: 'var(--radius-button-primary-background-color-focus)',
    border: 'var(--radius-button-primary-border-color-focus)',
  },
  filledActive: {
    color: 'var(--radius-button-primary-text-color-active)',
    background: 'var(--radius-button-primary-background-color-active)',
    border: 'var(--radius-button-primary-border-color-active)',
  },
  filledHover: {
    color: 'var(--radius-button-primary-text-color-hover)',
    background: 'var(--radius-button-primary-background-color-hover)',
    border: 'var(--radius-button-primary-border-color-hover)',
  },
  filledDisabled: {
    color: 'var(--radius-button-primary-text-color-disabled)',
    background: 'var(--radius-button-primary-background-color-disabled)',
    border: 'var(--radius-button-primary-border-color-disabled)',
  },
  hollow: {
    color: 'var(--radius-button-secondary-text-color)',
    background: 'var(--radius-button-secondary-background-color)',
    border:
      'var(--radius-spacing-1) solid var(--radius-button-secondary-text-color)',
  },
  hollowFocus: {
    color: 'var(--radius-button-secondary-text-color-focus)',
    background: 'var(--radius-button-secondary-background-color-focus)',
    border:
      'var(--radius-spacing-1) solid var(--radius-button-secondary-text-color-focus)',
  },
  hollowActive: {
    color: 'var(--radius-button-secondary-text-color-active)',
    background: 'var(--radius-button-secondary-background-color-active)',
    border:
      'var(--radius-spacing-1) solid var(--radius-button-secondary-text-color-active)',
  },
  hollowHover: {
    color: 'var(--radius-button-secondary-text-color-hover)',
    background: 'var(--radius-button-secondary-background-color-hover)',
    border:
      'var(--radius-spacing-1) solid var(--radius-button-secondary-text-color-hover)',
  },
  hollowDisabled: {
    color: 'var(--radius-button-secondary-text-color-disabled)',
    background: 'var(--radius-button-secondary-background-color-disabled)',
    border:
      'var(--radius-spacing-1) solid var(--radius-button-secondary-text-color-disabled)',
  },
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>({
  appearance = 'hollow',
  size = 'medium',
}: T) => {
  /* Example styles. Adjust with styles for your implementation */
  console.log(appearance, buttonColors);
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
    font-size: var(--button--typography-text);
    padding: var(--button--padding);
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
