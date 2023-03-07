import { Config } from '@storybook/addons';

const versions = process.env.VERSION?.split('.') || ['0', '0', '0'];

module.exports = {
  core: {
    builder: 'webpack5',
  },

  // the location of where storybook should look for it's stories
  stories: [
    '../library/**/*.stories.mdx',
    '../library/**/*.stories.@(js|jsx|ts|tsx)',
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
  ],
  framework: '@storybook/react',

  // We add versions globally from the build env
  // Access the variable with process.env.COMPONENT_VERSION
  env: (config: Config) => ({
    ...config,
    COMPONENT_VERSION: versions,
  }),
};
