import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusHero } from './hero';

export default {
  component: RadiusHero,
  title: `Core Components/Hero`,
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    title: {
      type: { name: 'string', required: true },
      defaultValue: 'Design systems, Accelerated',
      control: {
        type: 'text',
      },
    },
    eyebrow: {
      type: { name: 'string', required: true },
      defaultValue: 'For business',
      control: {
        type: 'text',
      },
    },
    buttonLabel: {
      type: { name: 'string', required: true },
      defaultValue: 'Get info',
      control: {
        type: 'text',
      },
    },
    imageSrc: {
      type: { name: 'string', required: true },
      defaultValue: 'https://via.placeholder.com/1500',
      control: {
        type: 'text',
      },
    },
    ctaUrl: {
      type: { name: 'string', required: true },
      defaultValue: '#',
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof RadiusHero>;

const Template: ComponentStory<typeof RadiusHero> = (
  args: ComponentProps<typeof RadiusHero>
) => (
  <div>
    <RadiusHero {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
