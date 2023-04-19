import { css } from '@emotion/css';
import {
  RadiusColorTokens,
  Var,
} from '@rangle/radius-foundations/generated/design-tokens.types';

// Discriminated unions are an excellent way to add type safety
// and self-documentation to your code -- even internal implementations
export type RadiusButtonStyleType =
  | 'filled'
  | 'filledActive'
  | 'filledHover'
  | 'filledDisabled'
  | 'hollow'
  | 'hollowActive'
  | 'hollowHover'
  | 'hollowDisabled';
/** Props that affect the CSS of this component
 * this type can be merged directly into the component props
 * _if and only if_ they map 1:1 with those. otherwise this type can be used by the
 * component code to set styles properly
 */
export type StylesProps = {
  // TODO: replace example props with yours
  appearance?: 'filled' | 'hollow';
};

/** Map from color props to css
 * An example of a useful map that helps select css props based on props
 */
const buttonColors: Record<
  RadiusButtonStyleType,
  {
    [key in 'color' | 'background' | 'border']: Var<RadiusColorTokens>;
  }
> = {
  filled: {
    color: 'var(--color-component-color-button-primary-default-label)',
    background:
      'var(--color-component-color-button-primary-default-background)',
    border: 'var(--color-component-color-button-primary-default-border)',
  },
  filledActive: {
    color: 'var(--color-component-color-button-primary-active-label)',
    background: 'var(--color-component-color-button-primary-active-background)',
    border: 'var(--color-component-color-button-primary-active-border)',
  },
  filledHover: {
    color: 'var(--color-component-color-button-primary-hover-label)',
    background: 'var(--color-component-color-button-primary-hover-background)',
    border: 'var(--color-component-color-button-primary-hover-border)',
  },
  filledDisabled: {
    color: 'var(--color-component-color-button-primary-disabled-label)',
    background:
      'var(--color-component-color-button-primary-disabled-background)',
    border: 'var(--color-component-color-button-primary-disabled-border)',
  },
  hollow: {
    color: 'var(--color-component-color-button-secondary-default-label)',
    background:
      'var(--color-component-color-button-secondary-default-background)',
    border: 'var(--color-component-color-button-secondary-default-border)',
  },
  hollowActive: {
    color: 'var(--color-component-color-button-secondary-active-label)',
    background:
      'var(--color-component-color-button-secondary-active-background)',
    border: 'var(--color-component-color-button-secondary-active-border)',
  },
  hollowHover: {
    color: 'var(--color-component-color-button-secondary-hover-label)',
    background:
      'var(--color-component-color-button-secondary-hover-background)',
    border: 'var(--color-component-color-button-secondary-hover-border)',
  },
  hollowDisabled: {
    color: 'var(--color-component-color-button-secondary-disabled-label)',
    background:
      'var(--color-component-color-button-secondary-disabled-background)',
    border: 'var(--color-component-color-button-secondary-disabled-border)',
  },
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>({
  appearance = 'hollow',
}: T) => {
  /* Example styles. Adjust with styles for your implementation */
  const normal = buttonColors[appearance];
  const active = buttonColors[`${appearance}Active`];
  const hover = buttonColors[`${appearance}Hover`];
  const disabled = buttonColors[`${appearance}Disabled`];
  /* Emotion `css` function generates the CSS
   * and returns the class name pointing to those styles
   * HINT: it is important to memoize the results of this function
   */

  return css`
    /* note that values that do not vary with props can be added 
    *  directly as css variables representing design tokens */
    color: ${normal.color};
    background: ${normal.background};
    border: solid ${normal.border}
      var(--borderWidth-component-border-width-button-border);
    border-radius: var(--borderRadius-component-border-radius-button-border);
    cursor: pointer;
    display: inline-block;
    padding: 0;
    &:hover {
      color: ${hover.color};
      background: ${hover.background};
      border-color: ${hover.border};
    }
    &:active {
      color: ${active.color};
      background: ${active.background};
      border-color: ${active.border};
    }
    &:disabled {
      color: ${disabled.color};
      background: ${disabled.background};
      border-color: ${disabled.border};
      cursor: default;
    }
  `;
};
