import { type Handler } from "aws-lambda";
import Sentry from "@sentry/aws-serverless";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (process.env.NODE_ENV !== "test") {
  Sentry.init({
    dsn: "https://c904a50fae8b93c7347d6cec226b1d65@o369886.ingest.sentry.io/4506606652424192",
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1,
  });
}

export const wrapHandler = (handler: Handler) => {
  if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    return handler;
  }

  return Sentry.wrapHandler(handler);
};
