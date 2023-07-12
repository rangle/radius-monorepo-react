import React from 'react';
import { Meta, StoryObj, ArgTypes, Args } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusIcon } from '.';
import * as icons from '@rangle/radius-foundations/generated/icons';
import { radiusTokens } from '@rangle/radius-foundations/generated/design-tokens.constants';
import { flattenObject } from '@rangle/radius-shared/utils';

const meta: Meta<typeof RadiusIcon> = {
  component: RadiusIcon,
  title: 'Component Development Kit / Icon',
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    component: {
      table: {
        disable: true,
      },
    },
    fill: {
      control: {
        type: 'select',
      },
      options: flattenObject(radiusTokens.component.color),
      defaultValue: 'currentColor',
    },
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(radiusTokens.semantic.sizing.imagesAndIcons.icons),
    },
  } as ArgTypes,
  args: {
    fill: radiusTokens.component.color.button.secondary.default.label,
    size: radiusTokens.semantic.sizing.imagesAndIcons.icons.default,
  } as Args,
};

export default meta;
type Story = StoryObj<typeof RadiusIcon>;

export const AllIcons: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 85px)',
        gap: '1rem',
        margin: '1rem',
      }}
    >
      {icons &&
        Object.entries(icons).map(([iconName, icon]) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: '85px',
            }}
          >
            {/* @ts-expect-error - incorrect args type (possibly?) means that the component doesn't think it's getting required props. Bug: BOOST-232 */}
            <RadiusIcon component={icon} {...args} />
            <span
              style={{
                font: '400 0.75rem/150% Riforma LL',
                color: `var(${radiusTokens.component.color.button.secondary.default.label})`,
              }}
            >
              {iconName}
            </span>
          </div>
        ))}
    </div>
  ),
};

const customSVGPath = 'M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z';

export const CustomSVGPath: Story = {
  args: {
    path: customSVGPath,
  } as Args,
};
