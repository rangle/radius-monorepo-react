import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusHero, RadiusHeroProps } from './hero';

const meta: Meta<RadiusHeroProps> = {
  component: RadiusHero,
  title: 'Hero',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {
    header: 'Header',
    eyebrow: 'Eyebrow',
    buttonLabel: 'Action',
    imageSrc: 'https://via.placeholder.com/1500',
    ctaUrl: '#',
  },
};

export default meta;
type Story = StoryObj<RadiusHeroProps>;

export const Default: Story = {};
