import { env } from "node:process";
import postgres from "postgres";

export const sql = postgres(env.DATABASE_URL || "", {});

export const makeQuery = async (query: string) => {
  const result = await sql`${query}`;
  return result;
};
