import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusNav } from './nav';

const meta: Meta<typeof RadiusNav> = {
  component: RadiusNav,
  title: 'Nav',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'nav' },
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
type Story = StoryObj<typeof RadiusNav>;

export const Default: Story = {};
