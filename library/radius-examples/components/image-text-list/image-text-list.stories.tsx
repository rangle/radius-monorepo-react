import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusImageTextList } from './image-text-list';
import { RadiusImageTextListProps } from './image-text-list.types';

const meta: Meta<RadiusImageTextListProps> = {
  component: RadiusImageTextList,
  title: 'ImageTextList',
  parameters: {
    badges: [BADGE.BETA],
    controls: {
      disable: true,
    },
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
type Story = StoryObj<RadiusImageTextListProps>;

export const LargeVariant: Story = {
  args: {
    variant: 'large',
    items: [
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        header: 'Header',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        headingLevel: 'h2',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        header: 'Header',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        headingLevel: 'h2',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        header: 'Header',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        headingLevel: 'h2',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        header: 'Header',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        headingLevel: 'h2',
      },
    ],
  },
};

export const SmallVariant: Story = {
  args: {
    variant: 'small',
    items: [
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
      {
        src: 'https://via.placeholder.com/1500',
        alt: 'Descriptive text',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      },
    ],
  },
};
