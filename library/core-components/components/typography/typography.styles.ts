import { renderCSSProp, createUseStyles } from '../../utils';
import { Typography } from './typography';

export type StylesProps = Pick<
  React.ComponentProps<typeof Typography>,
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
  align,
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
