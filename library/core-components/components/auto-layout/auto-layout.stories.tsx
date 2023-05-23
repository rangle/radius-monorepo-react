import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { RadiusButton } from '../button/button';
import { flattenObject } from '../../utils';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Auto Layout',
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
    componentSubtitle:
      "RadiusAutoLayout duplicates Figma's Auto Layout API. In Figma Auto Layout is a very powerful feature that allows you to create complex layouts with ease.  We've adapted its API as a Polymorphic component that will work with many of the features in Auto Layout.",

    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element or component to render',
      table: { defaultValue: { summary: 'div' } },
    },
    width: {
      options: ['150px', '50%', 'fill-parent', 'hug-contents'],
    },
    height: {
      options: ['200px', '50%', 'fill-parent', 'hug-contents'],
    },
    space: {
      options: ['auto', ...flattenObject(radiusTokens.core.spacing)],
      table: { defaultValue: { summary: '10px' } },
    },
    padding: {
      options: ['', ...flattenObject(radiusTokens.core.spacing)],
    },
    fill: {
      options: [
        '',
        ...flattenObject(radiusTokens.brand.color),
        ...flattenObject(radiusTokens.mode.color),
        ...flattenObject(radiusTokens.component.color),
      ],
    },
    stroke: {
      options: [
        '',
        ...flattenObject(radiusTokens.brand.color),
        ...flattenObject(radiusTokens.mode.color),
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
    ref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

export const AutoLayout: Story = {
  render: (args) => (
    <RadiusAutoLayout {...args}>
      <RadiusAutoLayout
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoLayout>
  ),
  args: {
    as: 'div',
    alignment: 'top',
    width: 'fill-parent',
    height: '200px',
    space: 'auto',
    padding: radiusTokens.core.spacing[4],
    fill: radiusTokens.mode.color.actions.default.secondaryBackground,
    stroke: radiusTokens.mode.color.actions.default.secondaryForeground,
    strokeWidth: radiusTokens.core.borderWidth[2],
    cornerRadius: '--borderRadius-core-radius-none',
    clippedContent: false,
    isParent: false,
    absolutePosition: false,
    horizontalConstraint: 'left',
    verticalConstraint: 'top',
  },
};

export const Padding: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      alignment="top"
      width="fill-parent"
    >
      <RadiusAutoLayout
        width={100}
        height={25}
        padding={{ css: '50px 0 0 20px' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />

      <RadiusAutoLayout
        width={100}
        height={25}
        padding={{ css: '30px 0' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        padding={{ css: '48px' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Opacity: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoLayout
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['25percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['35percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['65percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['90percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const BackgroundColor: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoLayout
        width={100}
        height={25}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout width={100} height={25} fill={{ css: 'red' }} />
      <RadiusAutoLayout width={100} height={25} fill={{ css: '#0000ff' }} />
      <RadiusAutoLayout
        width={100}
        height={25}
        fill={{ css: 'rgba(255, 150, 150, 20)' }}
      />
      <RadiusAutoLayout
        width={100}
        height={25}
        fill={{ css: 'rgba(150, 255, 150, 0.2)' }}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Border: Story = {
  render: () => (
    <RadiusAutoLayout
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoLayout
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      />
      <RadiusAutoLayout
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeAlign={`outside`}
        strokeWidth={radiusTokens.core.borderWidth['2']}
      />
      <RadiusAutoLayout
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeAlign={'inside'}
        strokeWidth={{ css: '20px 0 1px 5px' }}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const BorderRadius: Story = {
  render: () => (
    <RadiusAutoLayout
      direction={'horizontal'}
      alignment={'top'}
      width={'fill-parent'}
      padding={{ css: '12px' }}
    >
      <RadiusAutoLayout
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius[4]}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius[16]}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoLayout
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius.max}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoLayout>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Absolute: Story = {
  render: () => (
    <RadiusAutoLayout
      direction={'vertical'}
      width={'fill-parent'}
      strokeAlign={'inside'}
      stroke={radiusTokens.component.color.button.primary.default.background}
      padding={{ css: '20px' }}
      isParent={true}
      height={200}
      style={{ fontFamily: 'Riforma LL' }}
    >
      <RadiusAutoLayout
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
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
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
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
        color: `var(${radiusTokens.component.color.button.primary.default.label})`,
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout
        as="h1"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As h1
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="main"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As main
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="ul"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As ul
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="p"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
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
        color: `var(${radiusTokens.component.color.button.primary.default.background})`,
        fontFamily: 'Riforma LL',
      }}
    >
      <RadiusAutoLayout
        dropShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        drop-shadow
      </RadiusAutoLayout>
      <RadiusAutoLayout
        innerShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        inner-shadow
      </RadiusAutoLayout>
      <RadiusAutoLayout
        layerBlur={1}
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
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
        dropShadow={radiusTokens.core.shadow[400]}
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
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
        color: `var(${radiusTokens.component.color.button.primary.default.background})`,
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
