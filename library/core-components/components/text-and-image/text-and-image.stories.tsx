import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { TextAndImage } from './text-and-image';
import { TextAndImageProps } from './text-and-image.types';

const meta: Meta<TextAndImageProps> = {
  component: TextAndImage,
  title: 'Text And Image',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    src: 'https://via.placeholder.com/1500',
    alt: 'placeholder image',
    title: 'Title',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
    headingLevel: 'h2',
    media: 'left',
  },
  argTypes: {
    title: {
      type: { name: 'string', required: true },
    },
    body: {
      type: { name: 'string', required: true },
    },
    media: {
      defaultValue: 'left',
    },
  },
};

export default meta;
type Story = StoryObj<TextAndImageProps>;

export const Default: Story = {};

export const Multiple: Story = {
  render: (args) => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 20 }}
    >
      <div style={{ display: 'flex', gap: 32 }}>
        <TextAndImage {...args} />
        <TextAndImage {...args} />
      </div>
      <TextAndImage {...args} />
    </div>
  ),
};
