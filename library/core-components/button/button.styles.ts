import { css } from '@emotion/css';

/** props that affect the CSS of this component */
export type StylesProps = {
  // TODO: replace example prop with yours
  variant?: 'primary' | 'secondary';
};

/** returns the className generated for the styles of this component */
export const getStyles = <T extends StylesProps>(props: T) => {
  return css`
    color: ${props.variant === 'primary' ? 'blue' : 'red'};
  `;
};
