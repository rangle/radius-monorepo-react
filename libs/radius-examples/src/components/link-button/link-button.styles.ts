import { radiusTokens } from '@rangle/radius-foundations';
import { css } from '@rangle/radius-shared';
import { RadiusLinkButtonExtendedProps } from './link-button.types';

export type StyleProps = Pick<RadiusLinkButtonExtendedProps, 'disabled'>;

export const useStyles = ({ disabled }: StyleProps) => css`
  cursor: ${disabled ? 'default' : 'pointer'};
  color: ${disabled
    ? `var(${radiusTokens.component.color.linkButton.disabled})`
    : `var(${radiusTokens.component.color.linkButton.default})`};

  &:hover {
    color: ${!disabled
      ? `var(${radiusTokens.component.color.linkButton.hover})`
      : ''};
  }
  &:active {
    color: ${!disabled
      ? `var(${radiusTokens.component.color.linkButton.active})`
      : ''};
  }
`;
