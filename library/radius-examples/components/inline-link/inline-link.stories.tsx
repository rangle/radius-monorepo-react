import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusInlineLink } from './inline-link';
import { RadiusInlineLinkExtendedProps } from './inline-link.types';

const meta: Meta<typeof RadiusInlineLink> = {
  component: RadiusInlineLink,
  title: 'Inline Link',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    as: {
      options: ['a', 'button'],
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'Inline Link',
    as: 'a',
    href: '#',
    disabled: false,
    typography: radiusTokens.component.typography.inlineText.label.large,
  },
};

export default meta;
type Story = StoryObj<typeof RadiusInlineLink>;

export const Default: Story = {};

const Cell = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <div
    id={id}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);

const sizes = {
  small: radiusTokens.component.typography.inlineText.label.small,
  large: radiusTokens.component.typography.inlineText.label.large,
};

export const Variants: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (args: RadiusInlineLinkExtendedProps) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 100px)',
        gap: '20px',
        fontFamily: 'Riforma LL',
        fontSize: '20px',
      }}
    >
      <div></div>
      <Cell>Normal</Cell>
      <Cell>Hover</Cell>
      <Cell>Active</Cell>
      <Cell>Disabled</Cell>

      {Object.entries(sizes).map(([key, value]) => (
        <>
          <Cell>{key}</Cell>

          <Cell>
            <RadiusInlineLink {...args} typography={value} />
          </Cell>
          <Cell id="hover">
            <RadiusInlineLink {...args} typography={value} />
          </Cell>
          <Cell id="active">
            <RadiusInlineLink {...args} typography={value} />
          </Cell>
          <Cell>
            <RadiusInlineLink {...args} typography={value} disabled />
          </Cell>
        </>
      ))}
    </div>
  ),
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
    },
  },
};
