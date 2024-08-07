import { sql } from "../../../db";
import { buildReturn } from "../../../utils/return";
import { wrapHandler } from "../../../utils/wrapHandler";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayProxyEvent) => {
    const data =
      await sql`SELECT * FROM users WHERE auth0_id = ${event.requestContext.authorizer?.principalId}`;

    if (data.length === 0) {
      return buildReturn(404, { message: "No user found" });
    }

    return buildReturn(200, data[0]);
  },
);
