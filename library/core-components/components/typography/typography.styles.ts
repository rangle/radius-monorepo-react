import { renderCSSProp, css } from '../../../../shared/utils';
import { TypographyExtendedProps } from './typography.types';

export type StyleProps = Pick<
  TypographyExtendedProps,
  'align' | 'fill' | 'font' | 'letterSpacing' | 'textDecoration'
>;

export const useStyles = ({
  align,
  fill,
  font,
  letterSpacing,
  textDecoration,
}: StyleProps) => css`
  color: ${renderCSSProp(fill)};
  text-align: ${align};
  font: ${renderCSSProp(font)};
  letter-spacing: ${renderCSSProp(letterSpacing)};
  text-decoration: ${renderCSSProp(textDecoration)};
  margin: 0;
  padding: 0;
`;
