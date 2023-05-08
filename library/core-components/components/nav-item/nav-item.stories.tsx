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
};

export default meta;
type Story = StoryObj<RadiusNavItemProps>;

export const Default: Story = {};
