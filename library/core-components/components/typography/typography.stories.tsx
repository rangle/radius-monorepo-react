import { Meta, StoryObj, ArgTypes, Args } from '@storybook/react';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Typography } from './typography';
import { flattenObject } from '../../utils';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Typography',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
    componentSubtitle:
      'This Polymorphic component provides an interface to apply styles and semantics to text content.',
  },
  argTypes: {
    children: {
      type: { name: 'string', required: true },
      control: {
        type: 'text',
      },
    },
    as: {
      defaultValue: 'p',
    },
    align: {
      defaultValue: 'left',
    },
    fill: {
      options: flattenObject(radiusTokens.component.color),
    },
    font: {
      options: flattenObject({
        core: radiusTokens.core.typography,
        semantic: radiusTokens.semantic.typography,
        component: radiusTokens.component.typography,
      }),
    },
  } as ArgTypes, // TODO: Fix argTypes inference (broken due to polymorphic implementation?). This assertion is a workaround.
  args: {
    children: 'Hello World!',
    as: 'p',
    align: 'left',
    font: radiusTokens.core.typography.desktop.body.md,
  } as Args, // TODO: Fix args inference (broken due to polymorphic implementation?). This assertion is a workaround.
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

// export const Example: Story = {
//   render: () => (
//     <div>
//       <Typography font={radiusTokens.semantic.typography.desktop.}>Title</Typography>
//       <Typography fill="--color-text-on-base-accent">
//         Some body text. Lorem ipsum dolor sit, amet consectetur adipisicing
//         elit. Fuga, blanditiis.
//       </Typography>
//       <Typography
//         font="--typography-body-sm"
//         fill="--color-text-on-base-secondary"
//         align="right"
//       >
//         *Footnote
//       </Typography>
//     </div>
//   ),
//   parameters: {
//     controls: {
//       disable: true,
//     },
//   },
// };
