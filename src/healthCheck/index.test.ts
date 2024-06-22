import { type Context } from "aws-lambda";
import { handler } from "./index";

test("should return 200 with the right message", async () => {
  const response = await handler({}, {} as unknown as Context, () => {});

  expect(response).toEqual({
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
  });
});
