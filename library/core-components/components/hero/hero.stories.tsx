import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusHero, RadiusHeroProps } from './hero';

const meta: Meta<RadiusHeroProps> = {
  component: RadiusHero,
  title: 'Radius Examples / Hero',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {
    header: 'Header',
    eyebrow: 'Eyebrow',
    imageSrc: 'https://via.placeholder.com/1500',
    imageAlt: 'Image Description',
    buttonLabel: 'Action',
    ctaUrl: '#',
  },
};

export default meta;
type Story = StoryObj<RadiusHeroProps>;

export const Default: Story = {};
