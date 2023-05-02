import { css } from '../../utils';

/** returns the className generated for the styles of this component */
export const useStyles = () => {
  return {
    contentContainer: css`
      flex-direction: column;
      @media (min-width: 900px) {
        flex-direction: row;
      }
    `,
    imageContainer: css`
      width: 100%;
      @media (min-width: 900px) {
        width: 50%;
      }
    `,
    textContainer: css`
      width: 100%;
      @media (min-width: 900px) {
        width: 50%;
      }
    `,
  };
};
