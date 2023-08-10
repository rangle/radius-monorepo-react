import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusAutoLayout } from './auto-layout';

const meta: Meta<typeof RadiusAutoLayout> = {
  component: RadiusAutoLayout,
  title: 'Auto Layout / Wrap',
  parameters: {
    badges: [BADGE.BETA],
  },
};

export default meta;
type Story = StoryObj<typeof RadiusAutoLayout>;

export const AutoLayoutWrapHorizontal: Story = {
  render: () => (
    <RadiusAutoLayout
      wrap="wrap"
      isParent
      as="div"
      alignment="center"
      direction="horizontal"
      space={{ css: '10px' }}
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: `1px` }}
      height={150}
      width={300}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return (
          <RadiusAutoLayout
            key={index}
            width={40}
            height={40}
            fill={{ css: '#F7856E' }}
            style={{ zIndex: 1 }}
          />
        );
      })}
    </RadiusAutoLayout>
  ),
};

export const AutoLayoutWrapVertical: Story = {
  render: () => (
    <RadiusAutoLayout
      wrap="wrap"
      isParent
      as="div"
      alignment="center"
      direction="vertical"
      space={{ css: '10px' }}
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: `1px` }}
      width={300}
      height={150}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return (
          <RadiusAutoLayout
            key={index}
            width={40}
            height={40}
            fill={{ css: '#F7856E' }}
            style={{ zIndex: 1 }}
          />
        );
      })}
    </RadiusAutoLayout>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <RadiusAutoLayout
      wrap="nowrap"
      isParent
      as="div"
      alignment="center"
      direction="horizontal"
      space={{ css: '10px' }}
      stroke={{ css: '#A6A6A6' }}
      strokeWidth={{ css: `1px` }}
      height={150}
      width={300}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
        return (
          <RadiusAutoLayout
            key={index}
            width={40}
            height={40}
            fill={{ css: '#F7856E' }}
            style={{ zIndex: 1 }}
          />
        );
      })}
    </RadiusAutoLayout>
  ),
};
