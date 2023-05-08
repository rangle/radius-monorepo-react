import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusNavItem, RadiusNavItemProps } from './nav-item';

const meta: Meta<RadiusNavItemProps> = {
  component: RadiusNavItem,
  title: 'Nav Item',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {
    label: 'Menu Item',
    href: '#',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<RadiusNavItemProps>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <RadiusNavItem label="Item 1" href="#" selected />
      <RadiusNavItem label="Item 2" href="#" />
      <RadiusNavItem label="Item 3" href="#" />
    </div>
  ),
};
