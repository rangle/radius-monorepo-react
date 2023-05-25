import { css } from '../../utils';
import { mediaQueries } from '../auto-layout/auto-layout.styles';
import { RadiusHeroProps } from './hero';

export type StyleProps = Pick<RadiusHeroProps, 'imageAlignment'>;

export const useStyles = ({ imageAlignment }: StyleProps) => ({
  contentContainer: css`
    ${mediaQueries.desktop} {
      flex-direction: ${imageAlignment === 'left' ? 'row' : 'row-reverse'};
    }
  `,
});
