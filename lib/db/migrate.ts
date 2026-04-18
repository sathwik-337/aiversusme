import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { db, pool } from "./index";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config({ path: ".env" });

function splitSqlStatements(sqlText: string) {
  return sqlText
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration successful");
  } catch (error: unknown) {
    if (!(error instanceof Error) || (error as { cause?: { code?: string } }).cause?.code !== "42P07") {
      console.error(error);
      process.exit(1);
    }
  }

  // Apply the latest migrations manually
  try {
    const manualMigrations = [
      // "drizzle/0006_many_silver_centurion.sql",
      // "drizzle/0007_add_search_index.sql",
      // "drizzle/0008_academy_assessment_results.sql",
      // "drizzle/0009_users.sql",
      // "drizzle/0010_academy_certificates.sql",
      // "drizzle/0011_add_course_slug_to_coupons.sql",
      "drizzle/0012_add_credits_to_users.sql",
    ];

    for (const migrationPath of manualMigrations) {
      const migrationSql = readFileSync(migrationPath, "utf-8");
      const statements = splitSqlStatements(migrationSql);

      for (const statement of statements) {
        await pool.query(statement);
      }

      console.log(`Applied ${migrationPath} successfully`);
    }
  } catch (error) {
    console.error("Failed to apply latest migrations:", error);
    process.exit(1);
  }
}

main();
