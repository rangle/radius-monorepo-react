import { css } from '@emotion/css';

import { TextAndImageProps } from './text-and-image.types';

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
    max: 559, // TODO: small breakpoint should have max-width: 599px instead of 559px
  },
};

type StyleProps = Pick<TextAndImageProps, 'media'>;

export const getStyles = <T extends StyleProps>({ media }: T) => {
  const breakpointLg = `@media screen and (min-width: ${breakpoints.lg.min}px)`;
  const breakpointMd = `@media screen and (min-width: ${breakpoints.md.min}px) and (max-width: ${breakpoints.md.max}px)`;
  const breakpointSm = `@media screen and (min-width: ${breakpoints.sm.min}px) and (max-width: ${breakpoints.sm.max}px)`;

  return {
    container: css`
      padding: var(--spacing-core-space-26x) var(--spacing-core-space-18x);
      flex-direction: ${media === 'left' ? 'row' : 'row-reverse'};
      ${breakpointMd} {
        padding: var(--spacing-core-space-20x) var(--spacing-core-space-8x);
      }
      ${breakpointSm} {
        padding: var(--spacing-core-space-20x) var(--spacing-core-space-4x);
        flex-direction: column;
      }
    `,
    // TODO - !important is being used as a temporary fix for AutoBox specificity issues
    imageContainer: css`
      width: 50% !important;
      ${breakpointSm} {
        width: 100% !important;
      }
    `,
    textContainer: css`
      width: 50% !important;
      gap: var(--spacing-core-space-12x) !important;
      ${breakpointMd} {
        gap: var(--spacing-core-space-8x) !important;
      }
      ${breakpointSm} {
        width: 100% !important;
        gap: var(--spacing-core-space-8x) !important;
      }
    `,
  };
};
