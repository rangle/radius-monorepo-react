import React from 'react';
import { Meta, StoryObj, ArgTypes, Args } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
    componentSubtitle:
      'This Polymorphic component provides an interface to apply styles and semantics to text content.',
  },
  argTypes: {
    children: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    as: {
      defaultValue: 'p',
    },
    align: {
      defaultValue: 'left',
    },
    color: {
      defaultValue: '--color-text-on-base-primary',
      options: [
        '--color-text-on-base-primary',
        '--color-text-on-base-secondary',
        '--color-text-on-base-accent',
        '--color-text-on-base-disabled',
        '--color-text-inverse-primary',
        '--color-text-inverse-secondary',
        '--color-text-inverse-accent',
        '--color-text-on-subtle-primary',
        '--color-text-on-subtle-secondary',
        '--color-text-on-subtle-accent',
        '--color-text-on-subtle-disabled',
        '--color-text-on-accent-primary',
        '--color-text-on-accent-secondary',
        '--color-text-on-accent-disabled',
        '--color-text-primary-action-default',
        '--color-text-primary-action-hover',
        '--color-text-primary-action-active',
        '--color-text-primary-action-focus',
        '--color-text-primary-action-disabled',
        '--color-text-secondary-action-default',
        '--color-text-secondary-action-hover',
        '--color-text-secondary-action-active',
        '--color-text-secondary-action-focus',
        '--color-text-secondary-action-disabled',
        '--color-text-tertiary-action-default',
        '--color-text-tertiary-action-hover',
        '--color-text-tertiary-action-active',
        '--color-text-tertiary-action-focus',
        '--color-text-tertiary-action-disabled',
      ],
      control: 'select',
    },
    font: {
      defaultValue: '--typography-body-md',
      options: [
        '--typography-heading-xxl',
        '--typography-heading-xl',
        '--typography-heading-lg',
        '--typography-heading-md',
        '--typography-heading-sm',
        '--typography-heading-xs',
        '--typography-body-xl',
        '--typography-body-md',
        '--typography-body-sm',
        '--typography-link-sm',
        '--typography-btn-lg',
        '--typography-btn-md',
        '--typography-btn-sm',
      ],
      control: 'select',
    },
  } as ArgTypes, // TODO: Fix argTypes inference (broken due to polymorphic implementation?). This assertion is a workaround.
  args: {
    children: 'Hello World!',
    as: 'p',
    align: 'left',
    color: '--color-text-on-base-primary',
    font: '--typography-body-md',
  } as Args, // TODO: Fix args inference (broken due to polymorphic implementation?). This assertion is a workaround.
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Basic: Story = {};

export const Example: Story = {
  render: () => (
    <div>
      <Typography font="--typography-heading-xl">Title</Typography>
      <Typography color="--color-text-on-base-accent">
        Some body text. Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Fuga, blanditiis.
      </Typography>
      <Typography
        font="--typography-body-sm"
        color="--color-text-on-base-secondary"
        align="right"
      >
        *Footnote
      </Typography>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
