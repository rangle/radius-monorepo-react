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

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusNav } from './nav';
import { RadiusNavItem } from '../nav-item';
import { RadiusLinkIcon } from '../link-icon';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

const meta: Meta<typeof RadiusNav> = {
  component: RadiusNav,
  title: 'Nav',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
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
    label: 'Menu Item',
    href: '#',
    logos: (
      <>
        <p>logo 1</p>
        <p>logo 2</p>
      </>
    ),
    navItems: (
      <>
        <RadiusNavItem selected>Menu Item 1</RadiusNavItem>
        <RadiusNavItem>Menu Item 2</RadiusNavItem>
        <RadiusNavItem>Menu Item 3</RadiusNavItem>
        <RadiusNavItem>Menu Item 4</RadiusNavItem>
      </>
    ),
    linkIcons: (
      <>
        <RadiusLinkIcon
          icon={Github}
          size={radiusTokens.component.sizing.linkIcon.large}
        />
        <RadiusLinkIcon
          icon={Figma}
          size={radiusTokens.component.sizing.linkIcon.large}
        />
        <RadiusLinkIcon
          icon={EventNote}
          size={radiusTokens.component.sizing.linkIcon.large}
        />
      </>
    ),
    socials: (
      <>
        <RadiusLinkIcon
          icon={Instagram}
          size={radiusTokens.component.sizing.linkIcon.medium}
        />
        <RadiusLinkIcon
          icon={LinkedIn}
          size={radiusTokens.component.sizing.linkIcon.medium}
        />
        <RadiusLinkIcon
          icon={Twitter}
          size={radiusTokens.component.sizing.linkIcon.medium}
        />
        <RadiusLinkIcon
          icon={Youtube}
          size={radiusTokens.component.sizing.linkIcon.medium}
        />
      </>
    ),
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
