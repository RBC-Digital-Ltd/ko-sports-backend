import { type Context } from "aws-lambda";
import { test } from "@japa/runner";
import { handler } from "./index";

test.group("Health Check", () => {
  test("should return 200 with the right message", async ({ expect }) => {
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
});
