import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusNavItem } from '.';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusNavItem>,
  'selected'
>;

export const useStyles = ({ selected }: StyleProps) => ({
  styles: css`
    // TODO: remove this once we have new destructured typography object containing this property, or add this to a global reset
    text-decoration: none;

    &:hover {
      // apply label color when link is hovered
      .nav-item-label {
        color: var(${radiusTokens.component.color.navigationItem.hover.label});
      }

      // apply underline color when link is hovered but not selected
      .nav-item-underline {
        ${!selected
          ? `background-color: var(
              ${radiusTokens.component.color.navigationItem.hover.accent}
            );`
          : ''};
      }
    }
  `,
  label: css`
    transition: color 0.2s;
  `,
  underline: css`
    // TODO: add height tokenization to AutoLayout component
    height: var(${radiusTokens.component.sizing.navigationItem.accent});
    transition: background-color 0.2s;
  `,
});
