import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';
import { flattenObject } from '../../utils';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
  parameters: {
    badges: [BADGE.BETA],
    componentSubtitle:
      'This Polymorphic component provides an interface to apply styles and semantics to text content.',
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
      }),
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
    font: radiusTokens.core.typography.desktop.body.md,
    fill: radiusTokens.component.color.button.secondary.default.label,
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};
