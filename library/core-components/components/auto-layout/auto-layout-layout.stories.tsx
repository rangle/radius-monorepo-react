import React, { ComponentProps } from 'react';
import { Meta } from '@storybook/react';

// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';
import { Title, Stories, Description } from '@storybook/addon-docs';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Auto Layout/Layout',
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
    docs: {
      page: () => (
        <>
          <Title>Layout</Title>
          <Description children="We duplicate the way Figma arranges Auto Layout components."></Description>
          <Stories includePrimary={true} />
        </>
      ),
    },
  },
};

export default meta;
// type Story = StoryObj<typeof RadiusAutoLayout>;
// TODO: apply `Story` type to all stories - causes issues due to parent and children args not existing in original component

const ThreeBoxesTemplate = {
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
          height={args.children.height}
          fill={radiusTokens.component.color.button.primary.hover.background}
        />
        <RadiusAutoLayout
          width={args.children.width}
          height={args.children.height}
          fill={radiusTokens.component.color.button.primary.hover.background}
        />
        <RadiusAutoLayout
          width={args.children.width}
          height={args.children.height}
          fill={radiusTokens.component.color.button.primary.hover.background}
        />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  ),
};

export const FixedWidthHorizontal = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'horizontal',
      space: 'auto',
      alignment: 'top',
    },
    children: {
      width: 100,
      height: 25,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
    table: {
      disable: true,
    },
  },
};

export const FixedWidthHorizontalDefinedSpacing = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'horizontal',
      space: '--spacing-core-space-3x',
      alignment: 'top',
    },
    children: {
      width: 100,
      height: 25,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const FillWidthHorizontal = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'horizontal',
      space: '--spacing-core-space-base',
      alignment: 'top',
    },
    children: {
      width: 'fill-parent',
      height: 25,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const FixedHeightVertical = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'vertical',
      space: 'auto',
      alignment: 'left',
    },
    children: {
      width: '100%',
      height: 10,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const FixedHeightVerticalDefinedSpacing = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'vertical',
      space: '--spacing-core-space-5x',
      alignment: 'left',
    },
    children: {
      width: '100%',
      height: 10,
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

export const FillHeightVertical = {
  ...ThreeBoxesTemplate,
  args: {
    parent: {
      direction: 'vertical',
      space: '--spacing-core-space-base',
      alignment: 'left',
    },
    children: {
      width: '100%',
      height: 'fill-parent',
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
