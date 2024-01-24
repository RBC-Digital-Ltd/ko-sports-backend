import { env } from "node:process";
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";

const plugins = [
  sentryEsbuildPlugin({
    authToken: env.SENTRY_AUTH_TOKEN,
    org: "ray-parkar",
    project: "ko-sports-backend",
  }),
];

export default plugins;
