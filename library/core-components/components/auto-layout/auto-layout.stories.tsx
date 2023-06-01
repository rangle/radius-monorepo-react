import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { RadiusButton } from '../button/button';
import { flattenObject } from '../../utils';
import { AutoLayoutExtendedProps } from './auto-layout.types';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Component Development Kit / Auto Layout',
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

    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element or component to render',
      table: { defaultValue: { summary: 'div' } },
    },
    width: {
      options: ['200px', '50%', 'fill-parent', 'hug-contents'],
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
        ...flattenObject(radiusTokens.semantic.color),
        ...flattenObject(radiusTokens.semanticTheme.color),
        ...flattenObject(radiusTokens.component.color),
      ],
    },
    stroke: {
      options: [
        '',
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

export const AutoLayout: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (args: AutoLayoutExtendedProps) => (
    <div style={{ display: 'flex', height: 200 }}>
      <RadiusAutoLayout {...args}>
        <RadiusAutoLayout
          width={100}
          height={args.direction !== 'vertical' ? 'fill-parent' : '25%'}
          fill={{ css: '#D44527' }}
        />
        <RadiusAutoLayout
          width={100}
          height={args.direction !== 'vertical' ? 'fill-parent' : '25%'}
          fill={{ css: '#D44527' }}
        />
        <RadiusAutoLayout
          width={100}
          height={args.direction !== 'vertical' ? 'fill-parent' : '25%'}
          fill={{ css: '#D44527' }}
        />
      </RadiusAutoLayout>
    </div>
  ),
  args: {
    as: 'div',
    alignment: 'top',
    width: 'fill-parent',
    height: 'fill-parent',
    space: 'auto',
    padding: radiusTokens.core.spacing[4],
    fill: { css: 'white' },
    stroke: { css: 'black' },
    strokeWidth: radiusTokens.core.borderWidth[2],
    cornerRadius: radiusTokens.core.borderRadius.none,
    clippedContent: false,
    isParent: false,
    absolutePosition: false,
    horizontalConstraint: 'left',
    verticalConstraint: 'top',
  },
};

/**
 * [How Figma Padding works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#padding)
 */
export const Padding: Story = {
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

export const Opacity: Story = {
  render: () => (
    <RadiusAutoLayout width="fill-parent">
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        // @ts-expect-error - opacity type needs refinement
        opacity={radiusTokens.core.opacity['90percent']}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        fill={{ css: '#262626' }}
        alignment="center"
        style={{
          justifyContent: 'center', // only needed until alignment changes are merged
        }}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Riforma LL',
            fontSize: '20px',
          }}
        >
          90%
        </span>
      </RadiusAutoLayout>
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        // @ts-expect-error - opacity type needs refinement
        opacity={radiusTokens.core.opacity['65percent']}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        fill={{ css: '#262626' }}
        alignment="center"
        style={{
          justifyContent: 'center', // only needed until alignment changes are merged
        }}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Riforma LL',
            fontSize: '20px',
          }}
        >
          65%
        </span>
      </RadiusAutoLayout>
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        // @ts-expect-error - opacity type needs refinement
        opacity={radiusTokens.core.opacity['35percent']}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        fill={{ css: '#262626' }}
        alignment="center"
        style={{
          justifyContent: 'center', // only needed until alignment changes are merged
        }}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Riforma LL',
            fontSize: '20px',
          }}
        >
          35%
        </span>
      </RadiusAutoLayout>
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        // @ts-expect-error - opacity type needs refinement
        opacity={radiusTokens.core.opacity['25percent']}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        fill={{ css: '#262626' }}
        alignment="center"
        style={{
          justifyContent: 'center', // only needed until alignment changes are merged
        }}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Riforma LL',
            fontSize: '20px',
          }}
        >
          25%
        </span>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Fill: Story = {
  render: () => (
    <RadiusAutoLayout width="fill-parent">
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={radiusTokens.core.color.red[400]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={radiusTokens.core.color.orange[50]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={radiusTokens.core.color.blue[50]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={radiusTokens.core.color.green[100]}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

/**
 * The `stroke` property controls the color of the border. The `strokeWidth`
 * property controls the thickness of the border. `strokeWidth` can be a single
 * value or a list of values. If a list of values is provided, the values are
 * applied in the following order: top, right, bottom, left.
 */
export const StrokeAndStrokeWidth: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['stroke', 'strokeWidth'],
    },
  },
  argTypes: {
    stroke: {
      options: {
        black: { css: 'black' },
        red: { css: 'red' },
        blue: { css: 'blue' },
        green: { css: 'green' },
      },
    },
    strokeWidth: {
      options: {
        '1px': { css: '1px' },
        '3px': { css: '3px' },
        '2px 15px': { css: '2px 15px' },
        '5px 10px 15px 20px': { css: '5px 10px 15px 20px' },
      },
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ stroke, strokeWidth }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout>
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={stroke ?? { css: '#006C95' }}
        strokeWidth={strokeWidth ?? { css: '1px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={stroke ?? { css: '#006C95' }}
        strokeWidth={strokeWidth ?? { css: '3px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={stroke ?? { css: '#006C95' }}
        strokeWidth={strokeWidth ?? { css: '5px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={stroke ?? { css: '#006C95' }}
        strokeWidth={strokeWidth ?? { css: '7px' }}
      />
    </RadiusAutoLayout>
  ),
};

/**
 * The `cornerRadius` property controls the radius of the corners. `cornerRadius`
 * can be a single value or a list of values. If a list of values is provided,
 * the values are applied in the following order: top-left, top-right,
 * bottom-right, bottom-left.
 */
export const CornerRadius: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['cornerRadius'],
    },
  },
  argTypes: {
    cornerRadius: {
      options: {
        '0px': { css: '0px' },
        '5px': { css: '5px' },
        '20px': { css: '20px' },
        '50px': { css: '50px' },
        '50%': { css: '50%' },
        '10px 20px 30px 40px': { css: '10px 20px 30px 40px' },
      },
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ cornerRadius }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout>
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        cornerRadius={cornerRadius ?? { css: '5px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        cornerRadius={cornerRadius ?? { css: '20px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        cornerRadius={cornerRadius ?? { css: '50px' }}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        cornerRadius={cornerRadius ?? { css: '50%' }}
      />
    </RadiusAutoLayout>
  ),
};

export const Absolute: Story = {
  render: () => (
    <RadiusAutoLayout
      direction={'vertical'}
      width={'fill-parent'}
      strokeAlign={'inside'}
      stroke={{ css: 'black' }}
      padding={{ css: '20px' }}
      isParent={true}
      height={200}
      style={{ fontFamily: 'Riforma LL' }}
    >
      <RadiusAutoLayout
        fill={{ css: 'black' }}
        style={{
          color: 'white',
        }}
        padding={{ css: '12px' }}
        absolutePosition={true}
        x="0%"
        y="0%"
      >
        Top Left
      </RadiusAutoLayout>
      <RadiusAutoLayout
        padding={{ css: '12px' }}
        fill={{ css: 'black' }}
        style={{
          color: 'white',
        }}
        horizontalConstraint="right"
        verticalConstraint="bottom"
        absolutePosition={true}
        x={0}
        y="0px"
      >
        Bottom Right
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AsElements: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      width="fill-parent"
      padding={{ css: '12px' }}
      style={{
        color: 'white',
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout
        as="h1"
        padding={{ css: '20px' }}
        fill={{ css: 'black' }}
      >
        As h1
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="main"
        padding={{ css: '20px' }}
        fill={{ css: 'black' }}
      >
        As main
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="ul"
        padding={{ css: '20px' }}
        fill={{ css: 'black' }}
      >
        As ul
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="p"
        padding={{ css: '20px' }}
        fill={{ css: 'black' }}
      >
        As paragraph
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Effects: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      width="fill-parent"
      padding={{ css: '12px' }}
      style={{
        color: `var(${{ css: 'black' }})`,
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout
        // @ts-expect-error - dropShadow type needs refinement
        dropShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        // @ts-expect-error - strokeWidth type needs refinement
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        drop-shadow
      </RadiusAutoLayout>
      <RadiusAutoLayout
        // @ts-expect-error - innerShadow type needs refinement
        innerShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        // @ts-expect-error - strokeWidth type needs refinement
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        inner-shadow
      </RadiusAutoLayout>
      <RadiusAutoLayout
        layerBlur={1}
        padding={{ css: '20px' }}
        fill={{ css: 'black' }}
        style={{
          color: 'white',
        }}
      >
        layer-blur
      </RadiusAutoLayout>
      <RadiusAutoLayout
        style={{
          backgroundImage:
            'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: ' 0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        <RadiusAutoLayout
          style={{ fontWeight: 'bold', fontFamily: 'Riforma LL' }}
          padding={{ css: '20px' }}
          backgroundBlur={3}
        >
          background-blur
        </RadiusAutoLayout>
      </RadiusAutoLayout>
      <RadiusAutoLayout
        padding={{ css: '20px' }}
        layerBlur={1}
        // @ts-expect-error - dropShadow type needs refinement
        dropShadow={radiusTokens.core.shadow[400]}
        fill={{ css: 'black' }}
        style={{
          color: 'white',
        }}
      >
        layer-blur and drop-shadow
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Layouts: Story = {
  render: () => (
    <RadiusAutoLayout
      width="fill-parent"
      space={{ css: '20px' }}
      alignment="center"
      isParent={true}
      style={{
        color: `var(${{ css: 'black' }})`,
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout width="fill-parent">
        <RadiusAutoLayout
          as="img"
          src="https://via.placeholder.com/1500"
          alt=""
          width="fill-parent"
        />
      </RadiusAutoLayout>
      <RadiusAutoLayout width="fill-parent" direction="vertical">
        <RadiusAutoLayout
          as={RadiusButton}
          variant="primary"
          absolutePosition={true}
          x={0}
          y={0}
          verticalConstraint="top"
          horizontalConstraint="right"
        >
          Close Button
        </RadiusAutoLayout>
        <RadiusAutoLayout as="h2">Hello world</RadiusAutoLayout>
        <RadiusAutoLayout as="p">As paragraph</RadiusAutoLayout>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
