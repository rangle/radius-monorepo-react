import { Config } from '@storybook/addons';
const versions = process.env.VERSION?.split('.') || ['0', '0', '0'];
module.exports = {
  // the location of where storybook should look for it's stories
  // stories: [
  //   // '../library/**/*.mdx',
  //   '../library/**/*.stories.@(js|jsx|ts|tsx)',
  // ],
  stories: [
    {
      directory: '../library/core-components/components',
      titlePrefix: 'Core Components',
      files: '**/*.stories.*',
    },
  ],
  // Add assets, these files will be added to the root of the build (/fonts.css)
  staticDirs: [
    '../shared/fonts',
    '../shared/assets',
    '../library/foundations/generated',
  ],
  addons: [
    'storybook-version',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
    '@geometricpanda/storybook-addon-badges',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // We add versions globally from the build env
  // Access the variable with process.env.COMPONENT_VERSION
  env: (config: Config) => ({
    ...config,
    COMPONENT_VERSION: versions,
  }),
  docs: {
    autodocs: true,
  },
};
