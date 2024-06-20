import React, { ComponentProps } from 'react';
import { Meta } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { Stories, Title, Description } from '@storybook/addon-docs';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Auto Layout / Alignment',
  parameters: {
    badges: [BADGE.BETA],
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
};

export default meta;
// type Story = StoryObj<typeof RadiusAutoLayout>;
// TODO: apply `Story` type to all stories - causes issues due to parent and children args not existing in original component

const ThreeBoxesTemplateAlignmentHor = {
  render: (args: {
    parent: ComponentProps<typeof RadiusAutoLayout>;
    children: ComponentProps<typeof RadiusAutoLayout>;
  }) => (
    <RadiusAutoLayout direction="vertical">
      <RadiusAutoLayout
        direction={args.parent.direction}
        space={args.parent.space}
        alignment={args.parent.alignment}
        width="fill-parent"
        height={
          args.parent.direction === 'horizontal' ? 'fill-parent' : '100px'
        }
        padding={{ css: '12px' }}
      >
        <RadiusAutoLayout
          width={args.children.width}
          height={20}
          fill={{ css: '#D44527' }}
        />
        <RadiusAutoLayout
          width={args.children.width}
          height={40}
          fill={{ css: '#D44527' }}
        />
        <RadiusAutoLayout
          width={args.children.width}
          height={60}
          fill={{ css: '#D44527' }}
        />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

export const AlignmentTop = {
  ...ThreeBoxesTemplateAlignmentHor,
  args: {
    parent: {
      direction: 'horizontal',
      space: 'auto',
      alignment: 'top',
    },
    children: {
      width: 100,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AlignmentCenter = {
  ...ThreeBoxesTemplateAlignmentHor,
  args: {
    parent: {
      direction: 'horizontal',
      space: 'auto',
      alignment: 'center',
    },
    children: {
      width: 100,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AlignmentBottom = {
  ...ThreeBoxesTemplateAlignmentHor,
  args: {
    parent: {
      direction: 'horizontal',
      space: 'auto',
      alignment: 'bottom',
    },
    children: {
      width: 100,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
    sidebar: { disabled: true },
  },
};

const ThreeBoxesTemplateAlignmentVert = {
  render: (args: {
    parent: ComponentProps<typeof RadiusAutoLayout>;
    children: ComponentProps<typeof RadiusAutoLayout>;
  }) => (
    <RadiusAutoLayout direction="vertical">
      <RadiusAutoLayout
        direction={args.parent.direction}
        space={args.parent.space}
        alignment={args.parent.alignment}
        width="fill-parent"
        height={
          args.parent.direction === 'horizontal' ? 'fill-parent' : '100px'
        }
        padding={{ css: '12px' }}
      >
        <RadiusAutoLayout width="25%" height={10} fill={{ css: '#D44527' }} />
        <RadiusAutoLayout width="50%" height={10} fill={{ css: '#D44527' }} />
        <RadiusAutoLayout width="75%" height={10} fill={{ css: '#D44527' }} />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

export const AlignmentLeft = {
  ...ThreeBoxesTemplateAlignmentVert,
  args: {
    parent: {
      direction: 'vertical',
      space: 'auto',
      alignment: 'left',
    },
    children: {
      width: 100,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AlignmentCenterVertically = {
  ...ThreeBoxesTemplateAlignmentVert,
  args: {
    parent: {
      direction: 'vertical',
      space: 'auto',
      alignment: 'center',
    },
    children: {
      width: 100,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const AlignmentRight = {
  ...ThreeBoxesTemplateAlignmentVert,
  args: {
    parent: {
      direction: 'vertical',
      space: 'auto',
      alignment: 'right',
    },
  },
  parameters: {
    name: 'Right',
    Title: 'Right',
    namespace: 'Right',
    controls: {
      disable: true,
    },
    sidebar: { disabled: true },
  },
};
