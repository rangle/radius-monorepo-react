import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkIcon, RadiusLinkIconProps } from './link-icon';

const meta: Meta<RadiusLinkIconProps> = {
  component: RadiusLinkIcon,
  title: 'Link Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<RadiusLinkIconProps>;

export const Default: Story = {};
