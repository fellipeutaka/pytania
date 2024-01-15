import { db, isNodePg } from ".";

async function main() {
  console.log("⏳ Seeding database...");

  const start = Date.now();

  console.log("💾 Using", isNodePg(db) ? "Node Postgres" : "Neon");

  // TODO: Seed your database here

  const end = Date.now();

  console.log("✅ Seed completed in", end - start, "ms");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed");
  console.error(err);
  process.exit(1);
});
