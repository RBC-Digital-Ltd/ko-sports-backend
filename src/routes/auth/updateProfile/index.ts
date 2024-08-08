import { sql } from "~/db";
import { buildReturn } from "~/utils/return";
import { wrapHandler } from "~/utils/wrapHandler";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body || "{}");

    const result = await sql`
    UPDATE users SET
    first_name = ${body.firstName},
    last_name = ${body.lastName},
    profile_complete = ${true}
    WHERE auth0_id = ${event.requestContext.authorizer?.principalId}
     RETURNING *;
  `;

    return buildReturn(200, result[0]);
  },
);
