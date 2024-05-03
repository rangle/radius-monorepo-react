module.exports = {
  eslint: { ignoreDuringBuilds: true },
  // Hardcode the dependencies here instead of getting them from the nx next plugin
  // because sst calls build from the package.json and does not have access to the
  // dependency graph.
  transpilePackages: [
    '@rangle/radius-foundations',
    '@rangle/radius-react-core-components',
    '@rangle/radius-shared',
    '@rangle/radius-react-examples',
  ],
  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true,
  },
};
