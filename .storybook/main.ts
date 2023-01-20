import { Config } from "@storybook/addons";

const versions = process.env.VERSION?.split('.')||['0','0','0'];

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../library/**/*.stories.mdx',
    '../library/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../shared/fonts', '../shared/assets', '../library/foundations/generated'],
  addons: [
    'storybook-version',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
  ],
  framework: '@storybook/react',
  env: (config:Config) => ({
    ...config,
    COMPONENT_VERSION: versions,
  }),
};
