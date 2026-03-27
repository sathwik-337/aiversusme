import { migrate } from "drizzle-orm/neon-http/migrator";
import { db, sql } from "./index";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration successful");
  } catch (error: any) {
    if (error.cause?.code !== '42P07') {
      console.error(error);
      process.exit(1);
    }
  }

  // Apply the latest migrations manually
  try {
    const migration1 = require("fs").readFileSync("drizzle/0006_many_silver_centurion.sql", "utf-8");
    await (sql as any).query(migration1);
    console.log("Applied migration 6 successfully");

    const migration2 = require("fs").readFileSync("drizzle/0007_add_search_index.sql", "utf-8");
    await (sql as any).query(migration2);
    console.log("Applied migration 7 successfully");
  } catch (error) {
    console.error("Failed to apply latest migrations:", error);
    process.exit(1);
  }
}

main();
