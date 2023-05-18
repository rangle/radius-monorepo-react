import { css } from '../../utils';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import type { RadiusButton } from './button';

/**
 * The props that are used to select the css styles. In this case it is a subset
 * of the props that are passed to the component, but can also contain custom
 * types if needed for the logic of any given component.
 */
export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusButton>,
  'variant'
>;

/** returns the className generated for the styles of this component */
export const useStyles = ({ variant = 'primary' }: StyleProps) => {
  /* 
    Utilizing token types directly from the constants generated with the foundaitons package
   */
  const { primary, secondary } = radiusTokens.component.color.button;
  const colors = { primary, secondary }[variant];
  const { default: normal, active, hover, disabled } = colors;

  /**
   * The `createUseStyles` function is a wrapper around the `css` function
   * from the Emotion library. It is a function that takes a template literal
   * and returns a hook that can be used to generate the class name. The hook
   * is memoized so that the styles are only regenerated when the props change.
   *
   * If you are not using this hook, it is important to memoize the styles
   * yourself to avoid generating the same styles multiple times.
   */
  return css`
    /* note that values that do not vary with props can be added 
    *  directly as css variables representing design tokens */
    color: var(${normal.label});
    background: var(${normal.background});
    border: var(${radiusTokens.component.borderWidth.button.border}) solid
      var(${normal.border});
    border-radius: var(${radiusTokens.component.borderRadius.button.border});
    cursor: pointer;
    display: inline-block;
    padding: 0;
    text-decoration: none;
    &:hover {
      color: var(${hover.label});
      background: var(${hover.background});
      border-color: var(${hover.border});
    }
    &:active {
      color: var(${active.label});
      background: var(${active.background});
      border-color: var(${active.border});
    }
    &:disabled {
      color: var(${disabled.label});
      background: var(${disabled.background});
      border-color: var(${disabled.border});
      cursor: default;
    }
  `;
};
