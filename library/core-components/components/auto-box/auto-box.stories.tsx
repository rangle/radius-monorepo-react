import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoBox } from './auto-box';
import { RadiusButton } from '../button/button';

const meta: Meta<typeof RadiusAutoBox> = {
  component: RadiusAutoBox,
  // title: `Core Components/AutoBox`,
  title: 'Auto Box',
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
    // badges: [BADGE.EXPERIMENTAL],
    componentSubtitle:
      "AutoBox duplicates Figma's Auto Layout API. In Fimga Auto Layout is a very powerful feature that allows you to create complex layouts with ease.  We've adapted it's API as a Polymorphic component that will work with many of the features in Auto Layout.",

    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render.',
      table: { defaultValue: { summary: 'div' } },
    },
    direction: {
      description: 'The direction of the layout, uses flex row or column.',
      options: ['horizontal', 'vertical'],
      control: 'select',
    },
    alignment: {
      description: 'The alignment of the layout, uses align-items.',
      options: ['top', 'center', 'bottom', 'left', 'right'],
      control: 'select',
      table: { defaultValue: { summary: 'top' } },
    },
    width: {
      description:
        'The width of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%).',
      options: ['150px', '50%', 'fill-parent', 'hug-contents'],
      control: 'select',
      table: { defaultValue: { summary: 'hug-contents' } },
    },
    height: {
      description:
        'The height of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%).',
      options: ['100px', '50%', 'fill-parent', 'hug-contents'],
      control: 'select',
      table: { defaultValue: { summary: 'hug-contents' } },
    },
    space: {
      description:
        'The space between the children, can be number (gap) or auto (justify-content: space-between;).',
      options: [
        'auto',
        '--spacing-core-space-none',
        '--spacing-core-space-half',
        '--spacing-core-space-base',
        '--spacing-core-space-2x',
        '--spacing-core-space-3x',
        '--spacing-core-space-4x',
        '--spacing-core-space-5x',
        '--spacing-core-space-6x',
        '--spacing-core-space-8x',
        '--spacing-core-space-10x',
        '--spacing-core-space-12x',
        '--spacing-core-space-16x',
        '--spacing-core-space-18x',
        '--spacing-core-space-20x',
        '--spacing-core-space-26x',
        '--spacing-core-space-45x',
        '--spacing-core-space-60x',
      ],
      control: 'select',
      // table: { defaultValue: { summary: '10px' } },
    },
    padding: {
      description:
        'The padding around the content, can be number, object of vertical and horizontal, or object of top, right, bottom, left.',
      options: [
        '',
        '--spacing-core-space-none',
        '--spacing-core-space-half',
        '--spacing-core-space-base',
        '--spacing-core-space-2x',
        '--spacing-core-space-3x',
        '--spacing-core-space-4x',
        '--spacing-core-space-5x',
        '--spacing-core-space-6x',
        '--spacing-core-space-8x',
        '--spacing-core-space-10x',
        '--spacing-core-space-12x',
        '--spacing-core-space-16x',
        '--spacing-core-space-18x',
        '--spacing-core-space-20x',
        '--spacing-core-space-26x',
        '--spacing-core-space-45x',
        '--spacing-core-space-60x',
      ],
      control: 'select',
    },
    fill: {
      description:
        'Background colour. Color can be assigned as hex or rgba(0-255,0-255,0-255,0-1).',
      options: [
        '',
        '--color-background-base',
        '--color-background-subtle',
        '--color-background-accent',
        '--color-background-inverse',
        '--color-interaction-primary-default',
        '--color-interaction-primary-hover',
        '--color-interaction-primary-active',
        '--color-interaction-primary-focus',
        '--color-interaction-primary-disabled',
        '--color-interaction-secondary-default',
        '--color-interaction-secondary-hover',
        '--color-interaction-secondary-active',
        '--color-interaction-secondary-focus',
        '--color-interaction-secondary-disabled',
        '--color-interaction-tertiary-default',
        '--color-interaction-tertiary-hover',
        '--color-interaction-tertiary-active',
        '--color-interaction-tertiary-focus',
        '--color-interaction-tertiary-disabled',
      ],
      control: 'select',
    },
    stroke: {
      description: 'Border colour. We are currently missing dashed borders.',
      options: [
        '',
        '--color-background-base',
        '--color-background-subtle',
        '--color-background-accent',
        '--color-background-inverse',
        '--color-interaction-primary-default',
        '--color-interaction-primary-hover',
        '--color-interaction-primary-active',
        '--color-interaction-primary-focus',
        '--color-interaction-primary-disabled',
        '--color-interaction-secondary-default',
        '--color-interaction-secondary-hover',
        '--color-interaction-secondary-active',
        '--color-interaction-secondary-focus',
        '--color-interaction-secondary-disabled',
        '--color-interaction-tertiary-default',
        '--color-interaction-tertiary-hover',
        '--color-interaction-tertiary-active',
        '--color-interaction-tertiary-focus',
        '--color-interaction-tertiary-disabled',
      ],
      control: 'select',
    },
    strokeWidth: {
      description:
        'Border width, can be number or object of top, right, bottom, left.',
      options: [
        '--borderWidth-core-border-width-sm',
        '--borderWidth-core-border-width-md',
      ],
      control: 'select',
    },
    strokeAlign: {
      description:
        'Border alignment, inside or outside. We are missing middle alignment.',
      options: ['inside', 'outside'],
      control: 'select',
    },
    opacity: {
      description: 'Opacity of the component. A number between 0 and 1.',
      options: [
        '',
        '--opacity-core-opacity-lighter',
        '--opacity-core-opacity-light',
        '--opacity-core-opacity-dark',
        '--opacity-core-opacity-darker',
      ],
      control: 'select',
    },
    clippedContent: {
      description:
        'Whether the content should be clipped or not, uses overflow: hidden.',
      table: { defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
    isParent: {
      description:
        "Used in conjunction with absolutePosition, uses and sets position: 'relative'.",
      table: { defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
    absolutePosition: {
      description:
        'Used in conjunction with isParent, uses and sets position: absolute.',
      table: { defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
    x: {
      description:
        'Used in conjunction with absolutePosition, sets left or right depending on horizontal constraint. Does not act the same as Figma.',
      control: 'text',
    },
    y: {
      description:
        'Used in conjunction with absolutePosition, sets top or bottom depending on verticalConstraint. Does not act the same as Figma.',
      control: 'text',
    },
    horizontalConstraint: {
      description:
        'Used in conjunction with absolutePosition, sets left or right. We are missing functionality from figma.',
      options: ['left', 'right'],
      control: 'select',
      table: { defaultValue: { summary: 'left' } },
    },
    verticalConstraint: {
      description:
        'Used in conjunction with absolutePosition, sets top or bottom. We are missing functionality from figma.',
      options: ['top', 'bottom'],
      control: 'select',
      table: { defaultValue: { summary: 'top' } },
    },
    // effect: {
    //   description:
    //     'Effects that are applied to the autoBox. We have inner/drop shadow and blur. Multiple filters can be applied by passing an array of filters. We are missing functionality from figma.',
    // },
    cornerRadius: {
      description:
        'Border radius, can be number or object of topLeft, topRight, bottomRight, bottomLeft.',
      options: [
        '--borderRadius-core-radius-none',
        '--borderRadius-core-radius-xxs',
        '--borderRadius-core-radius-xsm',
        '--borderRadius-core-radius-sm',
        '--borderRadius-core-radius-md',
        '--borderRadius-core-radius-lg',
        '--borderRadius-core-radius-xlg',
        '--borderRadius-core-radius-xxlg',
        '--borderRadius-core-radius-max',
      ],
      control: 'select',
    },
    ref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RadiusAutoBox>;

export const AutoBox: Story = {
  render: (args) => (
    <RadiusAutoBox {...args}>
      <RadiusAutoBox
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox
        width={100}
        height="fill-parent"
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoBox>
  ),
  args: {
    as: 'div',
    direction: 'horizontal',
    alignment: 'top',
    width: 'fill-parent',
    height: '200px',
    space: 'auto',
    padding: '--spacing-core-space-5x',
    fill: '--color-background-base',
    stroke: '--color-text-secondary-action-default',
    strokeWidth: '--borderWidth-core-border-width-sm',
    strokeAlign: undefined,
    cornerRadius: '--borderRadius-core-radius-none',
    opacity: undefined,
    clippedContent: false,
    isParent: false,
    absolutePosition: false,
    x: undefined,
    y: undefined,
    horizontalConstraint: 'left',
    verticalConstraint: 'top',
    // effect: [{ type: 'drop-shadow', color: '#ccc', offset: [0, 0], blur: 5 }],
  },
};

export const Padding: Story = {
  render: () => (
    <RadiusAutoBox direction="horizontal" alignment="top" width="fill-parent">
      <RadiusAutoBox
        width={100}
        height={25}
        padding={{ css: '50px 0 0 20px' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />

      <RadiusAutoBox
        width={100}
        height={25}
        padding={{ css: '30px 0' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        padding={{ css: '48px' }}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Opacity: Story = {
  render: () => (
    <RadiusAutoBox
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoBox
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['25percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['35percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['65percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        opacity={radiusTokens.core.opacity['90percent']}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        stroke={radiusTokens.component.color.button.primary.default.background}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const BackgroundColor: Story = {
  render: () => (
    <RadiusAutoBox
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoBox
        width={100}
        height={25}
        fill={radiusTokens.component.color.button.primary.default.background}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        fill={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox width={100} height={25} fill={{ css: 'red' }} />
      <RadiusAutoBox width={100} height={25} fill={{ css: '#0000ff' }} />
      <RadiusAutoBox
        width={100}
        height={25}
        fill={{ css: 'rgba(255, 150, 150, 20)' }}
      />
      <RadiusAutoBox
        width={100}
        height={25}
        fill={{ css: 'rgba(150, 255, 150, 0.2)' }}
      />
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Border: Story = {
  render: () => (
    <RadiusAutoBox
      direction="horizontal"
      alignment="top"
      width="fill-parent"
      padding={{ css: '12px' }}
    >
      <RadiusAutoBox
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      />
      <RadiusAutoBox
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeAlign={`outside`}
        strokeWidth={radiusTokens.core.borderWidth['2']}
      />
      <RadiusAutoBox
        width={50}
        height={50}
        stroke={radiusTokens.component.color.button.primary.hover.background}
        strokeAlign={'inside'}
        strokeWidth={{ css: '20px 0 1px 5px' }}
      />
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const BorderRadius: Story = {
  render: () => (
    <RadiusAutoBox
      direction={'horizontal'}
      alignment={'top'}
      width={'fill-parent'}
      padding={{ css: '12px' }}
    >
      <RadiusAutoBox
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius[4]}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius[16]}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
      <RadiusAutoBox
        width={50}
        height={50}
        cornerRadius={radiusTokens.core.borderRadius.max}
        stroke={radiusTokens.component.color.button.primary.hover.background}
      />
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Absolute: Story = {
  render: () => (
    <RadiusAutoBox
      direction={'vertical'}
      width={'fill-parent'}
      strokeAlign={'inside'}
      stroke={radiusTokens.component.color.button.primary.default.background}
      padding={{ css: '20px' }}
      isParent={true}
      height={200}
    >
      <RadiusAutoBox
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{ color: 'var(--color-button-primary-label-default)' }}
        padding={{ css: '12px' }}
        absolutePosition={true}
        x="0%"
        y="0%"
      >
        Top Left
      </RadiusAutoBox>
      <RadiusAutoBox
        padding={{ css: '12px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{ color: 'var(--color-button-primary-label-default)' }}
        horizontalConstraint="right"
        verticalConstraint="bottom"
        absolutePosition={true}
        x={0}
        y="0px"
      >
        Bottom Right
      </RadiusAutoBox>
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AsElements: Story = {
  render: () => (
    <RadiusAutoBox
      direction="horizontal"
      width="fill-parent"
      padding={{ css: '12px' }}
      style={{
        color: `var(${radiusTokens.component.color.button.primary.default.label})`,
      }}
    >
      <RadiusAutoBox
        as="h1"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As h1
      </RadiusAutoBox>
      <RadiusAutoBox
        as="main"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As main
      </RadiusAutoBox>
      <RadiusAutoBox
        as="ul"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As ul
      </RadiusAutoBox>
      <RadiusAutoBox
        as="p"
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
      >
        As paragraph
      </RadiusAutoBox>
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Effects: Story = {
  render: () => (
    <RadiusAutoBox
      direction="horizontal"
      width="fill-parent"
      padding={{ css: '12px' }}
      style={{
        color: `var(${radiusTokens.component.color.button.primary.default.background})`,
      }}
    >
      <RadiusAutoBox
        dropShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        drop-shadow
      </RadiusAutoBox>
      <RadiusAutoBox
        innerShadow={radiusTokens.core.shadow[400]}
        padding={{ css: '20px' }}
        stroke={{ css: '#0005' }}
        strokeWidth={radiusTokens.core.borderWidth['1']}
      >
        inner-shadow
      </RadiusAutoBox>
      <RadiusAutoBox
        layerBlur={1}
        padding={{ css: '20px' }}
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
        }}
      >
        layer-blur
      </RadiusAutoBox>
      <RadiusAutoBox
        style={{
          backgroundImage:
            'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: ' 0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        <RadiusAutoBox
          style={{ fontWeight: 'bold' }}
          padding={{ css: '20px' }}
          backgroundBlur={3}
        >
          background-blur
        </RadiusAutoBox>
      </RadiusAutoBox>
      <RadiusAutoBox
        padding={{ css: '20px' }}
        layerBlur={1}
        dropShadow={radiusTokens.core.shadow[400]}
        fill={radiusTokens.component.color.button.primary.default.background}
        style={{
          color: `var(${radiusTokens.component.color.button.primary.default.label})`,
        }}
      >
        layer-blur and drop-shadow
      </RadiusAutoBox>
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const Layouts: Story = {
  render: () => (
    <RadiusAutoBox
      width="fill-parent"
      space={{ css: '20px' }}
      alignment="center"
      isParent={true}
      style={{ color: 'var(--color-button-primary-surface-default)' }}
    >
      <RadiusAutoBox width="fill-parent">
        <RadiusAutoBox
          as="img"
          src="https://via.placeholder.com/1500"
          alt=""
          width="fill-parent"
        />
      </RadiusAutoBox>
      <RadiusAutoBox width="fill-parent" direction="vertical">
        <RadiusAutoBox
          as={RadiusButton}
          variant="primary"
          absolutePosition={true}
          x={0}
          y={0}
          verticalConstraint="top"
          horizontalConstraint="right"
        >
          Close Button
        </RadiusAutoBox>
        <RadiusAutoBox as="h2">Hello world</RadiusAutoBox>
        <RadiusAutoBox as="p">As paragraph</RadiusAutoBox>
      </RadiusAutoBox>
    </RadiusAutoBox>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};