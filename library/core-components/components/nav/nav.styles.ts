import { css } from '../../utils';

type StyleProps = {
  /** Whether the nav is open */
  isOpen: boolean;
};

export const useStyles = ({ isOpen }: StyleProps) => ({
  // TODO: figure out how to use polymorphic Component in AutoLayout `as` prop so we can apply layout styles directly instead of nesting them (currently throws an undecipherable type error)
  styles: css`
    width: 100%;
  `,

  navContainer: css`
    // TODO: add a token for this (alignment)
    @media screen and (min-width: 900px) {
      align-items: center;
    }
  `,
  toggleButton: css`
    // TODO: add a token for this
    @media screen and (min-width: 900px) {
      display: none;
    }
  `,
  menu: css`
    // TODO: add a token for this (alignment)
    @media screen and (min-width: 900px) {
      align-items: flex-end;
    }

    @media screen and (max-width: 899px) {
      ${!isOpen ? 'display: none;' : ''}
    }
  `,
  secondaryActionsContainer: css`
    // note: tokenized 'auto' spacing isn't supported yet so we're hard-coding
    // this for now. 'auto' spacing tokens requires knowing the value of the
    // token to be able to choose between the 'gap' and 'justify-content'
    // properties, but the value isn't known ahead of time (getComputedStyle
    // doesn't work on component tokens because they're not applied to the root)
    justify-content: space-between;

    // TODO: add a token for this
    @media screen and (min-width: 900px) {
      display: none;
    }

    @media screen and (max-width: 899px) {
      ${!isOpen ? 'display: none;' : ''}
    }

    // TODO: add a token for this (alignment)
    @media screen and (min-width: 600px) {
      align-items: center;
    }
  `,
});
