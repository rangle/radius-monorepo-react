import { css } from '@emotion/css';

/** returns the className generated for the styles of this component */
export const getStyles = () => {
  return css`
    .content-container {
      padding: 6rem 1rem;
      flex-direction: column;
      @media screen and (min-width: 600px) and (max-width: 899px) {
        padding: 6.5rem 1.25rem;
      }
      @media screen and (min-width: 900px) {
        padding: 0 4.5rem;
        flex-direction: row;
      }
    }
    .image-container {
      width: 100%;
      max-height: 280px;
      overflow: hidden;
      @media screen and (min-width: 600px) and (max-width: 899px) {
        max-height: 400px;
      }
      @media screen and (min-width: 900px) {
        width: 50%;
        max-height: 100%;
      }
    }
    .text-container {
      width: 100%;
      @media screen and (min-width: 900px) {
        width: 50%;
      }
    }
    .buttonContainer {
      margin-top: 1.5rem;
      @media screen and (min-width: 900px) {
        margin-top: 3rem;
      }
    }
  `;
};
