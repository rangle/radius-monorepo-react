import React, { ComponentProps } from 'react';
import { ComponentMeta } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoBox } from './autoBox';
import { Title, Stories, Description } from '@storybook/addon-docs';

export default {
  component: RadiusAutoBox,
  title: `Core Components/AutoBox/Layout`,
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
    docs: {
      page: () => (
        <>
          <Title>Layout</Title>
          <Description children="Here we try to mimic the way Figma arranges components when inside of a Auto Layout component."></Description>
          <Stories includePrimary={true} />
        </>
      ),
    },
  },
} as ComponentMeta<typeof RadiusAutoBox>;

const ThreeBoxesTemplate = (args: {
  parent: ComponentProps<typeof RadiusAutoBox>;
  children: ComponentProps<typeof RadiusAutoBox>;
}) => (
  <RadiusAutoBox direction="vertical">
    <RadiusAutoBox
      direction={args.parent.direction}
      space={args.parent.space}
      alignment={args.parent.alignment}
      width="fill-parent"
      height={args.parent.direction === 'horizontal' ? 'fill-parent' : '100px'}
      padding={10}
    >
      <RadiusAutoBox
        width={args.children.width}
        height={args.children.height}
        fill="var(--color-button-primary-surface-hover)"
      />
      <RadiusAutoBox
        width={args.children.width}
        height={args.children.height}
        fill="var(--color-button-primary-surface-hover)"
      />
      <RadiusAutoBox
        width={args.children.width}
        height={args.children.height}
        fill="var(--color-button-primary-surface-hover)"
      />
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const FixedWidthHorizontal = ThreeBoxesTemplate.bind({});
FixedWidthHorizontal.args = {
  parent: {
    direction: 'horizontal',
    space: 'auto',
    alignment: 'top',
  },
  children: {
    width: 100,
    height: 25,
  },
};
FixedWidthHorizontal.parameters = {
  controls: {
    disable: true,
  },
  table: {
    disable: true,
  },
};

export const FixedWidthHorizontalDefinedSpacing = ThreeBoxesTemplate.bind({});
FixedWidthHorizontalDefinedSpacing.args = {
  parent: {
    direction: 'horizontal',
    space: '10px',
    alignment: 'top',
  },
  children: {
    width: 100,
    height: 25,
  },
};
FixedWidthHorizontalDefinedSpacing.parameters = {
  controls: {
    disable: true,
  },
};

export const FillWidthHorizontal = ThreeBoxesTemplate.bind({});
FillWidthHorizontal.args = {
  parent: {
    direction: 'horizontal',
    space: 5,
    alignment: 'top',
  },
  children: {
    width: 'fill-parent',
    height: 25,
  },
};
FillWidthHorizontal.parameters = {
  controls: {
    disable: true,
  },
};

export const FixedHeightVertical = ThreeBoxesTemplate.bind({});
FixedHeightVertical.args = {
  parent: {
    direction: 'vertical',
    space: 'auto',
    alignment: 'left',
  },
  children: {
    width: '100%',
    height: 10,
  },
};
FixedHeightVertical.parameters = {
  controls: {
    disable: true,
  },
};

export const FixedHeightVerticalDefinedSpacing = ThreeBoxesTemplate.bind({});
FixedHeightVerticalDefinedSpacing.args = {
  parent: {
    direction: 'vertical',
    space: '20px',
    alignment: 'left',
  },
  children: {
    width: '100%',
    height: 10,
  },
};
FixedHeightVerticalDefinedSpacing.parameters = {
  controls: {
    disable: true,
  },
};

export const FillHeightVertical = ThreeBoxesTemplate.bind({});
FillHeightVertical.args = {
  parent: {
    direction: 'vertical',
    space: '5px',
    alignment: 'left',
  },
  children: {
    width: '100%',
    height: 'fill-parent',
  },
};
FillHeightVertical.parameters = {
  controls: {
    disable: true,
  },
};
