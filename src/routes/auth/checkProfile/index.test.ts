import { type Context } from "aws-lambda";
import { handler } from ".";
import { sql } from "../../../db";

jest.mock("../../../db");

describe("checkProfile", () => {
  it("should return 404 when there is no user", async () => {
    const event = {
      requestContext: {
        authorizer: {
          claims: {
            sub: "auth0|123",
          },
        },
      },
    };

    (sql as unknown as jest.Mock).mockResolvedValue([]);

    const response = await handler(event, {} as unknown as Context, () => {});
    expect(response.statusCode).toBe(404);
  });

  it("should return 200 with the user when there is a user", async () => {
    const event = {
      requestContext: {
        authorizer: {
          claims: {
            sub: "auth0|123",
          },
        },
      },
    };

    const mockUser = {
      id: 1,
      email: "test@test.com",
      first_name: "Test",
      last_name: "User",
      auth0_id: "auth0|123",
      profile_complete: false,
    };

    (sql as unknown as jest.Mock).mockResolvedValue([mockUser]);

    const response = await handler(event, {} as unknown as Context, () => {});
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(mockUser, undefined, 2));
  });
});
