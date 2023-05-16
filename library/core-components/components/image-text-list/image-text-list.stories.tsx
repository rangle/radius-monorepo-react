import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusImageTextList } from './image-text-list';
import { RadiusImageTextListProps } from './image-text-list.types';

const meta: Meta<RadiusImageTextListProps> = {
  component: RadiusImageTextList,
  title: 'ImageTextList',
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  // args: {
  //   src: 'https://via.placeholder.com/1500',
  //   alt: 'Descriptive text',
  //   variant: 'large',
  //   header: 'Header',
  //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  //   headingLevel: 'h2',
  // },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadiusImageTextListProps>;

export const Default: Story = {};
