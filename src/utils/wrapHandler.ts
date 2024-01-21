import { type Handler } from "aws-lambda";
import { AWSLambda } from "@sentry/serverless";
import { ProfilingIntegration } from "@sentry/profiling-node";

AWSLambda.init({
  dsn: "https://c904a50fae8b93c7347d6cec226b1d65@o369886.ingest.sentry.io/4506606652424192",
  integrations: [new ProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1,
});

export const wrapHandler = (handler: Handler) => {
  return AWSLambda.wrapHandler(handler);
};
