// eslint-disable-next-line @typescript-eslint/no-var-requires
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");

module.exports = [
  sentryEsbuildPlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: "ray-parkar",
    project: "ko-sports-backend",
  }),
];
