import { css } from '@emotion/css';
import { renderCSSProp } from '../../utils/design-tokens.utils';
import { TypographyExtendedProps } from './typography';

export type StylesProps = Pick<
  TypographyExtendedProps,
  'align' | 'color' | 'font'
>;

export const getStyles = ({
  align = 'left',
  // NOTE: this component should not have default values for color and font as they should always come from the component layer or be inherited from the parent
  // @ts-expect-error - this component needs refactor with new tokens
  color = '--color-text-on-base-primary',
  // @ts-expect-error - this component needs refactor with new tokens
  font = '--typography-body-md',
}: StylesProps) => {
  return css`
    color: ${renderCSSProp(color)};
    text-align: ${align};
    font: ${renderCSSProp(font)};
    margin: 0;
    padding: 0;
  `;
};
