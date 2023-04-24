import { renderCSSProp, createUseStyles } from '../../utils';
import { TypographyExtendedProps } from './typography.types';

export type StylesProps = Pick<
  TypographyExtendedProps,
  | 'align'
  | 'fill'
  | 'font'
  | 'fontFamily'
  | 'lineHeight'
  | 'fontSize'
  | 'fontWeight'
  | 'letterSpacing'
  | 'textDecoration'
>;

export const useStyles = ({
  align = 'left',
  fill,
  font,
  fontFamily,
  lineHeight,
  fontSize,
  fontWeight,
  letterSpacing,
  textDecoration,
}: StylesProps) => createUseStyles`
    color: ${renderCSSProp(fill)};
    text-align: ${align};
    font: ${renderCSSProp(font)};
    font-family: ${renderCSSProp(fontFamily)};
    line-height: ${renderCSSProp(lineHeight)};
    font-size: ${renderCSSProp(fontSize)};
    font-weight: ${renderCSSProp(fontWeight)};
    letter-spacing: ${renderCSSProp(letterSpacing)};
    text-decoration: ${renderCSSProp(textDecoration)};
    margin: 0;
    padding: 0;
`;
