import { css } from '../../utils';

export const useStyles = () => ({
  // TODO: figure out how to use polymorphic Component in AutoLayout `as` prop so we can apply layout styles directly instead of nesting them (currently throws an undecipherable type error)
  styles: css`
    width: 100%;
  `,

  navContainer: css`
    // TODO: tokenize this
    @media screen and (max-width: 899px) {
      flex-direction: column;
    }
  `,
  toggleButton: css`
    // TODO: add a token for this
    @media screen and (min-width: 900px) {
      display: none;
    }
  `,
  menu: css`
    // TODO: tokenize this
    @media screen and (max-width: 899px) {
      flex-direction: column;
    }
  `,
  navItems: css`
    // TODO: tokenize this
    @media screen and (max-width: 899px) {
      flex-direction: column;
    }
  `,
  info: css`
    // TODO: add a token for this
    @media screen and (min-width: 900px) {
      display: none;
    }

    // TODO: tokenize this
    @media screen and (max-width: 599px) {
      flex-direction: column;
    }
  `,
});
