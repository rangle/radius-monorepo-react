import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';

export default {
  component: Typography,
  title: `Core Components/Typography`,
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
    componentSubtitle:
      'This Polymorphic component provides an interface to apply styles and semantics to text content.',
  },
  argTypes: {
    children: {
      type: { name: 'string', required: true },
      defaultValue: 'Hello World!',
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
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (
  args: ComponentProps<typeof Typography>
) => <Typography {...args} />;

export const Default: typeof Template = Template.bind({});
Default.args = {};

export const Example: ComponentStory<typeof Typography> = () => (
  <div>
    <Typography font="--typography-heading-xl">Title</Typography>
    <Typography color="--color-text-on-base-accent">
      Some body text. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Fuga, blanditiis.
    </Typography>
    <Typography
      font="--typography-body-sm"
      color="--color-text-on-base-secondary"
      align="right"
    >
      *Footnote
    </Typography>
  </div>
);
Example.parameters = {
  controls: {
    disable: true,
  },
};
