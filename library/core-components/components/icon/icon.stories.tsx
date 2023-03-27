import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// import { BADGE } from '@geometricpanda/storybook-addon-badges';

import { RadiusIcon } from '.';
import * as icons from '@rangle/radius-foundations/generated/icons';
// import AccountCircle from '@rangle/radius-foundations/src/assets/icons/svg/account-circle.svg';

// const componentOptions = Object.keys(icons).reduce((options, componentName) => {
//   options[componentName] = componentName;
//   return options;
// }, {});

const meta: Meta<typeof RadiusIcon> = {
  component: RadiusIcon,
  title: 'Icon',
  parameters: {
    // badges: [BADGE.EXPERIMENTAL],
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
      options: [
        '--color-text-on-base-primary',
        '--color-text-on-base-secondary',
        '--color-text-on-base-accent',
        '--color-text-on-base-disabled',
        '--color-text-inverse-primary',
        '--color-text-inverse-secondary',
        '--color-text-inverse-accent',
        '--color-text-on-subtle-primary',
        '--color-text-on-subtle-secondary',
        '--color-text-on-subtle-accent',
        '--color-text-on-subtle-disabled',
        '--color-text-on-accent-primary',
        '--color-text-on-accent-secondary',
        '--color-text-on-accent-disabled',
        '--color-text-primary-action-default',
        '--color-text-primary-action-hover',
        '--color-text-primary-action-active',
        '--color-text-primary-action-focus',
        '--color-text-primary-action-disabled',
        '--color-text-secondary-action-default',
        '--color-text-secondary-action-hover',
        '--color-text-secondary-action-active',
        '--color-text-secondary-action-focus',
        '--color-text-secondary-action-disabled',
        '--color-text-tertiary-action-default',
        '--color-text-tertiary-action-hover',
        '--color-text-tertiary-action-active',
        '--color-text-tertiary-action-focus',
        '--color-text-tertiary-action-disabled',
        '--color-background-base',
        '--color-background-subtle',
        '--color-background-accent',
        '--color-background-inverse',
        '--color-interaction-primary-default',
        '--color-interaction-primary-hover',
        '--color-interaction-primary-active',
        '--color-interaction-primary-focus',
        '--color-interaction-primary-disabled',
        '--color-interaction-secondary-default',
        '--color-interaction-secondary-hover',
        '--color-interaction-secondary-active',
        '--color-interaction-secondary-focus',
        '--color-interaction-secondary-disabled',
        '--color-interaction-tertiary-default',
        '--color-interaction-tertiary-hover',
        '--color-interaction-tertiary-active',
        '--color-interaction-tertiary-focus',
        '--color-interaction-tertiary-disabled',
      ],
    },
  },
  args: {
    fill: '--color-text-on-base-primary',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof RadiusIcon>;

// const ComponentWrapper = ({ component }) => {
//   return <RadiusIcon component={component} />;
// };

// export const Default: Story = {
//   render: (args) => <ComponentWrapper {...args} />,
//   args: {
//     component: icons.AccountCircle,
//   },
// };

export const AllIcons: Story = {
  render: (args) => (
    <div>
      {icons &&
        Object.values(icons).map((icon) => (
          <RadiusIcon component={icon} {...args} />
        ))}
    </div>
  ),
};

// console.log(AccountCircle);
// // const CustomRadiusIcon = withRadiusIcon(AccountCircle);

// // const CustomIcon = () => <>{AccountCircle}</>;

// export const CustomIcon: Story = {
//   render: () => <img scr={AccountCircle} />,
//   // args: {
//   //   children: AccountCircle,
//   // },
// };
