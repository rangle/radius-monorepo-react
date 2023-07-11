import { css } from '../../../../shared/utils';
import { mediaQueries } from '../../../../shared/constants';
import { RadiusHeroProps } from './hero';

export type StyleProps = Pick<RadiusHeroProps, 'imageAlignment'>;

export const useStyles = ({ imageAlignment }: StyleProps) => ({
  contentContainer: css`
    ${mediaQueries.desktop} {
      flex-direction: ${imageAlignment === 'left' ? 'row' : 'row-reverse'};
    }
  `,
  imageContainer: css`
    ${mediaQueries.desktop} {
      aspect-ratio: 0.866;
    }
    ${mediaQueries.tablet} {
      aspect-ratio: 1.72;
    }
    ${mediaQueries.mobile} {
      aspect-ratio: 1;
    }
  `,
});
