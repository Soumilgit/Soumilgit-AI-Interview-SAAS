import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
import "server-only";

const databaseUrl = process.env.NEXT_DRIZZLE_DB_URL;
if (!databaseUrl) throw new Error("NEXT_DRIZZLE_DB_URL is not configured");
const sql = neon(databaseUrl);
export const db = drizzle(sql,{schema});
