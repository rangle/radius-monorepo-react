import { css } from '@emotion/css';

/** returns the className generated for the styles of this component */
export const getStyles = () => {
  return css`
    justify-content: center;
    background-color: var(--color-background-base);
    .content-container {
      padding: 6rem 1rem;
      flex-direction: column;
      @media screen and (min-width: 600px) and (max-width: 899px) {
        padding: 6.5rem 4rem;
      }
      @media screen and (min-width: 900px) {
        padding: 0 4.5rem;
        max-width: 1136px;
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
        padding: 14rem 0;
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
