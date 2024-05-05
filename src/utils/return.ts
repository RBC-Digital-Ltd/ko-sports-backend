export const buildReturn = (statusCode: number, body: unknown) => {
  return {
    statusCode,
    headers: {
      "x-api-version": process.env.API_VERSION,
    },
    body: JSON.stringify(body, undefined, 2),
  };
};
