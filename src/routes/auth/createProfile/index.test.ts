import { type Context } from "aws-lambda";
import { handler } from ".";

jest.mock("../../../db");

describe("createProfile", () => {
  it("should return 201 when creating a new user", async () => {
    const event = {
      body: JSON.stringify({ email: "test@test.com" }),
      requestContext: {
        authorizer: {
          claims: {
            sub: "auth0|123",
          },
        },
      },
    };

    const response = await handler(event, {} as unknown as Context, () => {});
    expect(response.statusCode).toBe(201);
  });
});
