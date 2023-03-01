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
      defaultValue: 'var(--color-text-on-base-primary)',
    },
    font: {
      defaultValue: 'var(--typography-body-md)',
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
    <Typography font="var(--typography-heading-xl)">Title</Typography>
    <Typography color="var(--color-text-on-base-accent)">
      Some body text. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Fuga, blanditiis.
    </Typography>
    <Typography
      font="var(--typography-body-sm)"
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
