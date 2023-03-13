import { css } from '@emotion/css';
import { renderCSSProp } from '@rangle/radius-foundations/generated/design-tokens.types';
import { TypographyExtendedProps } from './typography';

export type StylesProps = Pick<
  TypographyExtendedProps,
  'align' | 'color' | 'font'
>;

export const getStyles = ({
  align = 'left',
  color = '--color-text-on-base-primary',
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
