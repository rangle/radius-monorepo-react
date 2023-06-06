import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { AutoLayoutExtendedProps } from './auto-layout.types';

const alignmentOptions = [
  'topLeft',
  'topCenter',
  'topRight',
  'left',
  'center',
  'right',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
] as const;

/**
 * The RadiusAutoLayout component duplicates the behaviour of Figma AutoLayout's
 * Alignment property. This deviates from how CSS flexbox works in some cases -
 * for example when the `direction` is changed, the alignment of the children
 * remains the same instead of being dependent on the flex-direction. Also, when
 * the `space` property is set to `auto`, this is equivalent to writing
 * `justify-content: space-between`, which evenly spaces children regardless of
 * direction.
 *
 * Please see the examples of the different behaviours below.
 *
 * ## Resources
 * [How Figma Alignment Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#alignment)
 *
 * [RadiusAutoLayout Figma Specs](https://www.figma.com/file/ODAUZaQxH8oH2GI0A9MAVb/Radius-Booster---Auto-Layout?type=design&node-id=1302-3736&t=Fh2ap7gIybG92aBU-0)
 */
const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Component Development Kit / Auto Layout / Alignment',
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
      include: ['alignment', 'direction', 'space'],
    },
  },
  argTypes: {
    alignment: {
      options: alignmentOptions,
    },
    direction: {
      options: ['horizontal', 'vertical'],
    },
    space: {
      options: {
        auto: 'auto',
        fixed: { css: '10px' },
      },
      table: { defaultValue: { summary: '10px' } },
    },
  },
  args: {
    alignment: 'topLeft',
    direction: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

const PADDING = 24;
const CIRCLE_SIZE = 12;

/** A circle to show the alignment of the child AutoLayouts */
const Circle = ({
  top,
  left,
  bottom,
  right,
}: {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
}) => {
  return (
    <div
      style={{
        backgroundColor: '#D9D9D9',
        height: CIRCLE_SIZE,
        width: CIRCLE_SIZE,
        borderRadius: '50%',
        position: 'absolute',
        top,
        left,
        bottom,
        right,
      }}
    ></div>
  );
};

/** The positions of each of the circles */
const circles = [
  { top: PADDING, left: PADDING },
  { top: PADDING, left: `calc(50% - ${CIRCLE_SIZE / 2}px)` },
  { top: PADDING, right: PADDING },
  { top: `calc(50% - ${CIRCLE_SIZE / 2}px)`, left: PADDING },
  {
    top: `calc(50% - ${CIRCLE_SIZE / 2}px)`,
    left: `calc(50% - ${CIRCLE_SIZE / 2}px)`,
  },
  { top: `calc(50% - ${CIRCLE_SIZE / 2}px)`, right: PADDING },
  { bottom: PADDING, left: PADDING },
  { bottom: PADDING, left: `calc(50% - ${CIRCLE_SIZE / 2}px)` },
  { bottom: PADDING, right: PADDING },
];

const AlignmentDemo = ({
  alignment,
  direction,
  space,
}: {
  alignment: AutoLayoutExtendedProps['alignment'];
  direction: AutoLayoutExtendedProps['direction'];
  space: AutoLayoutExtendedProps['space'];
}) => {
  return (
    <RadiusAutoLayout
      width="284px"
      height="284px"
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: '1px' }}
      padding={{ css: `${PADDING}px` }}
      alignment={alignment}
      direction={direction}
      space={space}
      isParent
    >
      <RadiusAutoLayout
        width={25}
        height={25}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={25}
        height={25}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      <RadiusAutoLayout
        width={25}
        height={25}
        fill={{ css: '#F7856E' }}
        style={{ zIndex: 1 }}
      />
      {circles.map((positionProps) => (
        <Circle {...positionProps} />
      ))}
    </RadiusAutoLayout>
  );
};

export const Alignment: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ alignment, direction, space }: AutoLayoutExtendedProps) => (
    <AlignmentDemo alignment={alignment} direction={direction} space={space} />
  ),
};

const GridTemplate = ({ direction, space }: AutoLayoutExtendedProps) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }}
    >
      {alignmentOptions.map((alignmentOption) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 12,
            fontFamily: 'Riforma LL',
            textAlign: 'center',
          }}
        >
          <h3>Alignment {alignmentOption}</h3>
          <AlignmentDemo
            alignment={alignmentOption}
            direction={direction}
            space={space}
          />
        </div>
      ))}
    </div>
  );
};

export const VerticalWithFixedSpacing: Story = {
  render: () => <GridTemplate direction="vertical" />,
};

export const HorizontalWithFixedSpacing: Story = {
  render: () => <GridTemplate direction="horizontal" />,
};

export const VerticalWithAutoSpacing: Story = {
  render: () => <GridTemplate direction="vertical" space="auto" />,
};

export const HorizontalWithAutoSpacing: Story = {
  render: () => <GridTemplate direction="horizontal" space="auto" />,
};
