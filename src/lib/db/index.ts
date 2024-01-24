import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import {
  type NodePgDatabase,
  drizzle as drizzleNode,
} from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { isDev } from "~/utils";
import { env } from "../env/index.mjs";

neonConfig.fetchConnectionCache = true;

export const db = isDev
  ? drizzleNode(
      new Pool({
        connectionString: env.DATABASE_URL,
      }),
    )
  : drizzleNeon(neon(env.DATABASE_URL));

export function isNodePg(_database: typeof db): _database is NodePgDatabase {
  return isDev;
}
