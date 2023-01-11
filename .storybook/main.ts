module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../library/**/*.stories.mdx',
    '../library/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // 'storybook-addon-pseudo-states',
    // "@storybook/addon-docs",
  ],
  framework: '@storybook/react',
  // typescript: {
  //   check: true,
  // },
};
