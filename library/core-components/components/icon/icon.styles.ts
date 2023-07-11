import { css } from '@emotion/css';
import { renderCSSProp } from '../../../../shared/utils';
import { RadiusIconProps } from './icon.types';

type IconProps = Pick<RadiusIconProps, 'fill' | 'size'>;

/** returns the className generated for the styles of this component */
export const getStyles = ({ fill, size }: IconProps) => {
  return css`
    fill: ${renderCSSProp(fill) ?? 'currentColor'};
    width: ${renderCSSProp(size)};
    height: ${renderCSSProp(size)};
  `;
};
