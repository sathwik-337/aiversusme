import { pool } from "./index";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function main() {
  try {
    console.log("Applying missing columns...");
    
    // Check if group_name exists, if not add it
    try {
      await pool.query('ALTER TABLE "academy_coupons" ADD COLUMN IF NOT EXISTS "group_name" text;');
      console.log("Applied group_name to academy_coupons");
    } catch (e) {
      console.log("group_name might already exist or table missing");
    }

    console.log("Fix applied successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to apply fix:", error);
    process.exit(1);
  }
}

main();
