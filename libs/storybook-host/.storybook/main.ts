import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  // the location of where storybook should look for its stories
  stories: [
    {
      directory: '../../',
      titlePrefix: 'About',
      files: '**/*.mdx',
    },
    {
      directory: '../../core-components',
      titlePrefix: 'Component Development Kit',
      files: '**/*.stories.tsx',
    },
    {
      directory: '../../radius-examples',
      titlePrefix: 'Radius Examples',
      files: '**/*.stories.tsx',
    },
  ],
  staticDirs: [
    '../../foundations/src',
    '../../../radius/brands/radius/fonts',
    '../../../radius/brands/radius/assets',
  ],
  addons: [
    '@nx/react/plugins/storybook',
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
  docs: {
    autodocs: true,
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
