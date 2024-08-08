import { sql } from "../../../db";
import { buildReturn } from "../../../utils/return";
import { wrapHandler } from "../../../utils/wrapHandler";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayProxyEvent) => {
    const body = JSON.parse(event.body || "{}");

    await sql`
    INSERT INTO users (
      email, auth0_id
    ) values (
      ${body.email}, ${event.requestContext.authorizer?.principalId}
    ) RETURNING *;
  `;

    return buildReturn(201, {});
  },
);
