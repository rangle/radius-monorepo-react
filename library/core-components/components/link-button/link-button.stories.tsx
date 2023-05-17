import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
// import { AccountCircle } from '@rangle/radius-foundations/generated/icons';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkButton } from './link-button';
import { flattenObject } from '../../utils';
import { RadiusLinkButtonExtendedProps } from './link-button.types';

const meta: Meta<typeof RadiusLinkButton> = {
  component: RadiusLinkButton,
  title: 'Link Button',
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
    // size: {
    //   options: flattenObject(radiusTokens.core.sizing),
    // },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  // decorators: [
  //   (Story) => (
  //     <div style={{ display: 'flex' }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
  args: {
    // as: 'a',
    // href: '#',
    // 'aria-label': 'Descriptive text',
    // icon: AccountCircle,
    // size: radiusTokens.core.sizing[24],
    children: 'Link Button',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusLinkButton>;

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
  '16px': radiusTokens.core.sizing[16],
  '24px': radiusTokens.core.sizing[24],
  '32px': radiusTokens.core.sizing[32],
};

export const Variants: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (args: RadiusLinkButtonExtendedProps) => (
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
            {/* @ts-expect-error - core tokens not allowed in `size` prop */}
            <RadiusLinkButton {...args} size={value} />
          </Cell>
          <Cell id="hover">
            {/* @ts-expect-error - core tokens not allowed in `size` prop */}
            <RadiusLinkButton {...args} size={value} />
          </Cell>
          <Cell id="active">
            {/* @ts-expect-error - core tokens not allowed in `size` prop */}
            <RadiusLinkButton {...args} size={value} />
          </Cell>
          <Cell>
            {/* @ts-expect-error - core tokens not allowed in `size` prop */}
            <RadiusLinkButton {...args} size={value} disabled />
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
