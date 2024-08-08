const { env } = require("node:process");
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");

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

const config = (serverless) => {
  return {
    sourcemap: true,
    bundle: true,
    minify: false,
    target: "node20",
    platform: "node",
    loader: {
      ".node": "copy",
    },
    external: ["@sentry/profiling-node"],
    plugins,
  };
};

module.exports = config;
