import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { AccountCircle } from '@rangle/radius-foundations/generated/icons';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkIcon, RadiusLinkIconProps } from './link-icon';
import { flattenObject } from '../../utils';

const meta: Meta<RadiusLinkIconProps> = {
  component: RadiusLinkIcon,
  title: 'Link Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    size: {
      options: flattenObject(radiusTokens.component.sizing.linkIcon),
    },
    className: { table: { disable: true } },
  },
  args: {
    href: '#',
    icon: AccountCircle,
    size: radiusTokens.component.sizing.linkIcon.medium,
  },
};

export default meta;
type Story = StoryObj<RadiusLinkIconProps>;

export const Default: Story = {};
