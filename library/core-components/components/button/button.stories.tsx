import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton } from './button';

export default {
  component: RadiusButton,
  title: 'Core COmponents/Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/????',
    },
    badges: [BADGE.EXPERIMENTAL],
  },
} as ComponentMeta<typeof RadiusButton>;

const Template: ComponentStory<typeof RadiusButton> = (
  args: ComponentProps<typeof RadiusButton>
) => (
  <RadiusButton as="button" {...args}>
    Hello World
  </RadiusButton>
);

export const Default = Template.bind({});
Default.args = {};
