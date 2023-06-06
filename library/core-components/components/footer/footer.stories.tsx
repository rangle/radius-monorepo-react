import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import {
  ArrowRight,
  Instagram,
  LinkedIn,
  Twitter,
  Youtube,
} from '@rangle/radius-foundations/generated/icons';

import RangleLogoLight from '../../../../radius/assets/rangle-logo-light.svg';
import { RadiusFooter } from './footer';

const meta: Meta<typeof RadiusFooter> = {
  component: RadiusFooter,
  title: 'Radius Examples / Footer',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'footer' },
      },
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    logo: (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a href="#">
        <img src={RangleLogoLight} alt="Rangle Logo" />
      </a>
    ),
    pageLinks: [
      { children: 'Design', href: '#', iconRight: ArrowRight },
      { children: 'Development', href: '#', iconRight: ArrowRight },
      { children: 'Resources', href: '#', iconRight: ArrowRight },
      { children: 'Components', href: '#', iconRight: ArrowRight },
    ],
    inquiriesHeader: 'General Inquiries',
    inquiriesLinks: [
      {
        children: 'info@rangle.io',
        href: '#',
      },
      {
        children: '1 416-737-1555',
        href: '#',
      },
    ],
    newsLetterHeader: 'Our newsletter',
    newsLetterLinks: [
      { children: 'Sign up', href: '#', iconRight: ArrowRight },
    ],
    copyright: '© Rangle.io, 2023.  All rights reserved.',
    privacyPolicy: {
      children: 'Privacy Policy',
      href: '#',
    },
    connectLinkIcons: [
      { icon: Twitter, href: '#', 'aria-label': 'Descriptive text' },
      { icon: LinkedIn, href: '#', 'aria-label': 'Descriptive text' },
      { icon: Instagram, href: '#', 'aria-label': 'Descriptive text' },
      { icon: Youtube, href: '#', 'aria-label': 'Descriptive text' },
    ],
    connectButtonProps: {
      children: 'Get in touch',
      rightIcon: ArrowRight,
      as: 'a',
      href: '#',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadiusFooter>;

export const Default: Story = {};
