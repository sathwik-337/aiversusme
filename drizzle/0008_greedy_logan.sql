ALTER TABLE "academy_coupons" ADD COLUMN "course_slug" text;--> statement-breakpoint
ALTER TABLE "academy_coupons" ADD COLUMN "group_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "credits" integer DEFAULT 0 NOT NULL;