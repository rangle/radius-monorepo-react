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
import { RadiusNavItem } from '../nav-item';
import { RadiusLinkIcon } from '../link-icon';
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
        <RadiusNavItem href="#" selected>
          Menu Item 1
        </RadiusNavItem>
        <RadiusNavItem href="#">Menu Item 2</RadiusNavItem>
        <RadiusNavItem href="#">Menu Item 3</RadiusNavItem>
        <RadiusNavItem href="#">Menu Item 4</RadiusNavItem>
      </>
    ),
    linkIcons: (
      <>
        <RadiusLinkIcon
          icon={Github}
          size={radiusTokens.component.sizing.linkIcon.large}
          href="#"
        />
        <RadiusLinkIcon
          icon={Figma}
          size={radiusTokens.component.sizing.linkIcon.large}
          href="#"
        />
        <RadiusLinkIcon
          icon={EventNote}
          size={radiusTokens.component.sizing.linkIcon.large}
          href="#"
        />
      </>
    ),
    socials: (
      <>
        <RadiusLinkIcon
          icon={Instagram}
          size={radiusTokens.component.sizing.linkIcon.medium}
          href="#"
        />
        <RadiusLinkIcon
          icon={LinkedIn}
          size={radiusTokens.component.sizing.linkIcon.medium}
          href="#"
        />
        <RadiusLinkIcon
          icon={Twitter}
          size={radiusTokens.component.sizing.linkIcon.medium}
          href="#"
        />
        <RadiusLinkIcon
          icon={Youtube}
          size={radiusTokens.component.sizing.linkIcon.medium}
          href="#"
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

// TODO: create generic placeholder story (to demonstrate layout), and one with actual content
