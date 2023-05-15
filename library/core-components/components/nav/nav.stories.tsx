import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Github,
  Figma,
  EventNote,
  Instagram,
  LinkedIn,
  Twitter,
  Youtube,
} from '@rangle/radius-foundations/generated/icons';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusNav } from './nav';

import RangleLogoLight from '../../../../radius/assets/rangle-logo-light.svg';
import RadiusLogoLight from '../../../../radius/assets/radius-logo-light.svg';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

const meta: Meta<typeof RadiusNav> = {
  component: RadiusNav,
  title: 'Nav',
  parameters: {
    badges: [BADGE.EXPERIMENTAL],
  },
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: 'nav' },
      },
    },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    // TODO: make image src dynamic based on token (WIP)
    // TODO: apply height to all logos as children?
    logos: (
      <>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <img
            src={RangleLogoLight}
            alt="Rangle.io logo"
            style={{
              height: `var(${radiusTokens.component.sizing.navigation.secondaryLogo})`,
            }}
          />
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <img
            src={RadiusLogoLight}
            alt="Radius logo"
            style={{
              height: `var(${radiusTokens.component.sizing.navigation.primaryLogo})`,
            }}
          />
        </a>
      </>
    ),
    // TODO: maybe better to use `label` instead of `children` if this is how we're implementing it
    navItems: [
      { children: 'Menu Item 1', href: '#', selected: true },
      { children: 'Menu Item 2', href: '#' },
      { children: 'Menu Item 3', href: '#' },
      { children: 'Menu Item 4', href: '#' },
    ],
    linkIcons: [
      { icon: Github, href: '#' },
      { icon: Figma, href: '#' },
      { icon: EventNote, href: '#' },
    ],
    socials: [
      { icon: Instagram, href: '#' },
      { icon: LinkedIn, href: '#' },
      { icon: Twitter, href: '#' },
      { icon: Youtube, href: '#' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadiusNav>;

export const Default: Story = {};

// TODO: create generic placeholder story (to demonstrate layout), and one with actual content
