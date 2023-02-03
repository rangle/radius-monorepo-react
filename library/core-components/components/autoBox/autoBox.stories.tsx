import React, { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoBox } from './autoBox';
import { RadiusButton } from '../button/button';

export default {
  component: RadiusAutoBox,
  title: `Core Components/AutoBox`,
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
    badges: [BADGE.EXPERIMENTAL],
    componentSubtitle:
      "AutoBox mimics Figma's Auto Layout and properties. In Fimga Auto Layout is a very powerful feature that allows you to create complex layouts with ease.  We've adapted it's API as a Polymorphic component that will work with many of the features in Auto Layout.",

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
      options: ['auto', '10px', '10%'],
      control: 'select',
      table: { defaultValue: { summary: '10px' } },
    },
    padding: {
      description:
        'The padding around the content, can be number, object of vertical and horizontal, or object of top, right, bottom, left.',
      control: 'object',
    },
    fill: {
      description:
        'Background colour. Color can be assigned as hex or rgba(0-255,0-255,0-255,0-1).',
      control: 'color',
      presetColors: ['#cccccc', '#000000'],
    },
    stroke: {
      description: 'Border colour. We are currently missing dashed borders.',
      control: 'color',
      presetColors: ['#cccccc', '#000000'],
    },
    strokeWidth: {
      description:
        'Border width, can be number or object of top, right, bottom, left.',
      control: 'object',
    },
    strokeAlign: {
      description:
        'Border alignment, inside or outside. We are missing middle alignment.',
      options: ['inside', 'outside'],
      control: 'select',
    },
    opacity: {
      description: 'Opacity of the component. A number between 0 and 1.',
      control: {
        type: 'number',
        min: 0,
        max: 1,
      },
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
    effect: {
      description:
        'Effects that are applied to the autoBox. We have inner/drop shadow and blur. Multiple filters can be applied by passing an array of filters. We are missing functionality from figma.',
    },
    cornerRadius: {
      description:
        'Border radius, can be number or object of topLeft, topRight, bottomRight, bottomLeft.',
      control: 'object',
    },
  },
} as ComponentMeta<typeof RadiusAutoBox>;

const Template: ComponentStory<typeof RadiusAutoBox> = (
  args: ComponentProps<typeof RadiusAutoBox>
) => (
  <RadiusAutoBox {...args}>
    <RadiusAutoBox
      width={100}
      height="fill-parent"
      fill="var(--color-button-primary-surface-hover)"
    />
    <RadiusAutoBox
      width={100}
      height="fill-parent"
      fill="var(--color-button-primary-surface-hover)"
    />
    <RadiusAutoBox
      width={100}
      height="fill-parent"
      fill="var(--color-button-primary-surface-hover)"
    />
  </RadiusAutoBox>
);

export const AutoBox = Template.bind({});
AutoBox.args = {
  as: 'div',
  direction: 'horizontal',
  alignment: 'top',
  width: 'fill-parent',
  height: '200px',
  space: 'auto',
  padding: { top: 20, right: 20, bottom: 20, left: 20 },
  fill: 'var(--color-button-primary-surface-default))',
  stroke: 'var(--color-text-secondary-action-default)',
  strokeWidth: { top: 1, right: 1, bottom: 1, left: 1 },
  strokeAlign: undefined,
  cornerRadius: { topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0 },
  opacity: undefined,
  clippedContent: false,
  isParent: false,
  absolutePosition: false,
  x: undefined,
  y: undefined,
  horizontalConstraint: 'left',
  verticalConstraint: 'top',
  effect: [{ type: 'drop-shadow', color: '#ccc', offset: [0, 0], blur: 5 }],
};

