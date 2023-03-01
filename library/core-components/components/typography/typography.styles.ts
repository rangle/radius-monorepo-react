import { css } from '@emotion/css';
import { TypographyExtendedProps } from './typography';

export type StylesProps = Pick<TypographyExtendedProps, 'align' | 'color'>;

export const getStyles = <T extends StylesProps>({ align, color }: T) => {
  return css`
    color: ${color};
    text-align: ${align};
  `;
};
