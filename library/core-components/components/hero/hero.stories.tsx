import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusHero, HeroProps } from './hero';

const meta: Meta<HeroProps> = {
  component: RadiusHero,
  title: 'Hero',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    title: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    eyebrow: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    buttonLabel: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    imageSrc: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    ctaUrl: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
  },
  args: {
    title: 'Design systems, Accelerated',
    eyebrow: 'For business',
    buttonLabel: 'Get info',
    imageSrc: 'https://via.placeholder.com/1500',
    ctaUrl: '#',
  },
};

export default meta;
type Story = StoryObj<HeroProps>;

export const Default: Story = {};
