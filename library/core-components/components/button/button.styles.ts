import { css } from '@emotion/css';
import {
  RadiusColorTokens,
  Var,
} from '@rangle/radius-foundations/generated/design-tokens.types';
import { RadiusButtonExtendedProps } from './button';

// Discriminated unions are an excellent way to add type safety
// and self-documentation to your code -- even internal implementations
export type RadiusButtonStyleType =
  | 'primary'
  | 'primaryActive'
  | 'primaryHover'
  | 'primaryDisabled'
  | 'secondary'
  | 'secondaryActive'
  | 'secondaryHover'
  | 'secondaryDisabled';

/**
 * The props that are used to select the css styles. In this case it is a subset
 * of the props that are passed to the component, but can also contain custom
 * types if needed for the logic of any given component.
 */
export type StylesProps = Pick<RadiusButtonExtendedProps, 'variant'>;

/** Map from color props to css
 * An example of a useful map that helps select css props based on props
 */
const buttonColors: Record<
  RadiusButtonStyleType,
  {
    [key in 'color' | 'background' | 'border']: Var<RadiusColorTokens>;
  }
> = {
  primary: {
    color: 'var(--color-component-color-button-primary-default-label)',
    background:
      'var(--color-component-color-button-primary-default-background)',
    border: 'var(--color-component-color-button-primary-default-border)',
  },
  primaryActive: {
    color: 'var(--color-component-color-button-primary-active-label)',
    background: 'var(--color-component-color-button-primary-active-background)',
    border: 'var(--color-component-color-button-primary-active-border)',
  },
  primaryHover: {
    color: 'var(--color-component-color-button-primary-hover-label)',
    background: 'var(--color-component-color-button-primary-hover-background)',
    border: 'var(--color-component-color-button-primary-hover-border)',
  },
  primaryDisabled: {
    color: 'var(--color-component-color-button-primary-disabled-label)',
    background:
      'var(--color-component-color-button-primary-disabled-background)',
    border: 'var(--color-component-color-button-primary-disabled-border)',
  },
  secondary: {
    color: 'var(--color-component-color-button-secondary-default-label)',
    background:
      'var(--color-component-color-button-secondary-default-background)',
    border: 'var(--color-component-color-button-secondary-default-border)',
  },
  secondaryActive: {
    color: 'var(--color-component-color-button-secondary-active-label)',
    background:
      'var(--color-component-color-button-secondary-active-background)',
    border: 'var(--color-component-color-button-secondary-active-border)',
  },
  secondaryHover: {
    color: 'var(--color-component-color-button-secondary-hover-label)',
    background:
      'var(--color-component-color-button-secondary-hover-background)',
    border: 'var(--color-component-color-button-secondary-hover-border)',
  },
  secondaryDisabled: {
    color: 'var(--color-component-color-button-secondary-disabled-label)',
    background:
      'var(--color-component-color-button-secondary-disabled-background)',
    border: 'var(--color-component-color-button-secondary-disabled-border)',
  },
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>({
  variant = 'primary',
}: T) => {
  /* Example styles. Adjust with styles for your implementation */
  const normal = buttonColors[variant];
  const active = buttonColors[`${variant}Active`];
  const hover = buttonColors[`${variant}Hover`];
  const disabled = buttonColors[`${variant}Disabled`];
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
