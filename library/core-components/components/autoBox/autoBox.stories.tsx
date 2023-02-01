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
    // direction: {
    //   options: ['horizontal', 'vertical'],
    //   control: {
    //     type: 'select',
    //   },
    // },
    // width: {
    //   control: {
    //     type: 'text',
    //     value: 'fill-parent',
    //   },
    // },
    // height: {
    //   control: {
    //     type: 'text',
    //     value: '100px',
    //   },
    // },
    // space: {
    //   control: {
    //     type: 'text',
    //     value: 'auto',
    //   },
    //   description: 'The space between each child',
    // },
  },
} as ComponentMeta<typeof RadiusAutoBox>;

const Template: ComponentStory<typeof RadiusAutoBox> = (
  args: ComponentProps<typeof RadiusAutoBox>
) => (
  <RadiusAutoBox {...args}>
    <RadiusAutoBox width={100} height={25} />
    <RadiusAutoBox width={100} height={25} />
    <RadiusAutoBox width={100} height={25} />
  </RadiusAutoBox>
);

export const Default = Template.bind({});
Default.args = {
  width: 'fill-parent',
  height: '100px',
  space: 'auto',
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
    >
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
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
    >
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height={25} stroke={'#000'} />
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
    >
      <RadiusAutoBox width="fill-parent" height="fill-parent" stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height="fill-parent" stroke={'#000'} />
      <RadiusAutoBox width="fill-parent" height="fill-parent" stroke={'#000'} />
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
    direction="horizontal"
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
    <RadiusAutoBox width="fill-parent">
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
