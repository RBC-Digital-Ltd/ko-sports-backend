const { env } = require("node:process");
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");

console.log(env);

let plugins = [
  sentryEsbuildPlugin({
    authToken: env.SENTRY_AUTH_TOKEN,
    org: "ray-parkar",
    project: "ko-sports-backend",
  }),
];

if (env.IS_OFFLINE) {
  plugins = [];
}

module.exports = plugins;
