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

import SecondaryLogo from '@rangle/radius-foundations/generated/brand/radius/assets/secondary-logo-light.svg';
import PrimaryLogoLight from '@rangle/radius-foundations/generated/brand/radius/assets/primary-logo-light.svg';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

const meta: Meta<typeof RadiusNav> = {
  component: RadiusNav,
  title: 'Radius Examples / Nav',
  parameters: {
    badges: [BADGE.BETA],
    layout: 'fullscreen',
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
            src={SecondaryLogo}
            alt="Rangle.io logo"
            style={{
              height: `var(${radiusTokens.component.sizing.navigation.secondaryLogo})`,
            }}
          />
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <img
            src={PrimaryLogoLight}
            alt="Radius logo"
            style={{
              height: `var(${radiusTokens.component.sizing.navigation.primaryLogo})`,
            }}
          />
        </a>
      </>
    ),
    navItems: [
      { label: 'Menu Item 1', href: '#', selected: true },
      { label: 'Menu Item 2', href: '#' },
      { label: 'Menu Item 3', href: '#' },
      { label: 'Menu Item 4', href: '#' },
    ],
    linkIcons: [
      { icon: Github, href: '#', 'aria-label': 'Descriptive text' },
      { icon: Figma, href: '#', 'aria-label': 'Descriptive text' },
      { icon: EventNote, href: '#', 'aria-label': 'Descriptive text' },
    ],
    socials: [
      { icon: Instagram, href: '#', 'aria-label': 'Descriptive text' },
      { icon: LinkedIn, href: '#', 'aria-label': 'Descriptive text' },
      { icon: Twitter, href: '#', 'aria-label': 'Descriptive text' },
      { icon: Youtube, href: '#', 'aria-label': 'Descriptive text' },
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

export const WithShadow: Story = {
  args: {
    hasShadow: true,
  },
};
