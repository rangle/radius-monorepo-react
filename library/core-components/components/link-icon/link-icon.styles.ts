import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusLinkIcon } from '.';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusLinkIcon>,
  'disabled'
>;

export const useStyles = ({ disabled }: StyleProps) => ({
  // TODO: add these styles to a global reset style sheet
  parent: css`
    padding: 0;
    border: none;
    background: none;
    cursor: ${disabled ? 'default' : 'pointer'};
  `,
  icon: css`
    &:hover {
      fill: ${!disabled
        ? `var(${radiusTokens.component.color.linkIcon.hover})`
        : ''};
    }

    &:active {
      fill: ${!disabled
        ? `var(${radiusTokens.component.color.linkIcon.active})`
        : ''};
    }
  `,
});
