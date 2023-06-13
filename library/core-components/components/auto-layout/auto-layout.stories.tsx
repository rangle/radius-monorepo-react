import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from '../typography/typography';
import { RadiusAutoLayout } from './auto-layout';
import { RadiusButton } from '../button/button';
import { flattenObject } from '../../utils';
import { AutoLayoutExtendedProps } from './auto-layout.types';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Component Development Kit / Auto Layout',
  parameters: {
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

export const AutoLayout: Story = {
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

/**
 * The `opacity` property controls the opacity of the Auto Layout component.
 * */
export const Opacity: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['opacity'],
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ opacity }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout width="fill-parent">
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        // @ts-expect-error - opacity type needs refinement
        opacity={opacity ?? radiusTokens.core.opacity['90percent']}
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
        opacity={opacity ?? radiusTokens.core.opacity['65percent']}
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
        opacity={opacity ?? radiusTokens.core.opacity['35percent']}
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
        opacity={opacity ?? radiusTokens.core.opacity['25percent']}
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
};

/**
 * The `fill` property controls the background color of the Auto Layout
 * component.
 * */
export const Fill: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['fill'],
    },
  },
  argTypes: {
    fill: {
      options: {
        red: { css: 'red' },
        blue: { css: 'blue' },
        green: { css: 'green' },
        orange: { css: 'orange' },
      },
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ fill }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout width="fill-parent">
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={fill ?? radiusTokens.core.color.red[400]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={fill ?? radiusTokens.core.color.orange[50]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={fill ?? radiusTokens.core.color.blue[50]}
      />
      <RadiusAutoLayout
        width={200}
        height={200}
        cornerRadius={{ css: '12px' }}
        stroke={{ css: '#006C95' }}
        strokeWidth={{ css: '3px' }}
        // @ts-expect-error - core tokens are not allowed
        fill={fill ?? radiusTokens.core.color.green[100]}
      />
    </RadiusAutoLayout>
  ),
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
 * The `strokeAlign` property controls whether the border is inside or outside
 * the bounding dimensions of an element. It can be set to `inside` or
 * `outside`, which corresponds to `box-sizing: border-box`, and
 * `box-sizing: content-box` in CSS, respectively. The default value is `inside`.
 *
 * [How Figma Stroke Alignment Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#strokes-in-layout)
 * */
export const StrokeAlignment: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['strokeAlign'],
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ strokeAlign }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout
      width="fill-parent"
      space={{ css: '25px' }}
      alignment="center"
    >
      <RadiusAutoLayout direction="vertical" alignment="center">
        <span
          style={{
            fontFamily: 'Riforma LL',
            fontWeight: 'bold',
          }}
        >
          Stroke Align{' '}
          {strokeAlign === 'outside' ? 'Outside' : 'Inside (default)'}
        </span>
        <RadiusAutoLayout
          fill={{ css: '#F7856E' }}
          height={200}
          width={200}
          stroke={{ css: '#000000' }}
          strokeWidth={{ css: '6px' }}
          style={{
            outline: '5px dashed #0081B3',
            outlineOffset: strokeAlign === 'outside' ? '-11px' : '',
          }}
          strokeAlign={strokeAlign ?? 'inside'}
        />
      </RadiusAutoLayout>
      <RadiusAutoLayout direction="vertical" alignment="center">
        <span
          style={{
            fontFamily: 'Riforma LL',
            fontWeight: 'bold',
          }}
        >
          Stroke Align{' '}
          {strokeAlign === 'inside' ? 'Inside (default)' : 'Outside'}
        </span>
        <RadiusAutoLayout
          fill={{ css: '#F7856E' }}
          height={200}
          width={200}
          stroke={{ css: '#000000' }}
          strokeWidth={{ css: '6px' }}
          style={{
            outline: '5px dashed #0081B3',
            outlineOffset: strokeAlign === 'inside' ? '' : '-11px',
          }}
          strokeAlign={strokeAlign ?? 'outside'}
        />
      </RadiusAutoLayout>
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

/**
 * The `clippedContent` property controls whether any content that extends
 * beyond the bounds of the Auto Layout component is clipped or not. This is
 * equivalent to `overflow: hidden` in CSS.
 */
export const ClippedContent: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['clippedContent'],
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({ clippedContent }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout space={{ css: '70px' }}>
      <RadiusAutoLayout direction="vertical" alignment="center">
        <span
          style={{
            fontFamily: 'Riforma LL',
          }}
        >
          {!(clippedContent ?? true) ? 'Not ' : ''}Clipped
        </span>
        <RadiusAutoLayout
          width={200}
          height={200}
          stroke={{ css: '#006C95' }}
          strokeWidth={{ css: '3px' }}
          cornerRadius={{ css: '12px' }}
          style={{ borderStyle: 'dashed' }}
          isParent
          clippedContent={clippedContent ?? true}
        >
          <RadiusAutoLayout
            fill={{ css: '#F7856E' }}
            width={120}
            height={100}
            absolutePosition
            style={{
              right: -60,
              top: 44,
            }}
          ></RadiusAutoLayout>
        </RadiusAutoLayout>
      </RadiusAutoLayout>
      <RadiusAutoLayout direction="vertical" alignment="center">
        <span
          style={{
            fontFamily: 'Riforma LL',
          }}
        >
          {!(clippedContent ?? false) ? 'Not ' : ''}Clipped
        </span>
        <RadiusAutoLayout
          width={200}
          height={200}
          stroke={{ css: '#006C95' }}
          strokeWidth={{ css: '3px' }}
          cornerRadius={{ css: '12px' }}
          style={{ borderStyle: 'dashed' }}
          isParent
          clippedContent={clippedContent ?? false}
        >
          <RadiusAutoLayout
            fill={{ css: '#F7856E' }}
            width={120}
            height={100}
            absolutePosition
            style={{
              right: -60,
              top: 44,
            }}
          ></RadiusAutoLayout>
        </RadiusAutoLayout>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

/**
 * The `absolutePosition` property controls whether the Auto Layout component
 * is positioned absolutely or not. This is equivalent to `position: absolute`
 * in CSS. In this mode, the `x` and `y` properties control the position of the
 * Auto Layout component, with `x` representing the distance from the left, and
 * `y` representing the distance from the top. It is important that the parent
 * has the `isParent` property set to `true` so that the Auto Layout component
 * can be positioned relative to its parent. Otherwise, it will be positioned
 * relative to the viewport.
 *
 * [How Figma Absolute Positioning Works](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#h_01G2RPRBBKVKXK0JV59NCSKEE0)
 *
 * When an element is absolutely positioned, the `horizontalConstraint` and
 * `verticalConstraint` properties control how the element is positioned when
 * the parent is resized. The `horizontalConstraint` property controls the
 * horizontal position of the element, and the `verticalConstraint` property
 * controls the vertical position of the element. Note that we are currently
 * missing some functionality from Figma (`left and right`, `top and bottom`,
 * `center`, and `scale`)
 *
 * [How Figma Constraints Work](https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties#Constraints_and_resizing)
 */
export const AbsolutePositionAndConstraints: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['x', 'y', 'horizontalConstraint', 'verticalConstraint'],
    },
  },
  args: {
    x: '157px',
    y: '82px',
    horizontalConstraint: 'left',
    verticalConstraint: 'top',
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: ({
    x,
    y,
    horizontalConstraint,
    verticalConstraint,
  }: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout
      stroke={{ css: '#006C95' }}
      strokeWidth={{ css: '3px' }}
      cornerRadius={{ css: '12px' }}
      padding={{ css: '24px' }}
      space="auto"
      width={630}
      isParent
    >
      <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
      <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
      <RadiusAutoLayout width={40} height={242} fill={{ css: '#F7856E' }} />
      <RadiusAutoLayout
        fill={{ css: '#D44527' }}
        height={100}
        width={383}
        alignment="center"
        style={{
          justifyContent: 'center', // only needed until alignment changes are merged
        }}
        padding={{ css: '20px' }}
        absolutePosition
        x={x}
        y={y}
        horizontalConstraint={horizontalConstraint}
        verticalConstraint={verticalConstraint}
      >
        <span
          style={{
            color: 'white',
            fontFamily: 'Riforma LL',
            fontSize: '16px',
          }}
        >
          Element positioned absolutely
        </span>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

/**
 * Figma has four types of effects: Drop Shadow, Inner Shadow, Layer Blur,
 * and Background Blur.
 *
 * Drop Shadow (`dropShadow`) and Inner Shadow (`innerShadow`) represent the
 * shadow on the inside and outside of an element, respectively, and use the
 * `box-shadow` CSS property. Layer Blur (`layerBlur`) represents the blur
 * applied to the entire element, using the `filter` CSS property. Background
 * Blur (`backgroundBlur`) represents the blur applied to the background of the
 * element, using the `backdrop-filter` CSS property.
 *
 * [How Figma Effects Work](https://help.figma.com/hc/en-us/articles/360041488473-Apply-shadow-or-blur-effects)
 */
export const Effects: Story = {
  parameters: {
    controls: {
      // only show controls relevant to this story
      include: ['dropShadow', 'innerShadow', 'layerBlur', 'backgroundBlur'],
    },
  },
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (props: AutoLayoutExtendedProps) => (
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
        {...props}
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
        {...props}
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
        {...props}
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
          {...props}
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
        {...props}
      >
        layer-blur and drop-shadow
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

/**
 * RadiusAutoLayout is polymorphic, which means that it can render as any HTML
 * element or React component. The `as` property controls what is rendered. By
 * default, it renders a `div` element.
 *
 * The component will extend the props of the element or component that it is
 * rendering (along with the default props of `RadiusAutoLayout`). For example,
 * if you set `as="h1"`, the component will accept all the props of the `h1`
 * element. If you set `as={RadiusButton}`, the component will accept all the
 * props of the `RadiusButton` component.
 *
 * Below are a few examples of RadiusAutoLayout being used as other elements.
 */
export const Polymorphism: Story = {
  // @ts-expect-error - bug with `args` type inference due to polymorphism
  render: (props: AutoLayoutExtendedProps) => (
    <RadiusAutoLayout
      direction="vertical"
      width="fill-parent"
      style={{
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout as="h1" {...props}>
        Heading
      </RadiusAutoLayout>
      <RadiusAutoLayout as="a" href="#" {...props}>
        Link
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="img"
        src="https://via.placeholder.com/1500"
        height="200px"
        {...props}
      />
      <RadiusAutoLayout as={RadiusButton} variant="primary" {...props}>
        RadiusButton
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

/**
 * Most of the props of RadiusAutoLayout support tokens. Tokens are a way to
 * reference a value from a design system (like Radius). This means that values
 * defined by designers in Figma can be used directly in code, ensuring that
 * the design and code are always in sync, eliminating communication errors, and
 * greatly simplifying the development process.
 *
 * Tokens are even able to represent styles across multiple themes and
 * breakpoints. As you can see in the example below, the layout is fully responsive
 * across breakpoints, and the colors and typography change based on the theme,
 * all without any CSS. This is possible because the tokens are defined in a way
 * that allows them to be responsive and themeable in Figma using Tokens Studio,
 * and those values are converted directly into CSS variables in the appropriate
 * contexts/layers.
 *
 * Keep an eye out for  our upcoming explainer video on how to create your own
 * dynamic and responsive components using tokens!
 */
export const TokenizedLayout: Story = {
  render: () => (
    <RadiusAutoLayout
      width="fill-parent"
      space={radiusTokens.component.spacing.hero.gap.image}
      direction={radiusTokens.component.direction.hero.contentContainer}
      fill={radiusTokens.component.color.hero.background}
      alignment="center"
      isParent
      style={{
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
      <RadiusAutoLayout
        width="fill-parent"
        direction={radiusTokens.component.direction.hero.textContainer}
        space={radiusTokens.component.spacing.hero.gap.aboveButton}
      >
        <Typography
          as="h1"
          font={radiusTokens.component.typography.hero.header.font}
          fill={radiusTokens.component.color.hero.header}
        >
          Hello World
        </Typography>
        <Typography
          as="p"
          font={radiusTokens.component.typography.hero.eyebrow.font}
          fill={radiusTokens.component.color.hero.eyebrow}
        >
          I am fully responsive and themeable without any CSS
        </Typography>
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
