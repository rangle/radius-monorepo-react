import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusInlineLinkExtendedProps } from './inline-link.types';

export type StyleProps = Pick<RadiusInlineLinkExtendedProps, 'disabled'>;

export const useStyles = ({ disabled }: StyleProps) => ({
  // TODO: add these styles to a global reset style sheet
  styles: css`
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
