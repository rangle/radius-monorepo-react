import { radiusTokens } from '@rangle/radius-foundations';
import { css } from '@rangle/radius-shared';
import { RadiusInlineLinkExtendedProps } from './inline-link.types';

export type StyleProps = Pick<RadiusInlineLinkExtendedProps, 'disabled'>;

export const useStyles = ({ disabled }: StyleProps) => ({
  styles: css`
    cursor: ${disabled ? 'default' : 'pointer'};
  `,
  label: css`
    &:hover {
      color: ${!disabled
        ? `var(${radiusTokens.component.color.inlineText.hover})`
        : ''};
    }

    &:active {
      color: ${!disabled
        ? `var(${radiusTokens.component.color.inlineText.active})`
        : ''};
    }
  `,
});
