import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens, version } from '@rangle/radius-foundations';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { flattenObject } from '@rangle/radius-shared';
import { AutoLayoutExtendedProps } from './auto-layout.types';

const [major, minor, patch] = version ? version.split('.') : ['0', '0', '0'];

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Auto Layout / Wrap',
  parameters: {
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major,
      minor,
      patch,
    },
    badges: [BADGE.BETA],

    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element or component to render',
      table: { defaultValue: { summary: 'div' } },
    },
    width: {
      options: ['629px', '200px', '50%', 'fill-parent', 'hug-contents'],
    },
    height: {
      options: ['150px', '50%', 'fill-parent', 'hug-contents'],
    },
    space: {
      options: ['auto', ...flattenObject(radiusTokens.core.spacing)],
      table: { defaultValue: { summary: '10px' } },
    },
    padding: {
      options: ['', ...flattenObject(radiusTokens.core.spacing)],
    },
    direction: {
      options: ['horizontal', 'vertical'],
    },
    fill: {
      options: [
        '',
        ...flattenObject(radiusTokens.core.color),
        ...flattenObject(radiusTokens.semantic.color),
        ...flattenObject(radiusTokens.semanticTheme.color),
        ...flattenObject(radiusTokens.component.color),
      ],
    },
    stroke: {
      options: [
        '',
        ...flattenObject(radiusTokens.core.color),
        ...flattenObject(radiusTokens.semantic.color),
        ...flattenObject(radiusTokens.semanticTheme.color),
        ...flattenObject(radiusTokens.component.color),
      ],
    },
    strokeWidth: {
      options: ['', ...flattenObject(radiusTokens.core.borderWidth)],
    },
    opacity: {
      options: ['', ...flattenObject(radiusTokens.core.opacity)],
    },
    x: {
      control: 'text',
    },
    y: {
      control: 'text',
    },
    cornerRadius: {
      options: ['', ...flattenObject(radiusTokens.core.borderRadius)],
    },
    dropShadow: {
      options: ['', ...flattenObject(radiusTokens.core.shadow)],
    },
    innerShadow: {
      options: ['', ...flattenObject(radiusTokens.core.shadow)],
    },
    layerBlur: {
      options: [0, 1, 2, 3],
    },
    backgroundBlur: {
      options: [0, 1, 2, 3],
    },
    // TODO: add grid tokens when ready
    ref: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

export const AutoLayoutWrap: Story = {
  parameters: {
    controls: {
      // exclude grid controls until we've aligned on the direction we want to go with it
      exclude: [
        'grid',
        'gridColSpan',
        'gridColStart',
        'gridColEnd',
        'gridRowSpan',
        'gridRowStart',
        'gridRowEnd',
      ],
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (args: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout
      height={args.direction === 'vertical' ? 388 : undefined}
      width="fill-parent"
    >
      <RadiusAutoLayout alignment="center" isParent {...args}>
        <RadiusAutoLayout
          width={args.direction === 'horizontal' ? 40 : 'fill-parent'}
          height={args.direction === 'horizontal' ? 242 : 40}
          fill={{ css: '#F7856E' }}
          style={{ zIndex: 1 }}
        />
        <RadiusAutoLayout
          width={args.direction === 'horizontal' ? 40 : 'fill-parent'}
          height={args.direction === 'horizontal' ? 242 : 40}
          fill={{ css: '#F7856E' }}
          style={{ zIndex: 1 }}
        />
        <RadiusAutoLayout
          width={args.direction === 'horizontal' ? 40 : 'fill-parent'}
          height={args.direction === 'horizontal' ? 242 : 40}
          fill={{ css: '#F7856E' }}
          style={{ zIndex: 1 }}
        />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  args: {
    as: 'div',
    width: '629px',
    height: 'fill-parent',
    space: 'auto',
    padding: radiusTokens.core.spacing[24],
    direction: 'horizontal',
    fill: radiusTokens.core.color.neutral[50],
    stroke: radiusTokens.core.color.neutral[600],
    strokeWidth: radiusTokens.core.borderWidth[1],
    strokeAlign: 'inside',
    cornerRadius: radiusTokens.core.borderRadius.none,
    clippedContent: false,
    alignment: 'top',
    isParent: false,
    absolutePosition: false,
    horizontalConstraint: 'left',
    verticalConstraint: 'top',
  },
};

/**
 * The `padding` property controls the padding of the Auto Layout component.
 * `padding` can be a single value or a list of values. If a list of values is
 * provided, the values are applied in the following order: top, right, bottom,
 * left.
 *
 * [How Figma Padding works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#padding)
 */
export const NoWrap: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['padding'],
    },
  },
  argTypes: {
    padding: {
      options: {
        '0px': '0px',
        '10px': { css: '10px' },
        '48px 24px': { css: '48px 24px' },
        '10px 20px 30px 40px': { css: '10px 20px 30px 40px' },
      },
    },
  },
  render: (args) => (
    <RadiusAutoLayout
      stroke={{ css: '#006C95' }}
      strokeWidth={{ css: `2px` }}
      padding={{ css: '48px 24px' }}
      style={{
        borderStyle: 'dashed',
      }}
      {...args}
    >
      <RadiusAutoLayout
        width={585}
        space="auto"
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: `2px` }}
        style={{
          borderStyle: 'dashed',
        }}
      >
        <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
        <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
        <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

