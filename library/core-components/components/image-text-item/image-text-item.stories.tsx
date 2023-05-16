import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusImageTextItem } from './image-text-item';
import { RadiusImageTextItemProps } from './image-text-item.types';

const meta: Meta<RadiusImageTextItemProps> = {
  component: RadiusImageTextItem,
  title: 'ImageTextItem',
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  args: {
    src: 'https://via.placeholder.com/1500',
    alt: 'Descriptive text',
    variant: 'large',
    header: 'Header',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    headingLevel: 'h2',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadiusImageTextItemProps>;

export const Default: Story = {};
