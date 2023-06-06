import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusNavItem } from './nav-item';

const meta: Meta<typeof RadiusNavItem> = {
  component: RadiusNavItem,
  title: 'Radius Examples / Nav Item',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
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
type Story = StoryObj<typeof RadiusNavItem>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <RadiusNavItem href="#" label="Item 1" selected />
      <RadiusNavItem href="#" label="Item 2" />
      <RadiusNavItem href="#" label="Item 3" />
    </div>
  ),
};
