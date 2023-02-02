import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton, RadiusButtonVariant } from './button';
import { RadiusButtonSize } from './button.styles';
import { css } from '@emotion/css';

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

type ButtonVariations = {
  types: readonly RadiusButtonVariant[];
  sizes: readonly RadiusButtonSize[];
  states: readonly ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
};

const buttonVariations: ButtonVariations = {
  types: ['primary', 'secondary'] as const,
  sizes: ['large', 'medium', 'small'] as const,
  states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled'] as const,
};

const renderButtonVariationCell = (
  type: ButtonVariations['types'][number],
  size: ButtonVariations['sizes'][number],
  state: ButtonVariations['states'][number]
) => {
  const className = `pseudo-${state.toLowerCase()}`;
  if (state !== 'Disabled') {
    return (
      <td className={className}>
        <RadiusButton size={size} variant={type}>
          Action
        </RadiusButton>
      </td>
    );
  } else {
    return (
      <td>
        <RadiusButton size={size} variant={type} disabled>
          Action
        </RadiusButton>
      </td>
    );
  }
};

const tableStyle = css`
  tr,
  td {
    color: var(--color-text-on-base-primary);
    font: var(--typography-body-md);
    padding: 2em;
  }
`;

const ButtonVariantsTemplateAutomated = (
  options: ButtonVariations
): ComponentStory<typeof RadiusButton> => {
  const { types, sizes, states } = options;
  const typeAndSize = types.flatMap((type) =>
    sizes.map((size) => [type, size] as const)
  );
  // renders a table with rows for each type and size and collumns for each state
  return () => (
    <table className={tableStyle}>
      <tr>
        <th></th>
        {states.map((state) => (
          <th>{state}</th>
        ))}
      </tr>
      {typeAndSize.map(([type, size]) => (
        <tr>
          <td>
            {type} {size}
          </td>
          {states.map((state) => renderButtonVariationCell(type, size, state))}
        </tr>
      ))}
    </table>
  );
};

export const ButtonVariants = ButtonVariantsTemplateAutomated(
  buttonVariations
).bind({});
ButtonVariants.args = {};
ButtonVariants.props = {
  name: 'Button Variations',
};
