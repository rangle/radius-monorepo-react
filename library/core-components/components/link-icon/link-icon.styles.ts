import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { css } from '../../utils';
import { RadiusLinkIcon } from '.';

export type StyleProps = Pick<
  React.ComponentProps<typeof RadiusLinkIcon>,
  'disabled'
>;

export const useStyles = ({ disabled }: StyleProps) => ({
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