const paddingTemplate: ComponentStory<typeof RadiusAutoBox> = (
  args: ComponentProps<typeof RadiusAutoBox>
) => (
  <RadiusAutoBox direction="horizontal" alignment="top" width="fill-parent">
    <RadiusAutoBox
      width={100}
      height={25}
      padding={{ left: '20px', top: '50px' }}
      fill="var(--color-button-primary-surface-hover)"
    />

    <RadiusAutoBox
      width={100}
      height={25}
      padding={{ vertical: 30 }}
      fill="var(--color-button-primary-surface-hover)"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      padding={50}
      fill="var(--color-button-primary-surface-hover)"
    />
  </RadiusAutoBox>
);
export const Padding = paddingTemplate.bind({});
Padding.parameters = {
  controls: {
    disable: true,
  },
};

const OpacityTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction="horizontal"
    alignment="top"
    width="fill-parent"
    padding={10}
  >
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.05}
      stroke="var(--color-button-primary-surface-default)"
      fill="var(--color-button-primary-surface-default)"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.25}
      stroke="var(--color-button-primary-surface-default)"
      fill="var(--color-button-primary-surface-default)"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.5}
      stroke="var(--color-button-primary-surface-default)"
      fill="var(--color-button-primary-surface-default)"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.75}
      stroke="var(--color-button-primary-surface-default)"
      fill="var(--color-button-primary-surface-default)"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      stroke="var(--color-button-primary-surface-default)"
      fill="var(--color-button-primary-surface-default)"
    />
  </RadiusAutoBox>
);
export const Opacity = OpacityTemplate.bind({});
Opacity.parameters = {
  controls: {
    disable: true,
  },
};

const BackgroundColorTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction="horizontal"
    alignment="top"
    width="fill-parent"
    padding={10}
  >
    <RadiusAutoBox width={100} height={25} fill={{ r: 0, g: 0, b: 0, a: 1 }} />
    <RadiusAutoBox
      width={100}
      height={25}
      fill={{ r: 255, g: 0, b: 0, a: 1 }}
    />
    <RadiusAutoBox width={100} height={25} fill={'#0f0'} />
    <RadiusAutoBox width={100} height={25} fill={'#0000ff'} />
    <RadiusAutoBox
      width={100}
      height={25}
      fill={{ r: 255, g: 150, b: 150, a: 20 }}
    />
    <RadiusAutoBox
      width={100}
      height={25}
      fill={{ r: 150, g: 255, b: 150, a: 0.2 }}
    />
  </RadiusAutoBox>
);
export const BackgroundColor = BackgroundColorTemplate.bind({});
BackgroundColor.parameters = {
  controls: {
    disable: true,
  },
};

const BorderTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction="horizontal"
    alignment="top"
    width="fill-parent"
    padding={10}
  >
    <RadiusAutoBox
      width={50}
      height={50}
      stroke="var(--color-button-primary-surface-hover)"
      strokeWidth={5}
    />
    <RadiusAutoBox
      width={50}
      height={50}
      stroke="var(--color-button-primary-surface-hover)"
      strokeAlign={`outside`}
      strokeWidth={`10px`}
    />
    <RadiusAutoBox
      width={50}
      height={50}
      stroke="var(--color-button-primary-surface-hover)"
      strokeAlign={'inside'}
      strokeWidth={{ left: 5, top: '20px', right: 0, bottom: 1 }}
    />
  </RadiusAutoBox>
);
export const Border = BorderTemplate.bind({});
Border.parameters = {
  controls: {
    disable: true,
  },
};

const BorderRadiusTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction={'horizontal'}
    alignment={'top'}
    width={'fill-parent'}
    padding={10}
  >
    <RadiusAutoBox
      width={50}
      height={50}
      cornerRadius={5}
      stroke="var(--color-button-primary-surface-hover)"
    />
    <RadiusAutoBox
      width={50}
      height={50}
      cornerRadius="20px"
      stroke="var(--color-button-primary-surface-hover)"
    />
    <RadiusAutoBox
      width={50}
      height={50}
      cornerRadius="100%"
      stroke="var(--color-button-primary-surface-hover)"
    />
  </RadiusAutoBox>
);
export const BorderRadius = BorderRadiusTemplate.bind({});
BorderRadius.parameters = {
  controls: {
    disable: true,
  },
};

const AbsoluteTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction={'vertical'}
    width={'fill-parent'}
    strokeAlign={'inside'}
    stroke="var(--color-button-primary-surface-default)"
    padding={20}
    isParent={true}
    height={200}
  >
    <RadiusAutoBox
      fill="var(--color-button-primary-surface-default)"
      style={{ color: 'var(--color-button-primary-label-default)' }}
      padding={10}
      absolutePosition={true}
      x="0%"
      y="0%"
    >
      Top Left
    </RadiusAutoBox>
    <RadiusAutoBox
      padding={10}
      fill="var(--color-button-primary-surface-default)"
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
);
export const Absolute = AbsoluteTemplate.bind({});
Absolute.parameters = {
  controls: {
    disable: true,
  },
};

const AsElementsTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction="horizontal"
    width="fill-parent"
    padding={10}
    style={{ color: 'var(--color-button-primary-label-default)' }}
  >
    <RadiusAutoBox
      as="h1"
      padding={20}
      fill="var(--color-button-primary-surface-default)"
    >
      As h1
    </RadiusAutoBox>
    <RadiusAutoBox
      as="main"
      padding={20}
      fill="var(--color-button-primary-surface-default)"
    >
      As main
    </RadiusAutoBox>
    <RadiusAutoBox
      as="ul"
      padding={20}
      fill="var(--color-button-primary-surface-default)"
    >
      As ul
    </RadiusAutoBox>
    <RadiusAutoBox
      as="p"
      padding={20}
      fill="var(--color-button-primary-surface-default)"
    >
      As paragraph
    </RadiusAutoBox>
  </RadiusAutoBox>
);
export const AsElements = AsElementsTemplate.bind({});
AsElements.parameters = {
  controls: {
    disable: true,
  },
};

const EffectsTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    direction="horizontal"
    width="fill-parent"
    padding={10}
    style={{ color: 'var(--color-button-primary-label-default)' }}
  >
    <RadiusAutoBox
      padding={20}
      effect={{
        type: 'drop-shadow',
        color: 'var(--color-button-primary-surface-default)',
        offset: [0, 0],
        blur: 5,
      }}
      fill="var(--color-button-primary-surface-default)"
    >
      drop-shadow
    </RadiusAutoBox>
    <RadiusAutoBox
      padding={20}
      effect={{
        type: 'inner-shadow',
        color: 'var(--color-button-primary-surface-default)',
        offset: [0, 0],
        blur: 5,
      }}
      fill="var(--color-button-primary-surface-default)"
    >
      inner-shadow
    </RadiusAutoBox>
    <RadiusAutoBox
      padding={20}
      effect={{ type: 'layer-blur', blur: 1 }}
      fill="var(--color-button-primary-surface-default)"
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
        padding={20}
        effect={{ type: 'background-blur', blur: 3 }}
      >
        background-blur
      </RadiusAutoBox>
    </RadiusAutoBox>

    <RadiusAutoBox
      padding={20}
      effect={[
        { type: 'layer-blur', blur: 1 },
        { type: 'drop-shadow', color: '#000', offset: [0, 0], blur: 20 },
      ]}
      fill="var(--color-button-primary-surface-default)"
    >
      layer-blur and drop-shadow
    </RadiusAutoBox>
  </RadiusAutoBox>
);
export const Effects = EffectsTemplate.bind({});
Effects.parameters = {
  controls: {
    disable: true,
  },
};

const LayoutsTemplate: ComponentStory<typeof RadiusAutoBox> = () => (
  <RadiusAutoBox
    width="fill-parent"
    space={20}
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
);
export const Layouts = LayoutsTemplate.bind({});
Layouts.parameters = {
  controls: {
    disable: true,
  },
};
