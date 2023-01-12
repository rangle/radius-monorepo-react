import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton, RadiusButtonProps } from './button';

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
  args: RadiusButtonProps
) => <RadiusButton {...args}>Hello World</RadiusButton>;

export const Default = Template.bind({});
Default.args = {};

const ButtonStatesTemplate: ComponentStory<typeof RadiusButton> = (
  args: RadiusButtonProps
) => (
  <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
    <RadiusButton {...args}>Default</RadiusButton>
    <div className="pseudo-hover">
      <RadiusButton {...args}>Hover</RadiusButton>
    </div>
    <div className="pseudo-active">
      <RadiusButton {...args}>Active</RadiusButton>
    </div>
    <div className="pseudo-focus">
      <RadiusButton {...args}>Focus</RadiusButton>
    </div>
    <RadiusButton disabled {...args}>
      Radius Button
    </RadiusButton>
  </div>
);

export const ButtonStates = ButtonStatesTemplate.bind({});
ButtonStates.args = {};
ButtonStates.props = {
  name: 'Button states',
};
