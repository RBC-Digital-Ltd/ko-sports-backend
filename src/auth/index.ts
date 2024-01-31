import { wrapHandler } from "../utils/wrapHandler";
import { authenticate } from "./library";

export const handler = wrapHandler(
  async (event: AWSLambda.APIGatewayAuthorizerEvent) => {
    try {
      const data = await authenticate(event);

      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Unauthorized");
    }
  },
);
