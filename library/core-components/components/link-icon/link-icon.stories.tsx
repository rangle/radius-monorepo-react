import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { AccountCircle } from '@rangle/radius-foundations/generated/icons';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkIcon, RadiusLinkIconProps } from './link-icon';
import { flattenObject } from '../../utils';

const meta: Meta<RadiusLinkIconProps> = {
  component: RadiusLinkIcon,
  title: 'Link Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    size: {
      options: flattenObject(radiusTokens.component.sizing.linkIcon),
    },
    className: { table: { disable: true } },
  },
  args: {
    href: '#',
    icon: AccountCircle,
    size: radiusTokens.component.sizing.linkIcon.medium,
  },
};

export default meta;
type Story = StoryObj<RadiusLinkIconProps>;

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
  render: (args) => (
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
