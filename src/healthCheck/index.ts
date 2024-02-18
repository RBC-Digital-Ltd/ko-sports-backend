import { wrapHandler } from "../utils/wrapHandler";

export const handler = wrapHandler(async () => {
  return {
    statusCode: 200,
    headers: {
      "x-api-version": process.env.API_VERSION,
    },
    body: JSON.stringify(
      {
        message: "Health Check Successful",
      },
      undefined,
      2,
    ),
  };
});
