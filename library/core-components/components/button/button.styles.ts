import { css, CSSObject } from '@emotion/css';

// Discrimitated unions are an excellent way to add type safety
// and self-documentation to your code -- even internal implementations
export type RadiusButtonSize = 'small' | 'medium' | 'large';
export type RadiusButtonStyleType = 'filled' | 'hollow';

/** Props that affect the CSS of this component
 * this type can be merged directly into the component props
 * _if_ they map 1:1 with those. otherwise this type can be used by the
 * component code to set styles properly
 */
export type StylesProps = {
  // TODO: replace example props with yours
  appearance?: RadiusButtonStyleType;
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
    color: 'white',
    background: 'black',
    border: 'none',
  },
  hollow: {
    color: 'red',
    background: 'transparent',
    border: '2px solid red',
  },
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>({
  appearance = 'hollow',
  size = 'medium',
}: T) => {
  /* Example styles. Adjust with styles for your implementation */
  const { color, background, border } = buttonColors[appearance];
  const padding = buttonSize[size];
  /* Emotion `css` function generates the CSS
   * and returns the class name pointing to those styles
   * HINT: it is important to memoize the results of this function
   */
  return css`
    /* note that values that do not vary with props can be added 
    *  directly as css variables representing design tokens */
    color: ${color};
    background: ${background};
    border: ${border};
    padding: ${padding};
    font-size: var(--button--typography-text);
    padding: var(--button--padding);
    margin: var(--button--typography-text);
    font-size: var(--button--typography-text);
    font-size: var(--button--typography-text);
  `;
};
