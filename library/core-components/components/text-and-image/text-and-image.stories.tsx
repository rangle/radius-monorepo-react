import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { TextAndImage } from './text-and-image';

export default {
  component: TextAndImage,
  title: `Core Components/Text And Image`,
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  args: {
    src: 'https://via.placeholder.com/1500',
    alt: 'placeholder image',
  },
  argTypes: {
    title: {
      defaultValue: 'Title',
      type: { name: 'string', required: true },
    },
    body: {
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      type: { name: 'string', required: true },
    },
    headingLevel: {
      defaultValue: 'h2',
    },
    media: {
      defaultValue: 'left',
    },
  },
} as ComponentMeta<typeof TextAndImage>;

const Template: ComponentStory<typeof TextAndImage> = (
  args: ComponentProps<typeof TextAndImage>
) => <TextAndImage {...args} />;

export const Default = Template.bind({});

export const Multiple: ComponentStory<typeof TextAndImage> = (
  args: ComponentProps<typeof TextAndImage>
) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 20 }}
  >
    <div style={{ display: 'flex', gap: 32 }}>
      <TextAndImage {...args} />
      <TextAndImage {...args} />
    </div>
    <TextAndImage {...args} />
  </div>
);
