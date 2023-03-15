import React, { ComponentProps } from 'react';
import { ComponentMeta } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoBox } from './auto-box';
import { Stories, Title, Description } from '@storybook/addon-docs';

export default {
  component: RadiusAutoBox,
  title: `Core Components/AutoBox/Alignment`,
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
          <Title>Alignment</Title>
          <Description children="We duplicate the way Figma aligns in Auto Layout components."></Description>
          <Stories includePrimary={true} />
        </>
      ),
    },
  },
} as ComponentMeta<typeof RadiusAutoBox>;

const ThreeBoxesTemplateAlignmentHor = (args: {
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
      padding="--spacing-core-space-3x"
    >
      <RadiusAutoBox
        width={args.children.width}
        height={20}
        fill="--color-button-primary-surface-hover"
      />
      <RadiusAutoBox
        width={args.children.width}
        height={40}
        fill="--color-button-primary-surface-hover"
      />
      <RadiusAutoBox
        width={args.children.width}
        height={60}
        fill="--color-button-primary-surface-hover"
      />
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const AlignmentTop = ThreeBoxesTemplateAlignmentHor.bind({});
AlignmentTop.args = {
  parent: {
    direction: 'horizontal',
    space: 'auto',
    alignment: 'top',
  },
  children: {
    width: 100,
  },
};
AlignmentTop.parameters = {
  controls: {
    disable: true,
  },
};

export const AlignmentCenter = ThreeBoxesTemplateAlignmentHor.bind({});
AlignmentCenter.args = {
  parent: {
    direction: 'horizontal',
    space: 'auto',
    alignment: 'center',
  },
  children: {
    width: 100,
  },
};
AlignmentCenter.parameters = {
  controls: {
    disable: true,
  },
};

export const AlignmentBottom = ThreeBoxesTemplateAlignmentHor.bind({});
AlignmentBottom.args = {
  parent: {
    direction: 'horizontal',
    space: 'auto',
    alignment: 'bottom',
  },
  children: {
    width: 100,
  },
};
AlignmentBottom.parameters = {
  controls: {
    disable: true,
  },
  sidebar: { disabled: true },
};

const ThreeBoxesTemplateAlignmentVert = (args: {
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
      padding="--spacing-core-space-3x"
    >
      <RadiusAutoBox
        width="25%"
        height={10}
        fill="--color-button-primary-surface-hover"
      />
      <RadiusAutoBox
        width="50%"
        height={10}
        fill="--color-button-primary-surface-hover"
      />
      <RadiusAutoBox
        width="75%"
        height={10}
        fill="--color-button-primary-surface-hover"
      />
    </RadiusAutoBox>
  </RadiusAutoBox>
);

export const AlignmentLeft = ThreeBoxesTemplateAlignmentVert.bind({});
AlignmentLeft.args = {
  parent: {
    direction: 'vertical',
    space: 'auto',
    alignment: 'left',
  },
};
AlignmentLeft.parameters = {
  controls: {
    disable: true,
  },
  sidebar: { disabled: true },
};

export const AlignmentCenterVertically = ThreeBoxesTemplateAlignmentVert.bind(
  {}
);
AlignmentCenterVertically.args = {
  parent: {
    direction: 'vertical',
    space: 'auto',
    alignment: 'center',
  },
};
AlignmentCenterVertically.parameters = {
  controls: {
    disable: true,
  },
  sidebar: { disabled: true },
};

export const AlignmentRight = ThreeBoxesTemplateAlignmentVert.bind({});
AlignmentRight.args = {
  parent: {
    direction: 'vertical',
    space: 'auto',
    alignment: 'right',
  },
};
AlignmentRight.parameters = {
  name: 'Right',
  Title: 'Right',
  namespace: 'Right',
  controls: {
    disable: true,
  },
  sidebar: { disabled: true },
};
