import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { RadiusButton, RadiusButtonProps } from './button';

export default {
  component: RadiusButton,
  title: 'Core COmponents/Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/????',
    },
    badges: [BADGE.EXPERIMENTAL],
  },
} as ComponentMeta<typeof RadiusButton>;

const Template: ComponentStory<typeof RadiusButton> = (
  args: RadiusButtonProps
) => <RadiusButton {...args}>Hello World</RadiusButton>;

export const Default = Template.bind({});
Default.args = {};

// export const forwardRefExample = () => {
//   const ref = React.createRef();
//   console.log(ref);
//   setTimeout(() => {
//     console.log(ref);
//   }, 1000);
//   return (
//     <div style={{ display: 'flex', gap: '1em', padding: '1em 0' }}>
//       hello world forward ref demo
//       <RadiusButton ref={ref}>Hello World</RadiusButton>
//     </div>
//   );
// };
