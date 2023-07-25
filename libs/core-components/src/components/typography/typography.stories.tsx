import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens, version } from '@rangle/radius-foundations';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';
import { flattenObject } from '@rangle/radius-shared';

const [major, minor, patch] = version ? version.split('.') : ['0', '0', '0'];

const bySubtoken =
  <T extends string>(name: string) =>
  (token: T) =>
    token.match(`${name}$`);

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
  parameters: {
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major,
      minor,
      patch,
    },
    badges: [BADGE.BETA],
  },
  argTypes: {
    children: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    as: {
      table: {
        defaultValue: { summary: 'p' },
      },
    },
    fill: {
      options: flattenObject(radiusTokens.component.color),
    },
    font: {
      options: flattenObject({
        core: radiusTokens.core.typography,
        semantic: radiusTokens.semantic.typography,
        component: radiusTokens.component.typography,
      }).filter(bySubtoken('font')),
    },
    fontFamily: {
      options: flattenObject(radiusTokens.core.fontFamilies),
    },
    lineHeight: {
      options: flattenObject(radiusTokens.core.lineHeights),
    },
    fontWeight: {
      options: flattenObject(radiusTokens.core.fontWeights),
    },
    fontSize: {
      options: flattenObject(radiusTokens.core.fontSize),
    },
    letterSpacing: {
      options: flattenObject(radiusTokens.core.letterSpacing),
    },
    textDecoration: {
      options: flattenObject(radiusTokens.core.textDecoration),
    },
    ref: { table: { disable: true } },
  },
  args: {
    children: 'Hello World!',
    as: 'p',
    align: 'left',
    font: radiusTokens.component.typography.inlineText.label.large.font,
    fill: radiusTokens.component.color.button.secondary.default.label,
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};
