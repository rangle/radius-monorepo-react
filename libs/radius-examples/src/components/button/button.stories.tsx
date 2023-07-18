import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton } from './button';
import { RadiusButtonVariant } from './button.types';
import { css } from '@emotion/css';
import { ArrowRight } from '@rangle/radius-foundations';

const meta: Meta<typeof RadiusButton> = {
  component: RadiusButton,
  title: 'Button',
  parameters: {
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major: process.env.COMPONENT_VERSION?.[0],
      minor: process.env.COMPONENT_VERSION?.[1],
      patch: process.env.COMPONENT_VERSION?.[2],
    },
    badges: [BADGE.BETA],
    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    ref: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    as: 'button',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusButton>;

export const Default: Story = {
  args: {
    children: 'Controlled Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Right Icon',
    rightIcon: ArrowRight,
  },
};

export const ButtonStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
      <div>
        <RadiusButton {...args}>Normal</RadiusButton>
      </div>
      <div id="hover">
        <RadiusButton {...args}>Hover</RadiusButton>
      </div>
      <div id="active">
        <RadiusButton {...args}>Active</RadiusButton>
      </div>
      <div id="hover-active">
        <RadiusButton {...args}>Hover Active</RadiusButton>
      </div>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: ['#hover', '#hover-active'],
      active: ['#active', '#hover-active'],
    },
  },
};

type ButtonVariations = {
  types: readonly RadiusButtonVariant[];
  states: readonly ['Default', 'Hover', 'Active', 'Disabled'];
};

const buttonVariations: ButtonVariations = {
  types: ['primary', 'secondary'] as const,
  states: ['Default', 'Hover', 'Active', 'Disabled'] as const,
};

const renderButtonVariationCell = (
  type: ButtonVariations['types'][number],
  state: ButtonVariations['states'][number]
) => {
  const className = state.toLowerCase();
  if (state !== 'Disabled') {
    return (
      <td className={className}>
        <RadiusButton variant={type}>Action</RadiusButton>
      </td>
    );
  } else {
    return (
      <td>
        <RadiusButton variant={type} disabled>
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
  const { types, states } = options;
  // renders a table with rows for each type and size and columns for each state
  return () => (
    <table className={tableStyle}>
      <tr>
        <th></th>
        {states.map((state) => (
          <th>
            <span
              style={{
                fontFamily: 'Riforma LL',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {state}
            </span>
          </th>
        ))}
      </tr>
      {types.map((type) => (
        <tr>
          <td>
            <span
              style={{
                fontFamily: 'Riforma LL',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {type}
            </span>
          </td>
          {states.map((state) => renderButtonVariationCell(type, state))}
        </tr>
      ))}
    </table>
  );
};

export const ButtonVariants = ButtonVariantsTemplateAutomated(
  buttonVariations
).bind({});

ButtonVariants.parameters = {
  pseudo: {
    hover: ['.hover', '.hover-active'],
    active: ['.active', '.hover-active'],
  },
};
