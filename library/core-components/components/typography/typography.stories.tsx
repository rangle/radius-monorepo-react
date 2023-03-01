import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';

export default {
  component: Typography,
  title: `Core Components/Typography`,
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
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
      defaultValue: 'var(--color-text-on-base-primary)',
    },
    font: {
      defaultValue: 'var(--typography-body-md)',
    },
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (
  args: ComponentProps<typeof Typography>
) => (
  <div>
    <Typography {...args} />
  </div>
);

export const Default: typeof Template = Template.bind({});
Default.storyName = 'Typography';
Default.args = {};
