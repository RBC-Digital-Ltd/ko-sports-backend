import { env } from "node:process";
import postgres from "postgres";

const pool = postgres(env.DATABASE_URL || "", {});

export const makeQuery = async (query: string) => {
  const result = await pool`${query}`;
  return result;
};
