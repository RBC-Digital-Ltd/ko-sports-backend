import { env } from "node:process";
import mysql from "mysql2/promise";

const pool = mysql.createPool(env.DATABASE_URL || "");

export const makeQuery = async (query: string) => {
  const result = await pool.query(query);
  return result;
};
