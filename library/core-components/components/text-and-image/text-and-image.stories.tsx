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
  argTypes: {
    preTitle: {
      defaultValue: 'How will it help?',
    },
    title: {
      defaultValue: 'Shrink your timelines',
      type: { name: 'string', required: true },
    },
    body: {
      defaultValue:
        'Reduce the risk and effort required to get started on a design system. You can build a new digital product and a design system, with no delays in bringing it to market. Customer focus is the only focus.',
      type: { name: 'string', required: true },
    },
  },
} as ComponentMeta<typeof TextAndImage>;

const Template: ComponentStory<typeof TextAndImage> = (
  args: ComponentProps<typeof TextAndImage>
) => <TextAndImage {...args} />;

export const Default = Template.bind({});
Default.args = {};
