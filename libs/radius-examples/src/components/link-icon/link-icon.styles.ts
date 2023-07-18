import { radiusTokens } from '@rangle/radius-foundations';
import { css } from '@rangle/radius-shared';
import { RadiusLinkIconExtendedProps } from './link-icon.types';

export type StyleProps = Pick<RadiusLinkIconExtendedProps, 'disabled'>;

export const useStyles = ({ disabled }: StyleProps) => ({
  // TODO: add these styles to a global reset style sheet
  parent: css`
    padding: 0;
    border: none;
    background: none;
    display: flex;
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
