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
      'This Polymorphic component that will manage layouts for you (mimics Figma).',
    // More on Storybook parameters at: https://storybook.js.org/docs/react/writing-stories/parameters#component-parameters
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render.',
      defaultValue: { summary: 'div' },
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
      defaultValue: { summary: 'top' },
    },
    width: {
      description:
        'The width of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%).',
      options: ['150px', '50%', 'fill-parent', 'hug-contents'],
      control: 'select',
      defaultValue: { summary: 'hug-contents' },
    },
    height: {
      description:
        'The height of the layout, can be number, percentage, hug-contents (auto) or fill-parent (100%).',
      options: ['100px', '50%', 'fill-parent', 'hug-contents'],
      control: 'select',
      defaultValue: { summary: 'hug-contents' },
    },
    space: {
      description:
        'The space between the children, can be number (gap) or auto (justify-content: space-between;).',
      options: ['auto', '10px', '10%'],
      control: 'select',
      defaultValue: { summary: '10px' },
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
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isParent: {
      description:
        "Used in conjunction with absolutePosition, uses and sets position: 'relative'.",
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    absolutePosition: {
      description:
        'Used in conjunction with isParent, uses and sets position: absolute.',
      defaultValue: { summary: 'false' },
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
      defaultValue: { summary: 'left' },
    },
    verticalConstraint: {
      description:
        'Used in conjunction with absolutePosition, sets top or bottom. We are missing functionality from figma.',
      options: ['top', 'bottom'],
      control: 'select',
      defaultValue: { summary: 'top' },
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
    <RadiusAutoBox width={100} height="fill-parent" fill="#fff" stroke="#000" />
    <RadiusAutoBox width={100} height="fill-parent" fill="#fff" stroke="#000" />
    <RadiusAutoBox width={100} height="fill-parent" fill="#fff" stroke="#000" />
  </RadiusAutoBox>
);

export const Default = Template.bind({});
Default.args = {
  as: 'div',
  direction: 'horizontal',
  alignment: 'top',
  width: 'fill-parent',
  height: '100px',
  space: 'auto',
  padding: { top: 5, right: 5, bottom: 5, left: 5 },
  fill: '#cccccc',
  stroke: '#000000',
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

export const ExampleGrid = () => (
  <RadiusAutoBox direction="vertical">
    <br />
    <h2>fixed width / height, spacing auto</h2>
    <RadiusAutoBox
      direction="horizontal"
      space="auto"
      alignment="top"
      width="fill-parent"
    >
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
    </RadiusAutoBox>
    <br />
    <RadiusAutoBox
      direction="vertical"
      space="auto"
      alignment="top"
      width="fill-parent"
      height={130}
      stroke={'#000'}
      strokeAlign={`inside`}
    >
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
    </RadiusAutoBox>
    <br />

    <h2>fixed width / height, spacing fixed</h2>
    <RadiusAutoBox
      direction="horizontal"
      space={10}
      alignment="top"
      width="fill-parent"
    >
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
    </RadiusAutoBox>
    <br />
    <RadiusAutoBox
      direction="vertical"
      space={10}
      alignment="top"
      width="fill-parent"
      height={130}
      stroke={'#000'}
      strokeAlign={`inside`}
    >
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height={25}
        stroke={'#000'}
        strokeAlign={`inside`}
      />
    </RadiusAutoBox>
    <br />

    <h2>fill width / height, spacing fixed</h2>
    <RadiusAutoBox
      direction="horizontal"
      space={10}
      alignment="top"
      width="fill-parent"
    >
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
    </RadiusAutoBox>
    <br />
    <RadiusAutoBox
      direction="vertical"
      space={10}
      alignment="top"
      width="fill-parent"
      height={130}
      stroke={'#000'}
      strokeAlign={`inside`}
    >
      <RadiusAutoBox
        width="fill-parent"
        height="fill-parent"
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height="fill-parent"
        stroke={'#000'}
        strokeAlign={`inside`}
      />
      <RadiusAutoBox
        width="fill-parent"
        height="fill-parent"
        stroke={'#000'}
        strokeAlign={`inside`}
      />
    </RadiusAutoBox>
    <br />
  </RadiusAutoBox>
);

export const Alignments = () => (
  <RadiusAutoBox direction="vertical" space={30}>
    <br />
    <h2>Vertical | top - center - bottom</h2>
    <RadiusAutoBox
      direction="horizontal"
      space="auto"
      alignment="top"
      width="fill-parent"
    >
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={50} stroke={'#000'} />
      <RadiusAutoBox width={100} height={75} stroke={'#000'} />
    </RadiusAutoBox>

    <RadiusAutoBox
      direction="horizontal"
      space="auto"
      alignment="center"
      width="fill-parent"
    >
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={50} stroke={'#000'} />
      <RadiusAutoBox width={100} height={75} stroke={'#000'} />
    </RadiusAutoBox>

    <RadiusAutoBox
      direction="horizontal"
      space="auto"
      alignment="bottom"
      width="fill-parent"
    >
      <RadiusAutoBox width={100} height={25} stroke={'#000'} />
      <RadiusAutoBox width={100} height={50} stroke={'#000'} />
      <RadiusAutoBox width={100} height={75} stroke={'#000'} />
    </RadiusAutoBox>

    <RadiusAutoBox
      direction="vertical"
      space="auto"
      alignment="left"
      width="fill-parent"
      height={50}
    >
      <RadiusAutoBox width="25%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="50%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="75%" height={10} stroke={'#000'} />
    </RadiusAutoBox>

    <RadiusAutoBox
      direction="vertical"
      space="auto"
      alignment="center"
      width="fill-parent"
      height={50}
    >
      <RadiusAutoBox width="25%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="50%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="75%" height={10} stroke={'#000'} />
    </RadiusAutoBox>

    <RadiusAutoBox
      direction="vertical"
      space="auto"
      alignment="right"
      width="fill-parent"
      height={50}
    >
      <RadiusAutoBox width="25%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="50%" height={10} stroke={'#000'} />
      <RadiusAutoBox width="75%" height={10} stroke={'#000'} />
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const Padding = () => (
  <RadiusAutoBox direction="horizontal" alignment="top" width="fill-parent">
    <RadiusAutoBox
      width={100}
      height={25}
      padding={{ left: '20px', top: '50px' }}
      stroke={'#000'}
    />

    <RadiusAutoBox
      width={100}
      height={25}
      padding={{ vertical: 30 }}
      stroke={'#000'}
    />
    <RadiusAutoBox width={100} height={25} padding={50} stroke={'#000'} />
  </RadiusAutoBox>
);

export const Opacity = () => (
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
      stroke={'#000'}
      fill="#000"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.25}
      stroke={'#000'}
      fill="#000"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.5}
      stroke={'#000'}
      fill="#000"
    />
    <RadiusAutoBox
      width={100}
      height={25}
      opacity={0.75}
      stroke={'#000'}
      fill="#000"
    />
    <RadiusAutoBox width={100} height={25} stroke={'#000'} fill="#000" />
  </RadiusAutoBox>
);

export const BackgroundColor = () => (
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

export const Border = () => (
  <RadiusAutoBox
    direction="horizontal"
    alignment="top"
    width="fill-parent"
    padding={10}
  >
    <RadiusAutoBox width={50} height={50} stroke={'#f00'} strokeWidth={5} />
    <RadiusAutoBox
      width={50}
      height={50}
      stroke={'#f00'}
      strokeAlign={`outside`}
      strokeWidth={`10px`}
    />
    <RadiusAutoBox
      width={50}
      height={50}
      stroke={'#f00'}
      strokeAlign={'inside'}
      strokeWidth={{ left: 5, top: '20px', right: 0, bottom: 1 }}
    />
  </RadiusAutoBox>
);

export const BorderRadius = () => (
  <RadiusAutoBox
    direction={'horizontal'}
    alignment={'top'}
    width={'fill-parent'}
    padding={10}
  >
    <RadiusAutoBox width={50} height={50} cornerRadius={5} stroke={'#000'} />
    <RadiusAutoBox width={50} height={50} cornerRadius="20px" stroke={'#000'} />
    <RadiusAutoBox width={50} height={50} cornerRadius="100%" stroke={'#000'} />
  </RadiusAutoBox>
);

export const Absolute = () => (
  <RadiusAutoBox
    direction="vertical"
    width="fill-parent"
    strokeAlign={'inside'}
    padding={10}
  >
    <RadiusAutoBox
      direction={'vertical'}
      width={'fill-parent'}
      strokeAlign={'inside'}
      padding={10}
      isParent={true}
    >
      <RadiusAutoBox width={20} height={20} fill="#f00" />
      <RadiusAutoBox width={20} height={20} fill="#0f0" />
      <RadiusAutoBox
        x="50%"
        y={'50%'}
        width={20}
        height={20}
        fill="#00f"
        absolutePosition={true}
      />
      <RadiusAutoBox
        width={20}
        height={20}
        fill="#0ff"
        horizontalConstraint="right"
        verticalConstraint="bottom"
        absolutePosition={true}
        x="300px"
        y="10px"
      />
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const AsElements = () => (
  <RadiusAutoBox direction="horizontal" width="fill-parent" padding={10}>
    <RadiusAutoBox as="h1" padding={5}>
      As h1
    </RadiusAutoBox>
    <RadiusAutoBox as="main" padding={5}>
      As main
    </RadiusAutoBox>
    <RadiusAutoBox as="ul" padding={5}>
      As ul
    </RadiusAutoBox>
    <RadiusAutoBox as="p" padding={5}>
      As paragraph
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const Effects = () => (
  <RadiusAutoBox direction="horizontal" width="fill-parent" padding={10}>
    <RadiusAutoBox
      padding={5}
      effect={{ type: 'drop-shadow', color: '#000', offset: [0, 0], blur: 5 }}
    >
      drop-shadow
    </RadiusAutoBox>
    <RadiusAutoBox
      padding={5}
      effect={{ type: 'inner-shadow', color: '#000', offset: [0, 0], blur: 5 }}
    >
      inner-shadow
    </RadiusAutoBox>
    <RadiusAutoBox padding={5} effect={{ type: 'layer-blur', blur: 1 }}>
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
      <RadiusAutoBox padding={5} effect={{ type: 'background-blur', blur: 3 }}>
        background-blur
      </RadiusAutoBox>
    </RadiusAutoBox>

    <RadiusAutoBox
      padding={5}
      effect={[
        { type: 'layer-blur', blur: 1 },
        { type: 'drop-shadow', color: '#000', offset: [0, 0], blur: 5 },
      ]}
    >
      layer-blur and drop-shadow
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const Layouts = () => (
  <RadiusAutoBox
    width="fill-parent"
    space={20}
    alignment="center"
    isParent={true}
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
        absolutePosition={true}
        x={0}
        y={0}
        verticalConstraint="top"
        horizontalConstraint="right"
      >
        Close button
      </RadiusAutoBox>
      <RadiusAutoBox as="h2">Hello world</RadiusAutoBox>
      <RadiusAutoBox as="p">As paragraph</RadiusAutoBox>
    </RadiusAutoBox>
  </RadiusAutoBox>
);
