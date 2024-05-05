import { sql } from "../../../db";
import { buildReturn } from "../../../utils/return";
import { wrapHandler } from "../../../utils/wrapHandler";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayProxyEvent) => {
    console.log(event.requestContext.authorizer);

    const data =
      await sql`SELECT * FROM users WHERE auth0_id = ${event.requestContext.authorizer?.claims?.sub}`;

    if (data.length === 0) {
      return buildReturn(404, { message: "No user found" });
    }

    return buildReturn(200, data[0]);
  },
);
