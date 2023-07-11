import { css } from '@emotion/css';
import { RadiusImageTextItemProps } from './image-text-item.types';
import { RequireAndPick } from '../../../../shared/utils';
import { mediaQueries } from '../../../../shared/constants';

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
      aspect-ratio: 1;

      ${mediaQueries.desktop} {
        ${variant === 'large' ? 'aspect-ratio: 1.211;' : ''}
      }

      @media screen and (min-width: 600px) {
        width: ${variant === 'small' ? '31.25%' : ''};
      }
    `,
    image: css`
      object-fit: cover;
    `,
    textContainer: css`
      @media screen and (min-width: 600px) {
        width: ${variant === 'small' ? '68.75%' : ''};
      }
    `,
  };
};
