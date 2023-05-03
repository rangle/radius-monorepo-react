import { css } from '@emotion/css';

import { ImageTextItemProps } from './image-text-item';

// TODO: breakpoints should be generated using importer - this is a temporary solution. See https://rangle.atlassian.net/browse/R20-201
const breakpoints = {
  lg: {
    min: 900,
  },
  md: {
    min: 600,
    max: 899,
  },
  sm: {
    min: 320,
    max: 599, // TODO: small breakpoint should have max-width: 599px instead of 559px. See https://rangle.atlassian.net/browse/R20-208
  },
};

type StyleProps = Pick<ImageTextItemProps, 'media'>;

export const getStyles = <T extends StyleProps>({ media }: T) => {
  const breakpointSm = `@media screen and (min-width: ${breakpoints.sm.min}px) and (max-width: ${breakpoints.sm.max}px)`;

  return {
    container: css`
      flex-direction: ${media === 'left' ? 'row' : 'row-reverse'};
      ${breakpointSm} {
        flex-direction: column;
      }
    `,
    imageContainer: css`
      width: 50%;
      ${breakpointSm} {
        width: 100%;
      }
    `,
    textContainer: css`
      width: 50%;
      ${breakpointSm} {
        width: 100%;
      }
    `,
  };
};
