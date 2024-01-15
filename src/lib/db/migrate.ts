import { migrate as migrateNeon } from "drizzle-orm/neon-http/migrator";
import { migrate as migrateNode } from "drizzle-orm/node-postgres/migrator";

import { db, isNodePg } from ".";

async function main() {
  console.log("⏳ Running migrations...");

  const start = Date.now();

  console.log("💾 Using", isNodePg(db) ? "Node Postgres" : "Neon");

  if (isNodePg(db)) {
    await migrateNode(db, { migrationsFolder: "src/lib/db/migrations" });
  } else {
    await migrateNeon(db, { migrationsFolder: "src/lib/db/migrations" });
  }

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
