import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusLinkButton } from './link-button';
import { ArrowRight } from '@rangle/radius-foundations';

const meta: Meta<typeof RadiusLinkButton> = {
  component: RadiusLinkButton,
  title: 'Link Button',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'a' },
      },
    },
    ref: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusLinkButton>;

export const Default: Story = {
  args: {
    children: 'Link Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'With Right Icon',
    iconRight: ArrowRight,
  },
};

export const LinkButtonStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
      <div>
        <RadiusLinkButton {...args}>Normal</RadiusLinkButton>
      </div>
      <div className="pseudo-hover-all">
        <RadiusLinkButton {...args}>Hover</RadiusLinkButton>
      </div>
      <div className="pseudo-active-all">
        <RadiusLinkButton {...args}>Active</RadiusLinkButton>
      </div>
      <div>
        <RadiusLinkButton {...args} disabled>
          Disabled
        </RadiusLinkButton>
      </div>
    </div>
  ),
};
