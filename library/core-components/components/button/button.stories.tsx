import React from 'react';
import { Meta, StoryObj, Args } from '@storybook/react';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton, RadiusButtonVariant } from './button';
import { RadiusButtonSize } from './button.styles';
import { css } from '@emotion/css';

const meta: Meta<typeof RadiusButton> = {
  component: RadiusButton,
  title: 'Button',
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
    // badges: [BADGE.EXPERIMENTAL],

    componentSubtitle:
      'This Polymorphic component will style your component to render as a button.',
    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
};

export default meta;
type Story = StoryObj<typeof RadiusButton>;

export const Default: Story = {
  args: {
    children: 'Controlled Button',
  } as Args,
};

export const ButtonStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
      <div>
        <RadiusButton {...args}>Normal</RadiusButton>
      </div>
      <div className="pseudo-hover">
        <RadiusButton {...args}>Hover</RadiusButton>
      </div>
      <div className="pseudo-active">
        <RadiusButton {...args}>Active</RadiusButton>
      </div>
      <div className="pseudo-hover pseudo-active">
        <RadiusButton {...args}>Hover Active</RadiusButton>
      </div>
    </div>
  ),
};

type ButtonVariations = {
  types: readonly RadiusButtonVariant[];
  sizes: readonly RadiusButtonSize[];
  states: readonly ['Default', 'Hover', 'Active', 'Disabled'];
};

const buttonVariations: ButtonVariations = {
  types: ['primary', 'secondary'] as const,
  sizes: ['large', 'medium', 'small'] as const,
  states: ['Default', 'Hover', 'Active', 'Disabled'] as const,
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

const ButtonVariantsTemplateAutomated = (options: ButtonVariations) => {
  const { types, sizes, states } = options;
  const typeAndSize = types.flatMap((type) =>
    sizes.map((size) => [type, size] as const)
  );
  // renders a table with rows for each type and size and columns for each state
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
