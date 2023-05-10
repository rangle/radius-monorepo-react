import { css } from '../../utils';

// export type StyleProps = Pick<React.ComponentProps<typeof RadiusNav>, 'selected'>;

export const useStyles = () => ({
  // TODO: figure out how to use polymorphic Component in AutoLayout `as` prop so we can apply layout styles directly instead of nesting them (currently throws an undecipherable type error)
  styles: css`
    width: 100%;
  `,
});
