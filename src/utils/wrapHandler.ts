// You can also use ESM `import * as Sentry from "@sentry/serverless"` instead of `require`
import { AWSLambda } from "@sentry/serverless";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { type Handler } from "aws-lambda";

AWSLambda.init({
  dsn: "https://c904a50fae8b93c7347d6cec226b1d65@o369886.ingest.sentry.io/4506606652424192",
  integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

export const wrapHandler = (handler: Handler) => {
  return AWSLambda.wrapHandler(handler);
};
