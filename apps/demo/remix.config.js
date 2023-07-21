/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // watchPaths: ['../../library'],
  watchPaths: () => require('@nx/remix').createWatchPaths(__dirname),
  serverDependenciesToBundle: [/.*@rangle\/radius-.+/],
};
