import { wrapHandler } from "./utils/wrapHandler";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayProxyEvent) => {
    throw new Error("This should show up in Sentry!");
    return {
      statusCode: 200,
      headers: {
        "x-api-version": process.env.API_VERSION,
      },
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          input: event,
        },
        null,
        2,
      ),
    };
  },
);
