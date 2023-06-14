import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusHero, RadiusHeroProps } from './hero';
import { RadiusAutoLayout } from '../auto-layout/auto-layout';

const meta: Meta<RadiusHeroProps> = {
  component: RadiusHero,
  title: 'Radius Examples / Hero',
  parameters: {
    badges: [BADGE.BETA],
    layout: 'fullscreen',
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {
    header: 'Header',
    eyebrow: 'Eyebrow',
    image: (
      <RadiusAutoLayout
        as="img"
        width="fill-parent"
        height="fill-parent"
        src="https://via.placeholder.com/1500"
        alt="Image Description"
      />
    ),
    buttonLabel: 'Action',
    ctaUrl: '#',
  },
};

export default meta;
type Story = StoryObj<RadiusHeroProps>;

export const Default: Story = {};
