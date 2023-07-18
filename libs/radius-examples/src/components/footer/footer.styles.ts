import { radiusTokens } from '@rangle/radius-foundations';
import { css } from '@rangle/radius-shared';
import { mediaQueries } from '@rangle/radius-shared';

export const useStyles = () => ({
  firstContainer: css`
    grid-column: span 6;
    gap: 24px;

    ${mediaQueries.tablet} {
      grid-column: span 8;
    }

    ${mediaQueries.mobile} {
      // TODO: Tokenize this
      gap: var(${radiusTokens.component.spacing.footer.gap.rows});
      flex-direction: column;
    }
  `,
  secondContainer: css`
    grid-column: span 6;

    ${mediaQueries.tablet} {
      grid-column: span 8;

      // TODO: Tokenize this
      align-items: flex-start;
    }

    ${mediaQueries.mobile} {
      grid-row-start: 4;

      // TODO: Tokenize this
      align-items: flex-start;
    }
  `,
  thirdContainer: css`
    grid-column: span 6;

    ${mediaQueries.tablet} {
      grid-column: span 4;
    }
  `,
  fourthContainer: css`
    grid-column: span 6;

    // TODO: is there an AutoLayout property to both center and justify?
    justify-content: flex-end;

    ${mediaQueries.tablet} {
      grid-column: span 4;
      grid-row-start: 2;

      // TODO: Tokenize this
      align-items: flex-start;
    }

    ${mediaQueries.mobile} {
      // TODO: Tokenize this
      align-items: flex-start;
    }
  `,
});
