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
      <div id="hover" className="pseudo-hover-all">
        <RadiusButton {...args}>Hover</RadiusButton>
      </div>
      <div id="active" className="pseudo-active-all">
        <RadiusButton {...args}>Active</RadiusButton>
      </div>
      <div id="hover-active" className="pseudo-hover-all pseudo-active-all">
        <RadiusButton {...args}>Hover Active</RadiusButton>
      </div>
    </div>
  ),
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
  if (state !== 'Disabled') {
    const lowerState = state.toLowerCase();
    const className = `${lowerState} pseudo-${lowerState}-all`;
    return (
      <td key={`${type}-${state}`} className={className}>
        <RadiusButton variant={type}>Action</RadiusButton>
      </td>
    );
  } else {
    return (
      <td key={`${type}-${state}`}>
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
      <thead>
        <tr>
          <th key="index-0"></th>
          {states.map((state, index) => (
            <th key={`index-${index + 1}`}>
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
      </thead>
      <tbody>
        {types.map((type, index) => (
          <tr key={type}>
            <td key={index}>
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
      </tbody>
    </table>
  );
};

export const ButtonVariants = ButtonVariantsTemplateAutomated(
  buttonVariations
).bind({});
