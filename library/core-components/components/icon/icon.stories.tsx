import React from 'react';
import { Meta, StoryObj, ArgTypes, Args } from '@storybook/react';

import { RadiusIcon } from '.';
import * as icons from '@rangle/radius-foundations/generated/icons';

const meta: Meta<typeof RadiusIcon> = {
  component: RadiusIcon,
  title: 'Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    component: {
      table: {
        disable: true,
      },
    },
    fill: {
      control: {
        type: 'select',
      },
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
        '--color-background-base',
        '--color-background-subtle',
        '--color-background-accent',
        '--color-background-inverse',
        '--color-interaction-primary-default',
        '--color-interaction-primary-hover',
        '--color-interaction-primary-active',
        '--color-interaction-primary-focus',
        '--color-interaction-primary-disabled',
        '--color-interaction-secondary-default',
        '--color-interaction-secondary-hover',
        '--color-interaction-secondary-active',
        '--color-interaction-secondary-focus',
        '--color-interaction-secondary-disabled',
        '--color-interaction-tertiary-default',
        '--color-interaction-tertiary-hover',
        '--color-interaction-tertiary-active',
        '--color-interaction-tertiary-focus',
        '--color-interaction-tertiary-disabled',
      ],
      defaultValue: 'currentColor',
    },
  } as ArgTypes,
  args: {
    fill: '--color-text-on-base-primary',
    size: 'medium',
  } as Args,
};

export default meta;
type Story = StoryObj<typeof RadiusIcon>;

export const AllIcons: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 85px)',
        gap: '1rem',
        margin: '1rem',
      }}
    >
      {icons &&
        Object.entries(icons).map(([iconName, icon]) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: '85px',
            }}
          >
            <RadiusIcon component={icon} {...args} />
            <span
              style={{
                font: '400 0.75rem/150% Riforma LL',
              }}
            >
              {iconName}
            </span>
          </div>
        ))}
    </div>
  ),
};

const customSVGPath = 'M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z';

export const CustomSVGPath: Story = {
  args: {
    path: customSVGPath,
  } as Args,
};
