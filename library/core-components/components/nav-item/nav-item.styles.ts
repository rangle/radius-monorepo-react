import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusNavItem } from '.';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusNavItem>,
  'selected'
>;

export const useStyles = ({ selected }: StyleProps) => ({
  link: css`
    // TODO: remove this once we have new destructured typography object containing this property
    text-decoration: none;

    &:hover {
      // apply label color when link is hovered
      > span {
        color: var(${radiusTokens.component.color.navigationItem.hover.label});
      }

      // apply underline color when link is hovered but not selected
      > div {
        ${!selected
          ? `background-color: var(
              ${radiusTokens.component.color.navigationItem.hover.accent}
            );`
          : ''};
      }
    }
  `,
  underline: css`
    // TODO: add height tokenization to AutoLayout component
    height: var(${radiusTokens.component.sizing.navigationItem.accent});
  `,
});
