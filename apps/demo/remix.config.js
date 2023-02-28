/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  serverBuildTarget: "node-cjs",
  server: undefined,
  serverDependenciesToBundle: ['@rangle/radius-react-core-foundations', '@rangle/radius-react-core-components'],
};
