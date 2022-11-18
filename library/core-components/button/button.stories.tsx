import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton, RadiusButtonProps } from './button';

export default {
  component: RadiusButton,
  title: 'Components/Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/????',
    },
    badges: [BADGE.EXPERIMENTAL],
  },
} as ComponentMeta<typeof RadiusButton>;

const Template: ComponentStory<typeof RadiusButton> = (
  args: RadiusButtonProps
) => <RadiusButton {...args}>Hello World</RadiusButton>;

export const Default = Template.bind({});
Default.args = {

};