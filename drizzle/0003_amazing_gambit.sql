CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_slug" text NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
