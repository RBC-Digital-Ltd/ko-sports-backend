import util from "node:util";
import jwksClient, { CertSigningKey, RsaSigningKey } from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";

const getPolicyDocument = (effect: "Allow" | "Deny", resource: string) => {
  const policyDocument = {
    Version: "2012-10-17", // default version
    Statement: [
      {
        Action: "execute-api:Invoke", // default action
        Effect: effect,
        Resource: resource,
      },
    ],
  };
  return policyDocument;
};

// extract and return the Bearer Token from the Lambda event parameters
const getToken = (paramaters: AWSLambda.APIGatewayAuthorizerEvent) => {
  if (!paramaters.type || paramaters.type !== "TOKEN") {
    throw new Error('Expected "event.type" parameter to have value "TOKEN"');
  }

  const tokenString = paramaters.authorizationToken;
  if (!tokenString) {
    throw new Error('Expected "event.authorizationToken" parameter to be set');
  }

  const match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error(
      `Invalid Authorization token - ${tokenString} does not match "Bearer .*"`,
    );
  }
  return match[1];
};

const jwtOptions = {
  audience: process.env.AUDIENCE,
  issuer: process.env.TOKEN_ISSUER,
};

export const authenticate = (
  paramaters: AWSLambda.APIGatewayAuthorizerEvent,
) => {
  const token = getToken(paramaters);

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error("invalid token");
  }

  const getSigningKey = util.promisify(client.getSigningKey);
  return getSigningKey(decoded.header.kid)
    .then((key) => {
      const signingKey =
        (key as CertSigningKey).publicKey ||
        (key as RsaSigningKey).rsaPublicKey;
      return jwt.verify(token, signingKey, jwtOptions);
    })
    .then((decoded) => ({
      principalId: decoded.sub,
      policyDocument: getPolicyDocument("Allow", paramaters.methodArn),
      context: { scope: (decoded as JwtPayload).scope },
    }));
};

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 10, // Default value
  jwksUri: process.env.JWKS_URI || "",
});
