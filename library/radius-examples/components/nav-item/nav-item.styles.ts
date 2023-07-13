import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '@rangle/radius-shared/utils';
import { RadiusNavItemExtendedProps } from './nav-item.types';

export type StyleProps = Pick<RadiusNavItemExtendedProps, 'selected'>;

export const useStyles = ({ selected }: StyleProps) => ({
  styles: css`
    cursor: pointer;
    white-space: nowrap;
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
