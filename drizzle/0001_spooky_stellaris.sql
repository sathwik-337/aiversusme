ALTER TABLE "jobs" ADD COLUMN "calculated_risk" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "polling_risk" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "votes_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "hourly_salary" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "growth_projection_year" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "volume" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "job_score" text;