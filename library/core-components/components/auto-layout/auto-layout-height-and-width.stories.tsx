import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { AutoLayoutExtendedProps } from './auto-layout.types';

/**
 * RadiusAutoLayout duplicates the behaviour of Figma Auto Layout's
 * Width and Height properties.
 *
 * Notes:
 * - For `fill-parent` to work, the parent must have a defined width or
 * height (depending on which property you're setting).
 * - The `hug-contents` property requires the parent container to be a
 * flex-container (ie. a `RadiusAutoLayout` component), with the `direction`
 * property set to same direction as the child. Otherwise, the children will
 * behave as if `fill-parent` was set.
 *
 * ## Resources
 * [How Figma Resizing Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#resizing)
 */
const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Component Development Kit / Auto Layout / Width and Height',
  parameters: {
    // Version is rendered by this plugin https://github.com/silversonicaxel/storybook-addon-versioning
    version: {
      major: process.env.COMPONENT_VERSION?.[0],
      minor: process.env.COMPONENT_VERSION?.[1],
      patch: process.env.COMPONENT_VERSION?.[2],
    },
    badges: [BADGE.BETA],
    controls: {
      // only show controls relevant to this story
      include: ['width', 'height', 'direction'],
    },
  },
  argTypes: {
    direction: {
      options: ['horizontal', 'vertical'],
    },
    width: {
      options: ['400px', 'hug-contents', '50%', 'fill-parent'],
      if: { arg: 'direction', eq: 'horizontal' },
    },
    height: {
      options: ['400px', 'hug-contents', '50%', 'fill-parent'],
      if: { arg: 'direction', eq: 'vertical' },
    },
  },
  args: {
    direction: 'horizontal',
    width: 'fill-parent',
    height: 'fill-parent',
  },
  decorators: [
    (Story, context) => (
      <div
        style={{
          display: 'flex',
          flexDirection:
            context.args.direction === 'vertical' ? 'column' : 'row',
          height: context.args.direction === 'vertical' ? 500 : undefined,
          width: context.args.direction === 'vertical' ? 374 : undefined,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

const WidthAndHeightDemo = ({
  height,
  width,
  direction,
}: {
  direction?: AutoLayoutExtendedProps['direction'];
  width?: AutoLayoutExtendedProps['width'];
  height?: AutoLayoutExtendedProps['height'];
}) => {
  return (
    <RadiusAutoLayout
      width={width}
      height={height}
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: `1px` }}
      padding={{ css: '10px' }}
      direction={direction}
      space="auto"
    >
      <RadiusAutoLayout
        width={direction === 'horizontal' ? 64 : 352}
        height={direction === 'horizontal' ? 352 : 64}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={direction === 'horizontal' ? 64 : 352}
        height={direction === 'horizontal' ? 352 : 64}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={direction === 'horizontal' ? 64 : 352}
        height={direction === 'horizontal' ? 352 : 64}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
    </RadiusAutoLayout>
  );
};

export const WidthAndHeight: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ direction, height, width }: AutoLayoutExtendedProps) => (
    <WidthAndHeightDemo direction={direction} height={height} width={width} />
  ),
};

export const FixedWidth: Story = {
  ...WidthAndHeight,
  args: {
    width: '400px',
  },
};

export const HugContents: Story = {
  ...WidthAndHeight,
  args: {
    width: 'hug-contents',
  },
};

export const FiftyPercent: Story = {
  ...WidthAndHeight,
  args: {
    width: '50%',
  },
};

export const FillParent: Story = {
  ...WidthAndHeight,
  args: {
    width: 'fill-parent',
  },
};
