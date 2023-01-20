import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton } from './button';

export default {
  component: RadiusButton,
  title: `Core Components/Button`,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/????',
    },
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major: process.env.COMPONENT_VERSION?.[0],
      minor: process.env.COMPONENT_VERSION?.[1],
      patch: process.env.COMPONENT_VERSION?.[2],
    },
    badges: [BADGE.EXPERIMENTAL],

    componentSubtitle:
      'This Polymorphic component will style your component to render as a button.',
    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
} as ComponentMeta<typeof RadiusButton>;

const Template: ComponentStory<typeof RadiusButton> = (
  args: ComponentProps<typeof RadiusButton>
) => <RadiusButton {...args}>Controlled Button</RadiusButton>;

export const Default = Template.bind({});
Default.args = {};

const ButtonStatesTemplate: ComponentStory<typeof RadiusButton> = (
  args: ComponentProps<typeof RadiusButton>
) => (
  <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
    <div>
      <RadiusButton {...args}>Normal</RadiusButton>
    </div>
    <div className="pseudo-hover">
      <RadiusButton {...args}>Hover</RadiusButton>
    </div>
    <div className="pseudo-focus">
      <RadiusButton {...args}>Focus</RadiusButton>
    </div>
    <div className="pseudo-active">
      <RadiusButton {...args}>Active</RadiusButton>
    </div>
    <div className="pseudo-hover pseudo-focus">
      <RadiusButton {...args}>Hover Focus</RadiusButton>
    </div>
    <div className="pseudo-hover pseudo-active">
      <RadiusButton {...args}>Hover Active</RadiusButton>
    </div>
    <div className="pseudo-focus pseudo-active">
      <RadiusButton {...args}>Focus Active</RadiusButton>
    </div>
    <div className="pseudo-hover pseudo-focus pseudo-active">
      <RadiusButton {...args}>Hover Focus Active</RadiusButton>
    </div>
  </div>
);

export const ButtonStates = ButtonStatesTemplate.bind({});
ButtonStates.args = {};
ButtonStates.props = {
  name: 'Button states',
};
