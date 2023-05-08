import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { AccountCircle } from '@rangle/radius-foundations/generated/icons';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkIcon } from './link-icon';
import { flattenObject } from '../../utils';
import { RadiusLinkIconExtendedProps } from './link-icon.types';

const meta: Meta<typeof RadiusLinkIcon> = {
  component: RadiusLinkIcon,
  title: 'Link Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    as: {
      options: ['a', 'button'],
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    size: {
      options: flattenObject(radiusTokens.component.sizing.linkIcon),
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    as: 'a',
    href: '#',
    'aria-label': 'Descriptive text',
    icon: AccountCircle,
    size: radiusTokens.component.sizing.linkIcon.medium,
  },
};

export default meta;
type Story = StoryObj<typeof RadiusLinkIcon>;

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
  Small: radiusTokens.component.sizing.linkIcon.small,
  Medium: radiusTokens.component.sizing.linkIcon.medium,
  Large: radiusTokens.component.sizing.linkIcon.large,
};

export const Variants: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (args: RadiusLinkIconExtendedProps) => (
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
            <RadiusLinkIcon {...args} size={value} />
          </Cell>
          <Cell id="hover">
            <RadiusLinkIcon {...args} size={value} />
          </Cell>
          <Cell id="active">
            <RadiusLinkIcon {...args} size={value} />
          </Cell>
          <Cell>
            <RadiusLinkIcon {...args} size={value} disabled />
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
