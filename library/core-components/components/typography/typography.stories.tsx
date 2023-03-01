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
      defaultValue: 'div',
    },
    align: {
      defaultValue: 'left',
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

export const Default = Template.bind({});
Default.args = {};
