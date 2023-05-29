import { css } from '@emotion/css';
import { RadiusImageTextItemProps } from './image-text-item.types';
import { RequireAndPick } from '../../utils';

type StyleProps = Pick<RadiusImageTextItemProps, 'variant'> &
  RequireAndPick<RadiusImageTextItemProps, 'imageAlignment'>;

export const useStyles = ({ imageAlignment, variant }: StyleProps) => {
  return {
    styles: css`
      @media screen and (min-width: 600px) {
        flex-direction: ${imageAlignment === 'right' ? 'row-reverse' : ''};
      }
    `,
    imageContainer: css`
      @media screen and (min-width: 600px) {
        width: ${variant === 'small' ? '31.25%' : ''};
      }
    `,
    textContainer: css`
      @media screen and (min-width: 600px) {
        width: ${variant === 'small' ? '68.75%' : ''};
      }
    `,
  };
};
