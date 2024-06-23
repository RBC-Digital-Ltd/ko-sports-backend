import { buildReturn } from "./return";

describe("buildReturn", () => {
  it("should return a response with the correct status code and body", () => {
    const response = buildReturn(200, { message: "Hello, world!" });
    expect(response).toEqual({
      statusCode: 200,
      headers: {
        "x-api-version": process.env.API_VERSION,
      },
      body: JSON.stringify({ message: "Hello, world!" }, undefined, 2),
    });
  });
});
