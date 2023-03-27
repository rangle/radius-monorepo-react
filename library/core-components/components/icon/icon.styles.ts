import { css } from '@emotion/css';
import { renderCSSProp } from '../../utils/design-tokens.utils';
import { RadiusIconProps } from './icon.types';

type IconProps = Pick<RadiusIconProps, 'fill'>;

/** returns the className generated for the styles of this component */
export const getStyles = ({ fill }: IconProps) => {
  return css`
    fill: ${renderCSSProp(fill) ?? 'currentColor'};
  `;
};
