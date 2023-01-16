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

export const ButtonStates = () => (
  <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
    <RadiusButton>Radius Button</RadiusButton>
    <RadiusButton id="one">Radius Button</RadiusButton>
    <RadiusButton id="three">Radius Button</RadiusButton>
    <RadiusButton id="two">Radius Button</RadiusButton>
    <RadiusButton id="four" disabled>
      Radius Button
    </RadiusButton>
  </div>
);

ButtonStates.parameters = {
  pseudo: {
    hover: '#one',
    focus: '#two',
    active: '#three',
  },
};
