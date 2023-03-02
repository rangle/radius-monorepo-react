import { css } from '@emotion/css';
import { TypographyExtendedProps } from './typography';

export type StylesProps = Pick<
  TypographyExtendedProps,
  'align' | 'color' | 'font'
>;

export const getStyles = <T extends StylesProps>({ align, color, font }: T) => {
  return css`
    color: ${color};
    text-align: ${align};
    font: ${font};
    margin: 0;
    padding: 0;
  `;
};
