import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { AutoLayoutExtendedProps } from './auto-layout.types';

/**
 * RadiusAutoLayout duplicates the behaviour of Figma Auto Layout's
 * Direction and Spacing properties.
 *
 * ## Resources
 * [How Figma Direction Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#direction)
 *
 * [How Figma Spacing Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#spacing-between)
 */
const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Component Development Kit / Auto Layout/Layout',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/????',
    },
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major: process.env.COMPONENT_VERSION?.[0],
      minor: process.env.COMPONENT_VERSION?.[1],
      patch: process.env.COMPONENT_VERSION?.[2],
    },
    badges: [BADGE.BETA],
    controls: {
      // only show controls relevant to this story
      include: ['direction', 'space', 'width', 'height'],
    },
  },
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
    },
    space: {
      options: {
        auto: 'auto',
        '0px': { css: '0px' },
        '10px': { css: '10px' },
        '80px': { css: '80px' },
      },
      table: { defaultValue: { summary: '10px' } },
    },
    width: {
      options: {
        fixed: '40px',
        'fill-parent': 'fill-parent',
      },
      description:
        'The width of the children. Usually controls the parent, this is just for this example.',
      table: {
        defaultValue: { summary: null },
      },
      if: { arg: 'direction', eq: 'horizontal' },
    },
    height: {
      options: {
        fixed: '40px',
        'fill-parent': 'fill-parent',
      },
      description:
        'The height of the children. Usually controls the parent, this is just for this example.',
      table: {
        defaultValue: { summary: null },
      },
      if: { arg: 'direction', eq: 'vertical' },
    },
  },
  args: {
    direction: 'horizontal',
    space: 'auto',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

const PADDING = 24;
const BORDER_WIDTH = 1;
const CONTAINER_WIDTH = 629;
const CONTAINER_HEIGHT = 388;

const LayoutDemo = ({
  direction,
  space,
  childWidth,
  childHeight,
}: {
  direction?: AutoLayoutExtendedProps['direction'];
  space?: AutoLayoutExtendedProps['space'];
  childWidth?: AutoLayoutExtendedProps['width'];
  childHeight?: AutoLayoutExtendedProps['height'];
}) => {
  return (
    <RadiusAutoLayout
      width={CONTAINER_WIDTH}
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: `${BORDER_WIDTH}px` }}
      height={direction === 'vertical' ? CONTAINER_HEIGHT : undefined}
      padding={{ css: `${PADDING}px` }}
      alignment="center"
      isParent
      direction={direction}
      space={space}
    >
      <RadiusAutoLayout
        width={direction === 'horizontal' ? childWidth ?? 40 : 'fill-parent'}
        height={direction === 'horizontal' ? 242 : childHeight ?? 40}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={direction === 'horizontal' ? childWidth ?? 40 : 'fill-parent'}
        height={direction === 'horizontal' ? 242 : childHeight ?? 40}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={direction === 'horizontal' ? childWidth ?? 40 : 'fill-parent'}
        height={direction === 'horizontal' ? 242 : childHeight ?? 40}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
    </RadiusAutoLayout>
  );
};

export const HorizontalFixedWidthChildrenWithAutoSpacing = {
  render: ({ direction, space, height, width }: AutoLayoutExtendedProps) => (
    <LayoutDemo
      direction={direction}
      space={space}
      childWidth={width}
      childHeight={height}
    />
  ),
};

export const HorizontalFixedWidthChildrenWithDefinedSpacing: Story = {
  render: () => <LayoutDemo direction="horizontal" space={{ css: '80px' }} />,
};

export const HorizontalFillWidthChildrenWithDefinedSpacing: Story = {
  render: () => (
    <LayoutDemo
      direction="horizontal"
      space={{ css: '80px' }}
      childWidth="fill-parent"
    />
  ),
};

export const VerticalFixedHeightChildrenWithAutoSpacing: Story = {
  render: () => <LayoutDemo direction="vertical" space="auto" />,
};

export const VerticalFixedHeightChildrenWithDefinedSpacing: Story = {
  render: () => <LayoutDemo direction="vertical" space={{ css: '50px' }} />,
};

export const VerticalFillHeightChildrenWithDefinedSpacing: Story = {
  render: () => (
    <LayoutDemo
      direction="vertical"
      space={{ css: '50px' }}
      childHeight="fill-parent"
    />
  ),
};
