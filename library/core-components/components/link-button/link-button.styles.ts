import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusLinkButton } from '.';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusLinkButton>,
  'disabled'
>;

const gridColumns = {
  desktop: 12,
  tablet: 8,
  mobile: 4,
};

const mediaQueries = {
  desktop: `@media screen and (min-width: ${900}px)`,
  tablet: `@media screen and (min-width: ${600}px) and (max-width: ${899}px)`,
  mobile: `@media screen and (max-width: ${599}px)`,
};

// helper function that takes in a number of layout columns and returns a percentage
// note: we would need to be able to specify flex-wrap if that is intended
export const getGridItemWidth = (columns: number) => ({
  [mediaQueries.desktop]: {
    width: `${(columns / gridColumns.desktop) * 100}%`,
  },
  [mediaQueries.tablet]: {
    width: `${(columns / gridColumns.tablet) * 100}%`,
  },
  [mediaQueries.mobile]: {
    width: `${(columns / gridColumns.mobile) * 100}%`,
  },
});

export const useStyles = ({ disabled }: StyleProps) => ({
  // TODO: add these styles to a global reset style sheet
  parent: css`
    padding: 0;
    border: none;
    background: none;
    display: flex;
    cursor: ${disabled ? 'default' : 'pointer'};
  `,
  button: css`
    &:hover {
      fill: ${!disabled
        ? `var(${radiusTokens.component.color.linkButton.hover})`
        : ''};
    }

    &:active {
      fill: ${!disabled
        ? `var(${radiusTokens.component.color.linkButton.active})`
        : ''};
    }
  `,
  children: css`
    /* ${getGridItemWidth(4)}; */
    grid-column: span 4;
  `,
});
