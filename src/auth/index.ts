import { authenticate } from "./library";

export const handler = async (event: AWSLambda.APIGatewayAuthorizerEvent) => {
  try {
    const data = await authenticate(event);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Unauthorized");
  }
};
