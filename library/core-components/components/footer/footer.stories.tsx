import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { RadiusFooter } from './footer';

const meta: Meta<typeof RadiusFooter> = {
  component: RadiusFooter,
  title: 'Footer',
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'footer' },
      },
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RadiusFooter>;

export const Default: Story = {};
