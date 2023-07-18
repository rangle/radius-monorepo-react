import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusImageTextItem } from './image-text-item';
import { RadiusImageTextItemProps } from './image-text-item.types';

const meta: Meta<RadiusImageTextItemProps> = {
  component: RadiusImageTextItem,
  title: 'ImageTextItem',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    header: { if: { arg: 'variant', eq: 'large' } },
    headingLevel: { if: { arg: 'variant', eq: 'large' } },
  },
};

export default meta;
type Story = StoryObj<RadiusImageTextItemProps>;

export const LargeVariant: Story = {
  args: {
    src: 'https://via.placeholder.com/1500',
    alt: 'Descriptive text',
    variant: 'large',
    header: 'Header',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    headingLevel: 'h2',
  },
};

export const SmallVariant: Story = {
  args: {
    src: 'https://via.placeholder.com/1500',
    alt: 'Descriptive text',
    variant: 'small',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
};
