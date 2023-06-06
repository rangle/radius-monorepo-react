import { Config } from '@storybook/addons';
const versions = process.env.VERSION?.split('.') || ['0', '0', '0'];
module.exports = {
  // the location of where storybook should look for it's stories
  stories: [
    {
      directory: '../library',
      titlePrefix: 'About',
      files: '**/*.mdx',
    },
    // TODO: group stories by CDK/examples here after they have been moved to separate packages
    '../library/core-components/**/*.stories.tsx',
  ],
  // Add assets, these files will be added to the root of the build (/fonts.css)
  staticDirs: [
    '../shared/fonts',
    '../shared/assets',
    '../library/foundations',
    '../radius/assets',
  ],
  addons: [
    'storybook-version',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states',
    '@geometricpanda/storybook-addon-badges',
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
