import {
  jsonb,
  pgTable,
  text,
  integer,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  risk_score: integer("risk_score").notNull(),
  calculated_risk: integer("calculated_risk"),
  polling_risk: integer("polling_risk"),
  votes_count: integer("votes_count").default(0),
  salary: text("salary").notNull(),
  hourly_salary: text("hourly_salary"),
  growth_rate: text("growth_rate").notNull(),
  growth_year: text("growth_projection_year"),
  demand_level: text("demand_level").notNull(),
  volume: integer("volume"),
  job_score: text("job_score"),
  description: text("description").notNull(),
  synonyms: text("synonyms"),
  job_code: text("job_code"), // Custom AIVSME code
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const jobPolls = pgTable("job_polls", {
  slug: text("slug").unique().notNull(),
  highly_likely: integer("highly_likely").default(0).notNull(),
  moderate: integer("moderate").default(0).notNull(),
  uncertain: integer("uncertain").default(0).notNull(),
  low: integer("low").default(0).notNull(),
  no_chance: integer("no_chance").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  job_slug: text("job_slug").notNull(),
  user_id: text("user_id").notNull(), // Added user_id
  name: text("name").notNull(),
  email: text("email"),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const pollVotes = pgTable("poll_votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  job_slug: text("job_slug").notNull(),
  user_id: text("user_id").notNull(),
  vote_type: text("vote_type").notNull(), // highly_likely, moderate, etc.
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerk_user_id: text("clerk_user_id").notNull(),
    email: text("email"),
    first_name: text("first_name"),
    last_name: text("last_name"),
    full_name: text("full_name"),
    image_url: text("image_url"),
    credits: integer("credits").default(0).notNull(), // Added credits field
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    usersClerkUserIdUnique: uniqueIndex("users_clerk_user_id_unique").on(
      table.clerk_user_id
    ),
  })
);

export const academyAssessmentResults = pgTable(
  "academy_assessment_results",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: text("user_id").notNull(),
    course_slug: text("course_slug").notNull(),
    module_id: text("module_id").notNull(),
    assessment_type: text("assessment_type").notNull(),
    score: integer("score").notNull(),
    total_questions: integer("total_questions").notNull(),
    answers: jsonb("answers")
      .$type<Record<string, string>>()
      .notNull()
      .default({}),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    academyAssessmentUnique: uniqueIndex("academy_assessment_unique").on(
      table.user_id,
      table.course_slug,
      table.module_id,
      table.assessment_type
    ),
  })
);

export const academyCertificates = pgTable(
  "academy_certificates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: text("user_id").notNull(),
    course_slug: text("course_slug").notNull(),
    certificate_number: text("certificate_number").notNull(),
    recipient_name: text("recipient_name").notNull(),
    recipient_email: text("recipient_email").notNull(),
    course_title: text("course_title").notNull(),
    grade: text("grade").notNull(),
    percentage: integer("percentage").notNull(),
    completed_at: timestamp("completed_at").notNull(),
    email_status: text("email_status").notNull().default("pending"),
    email_sent_at: timestamp("email_sent_at"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    academyCertificateUserCourseUnique: uniqueIndex(
      "academy_certificate_user_course_unique"
    ).on(table.user_id, table.course_slug),
    academyCertificateNumberUnique: uniqueIndex(
      "academy_certificate_number_unique"
    ).on(table.certificate_number),
  })
);

export const academyCourses = pgTable("academy_courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  tagline: text("tagline"),
  summary: text("summary"),
  description: text("description"),
  duration: text("duration"),
  level: text("level"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const academyModules = pgTable("academy_modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  course_id: uuid("course_id")
    .notNull()
    .references(() => academyCourses.id, { onDelete: "cascade" }),
  module_id: text("module_id").notNull(), // e.g. "01"
  title: text("title").notNull(),
  description: text("description"),
  notes_url: text("notes_url"),
  quiz: jsonb("quiz").default([]).notNull(), // Added quiz field as JSONB to store questions and options
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const academyOrders = pgTable("academy_orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull(),
  course_slug: text("course_slug").notNull(),
  razorpay_order_id: text("razorpay_order_id").unique().notNull(),
  razorpay_payment_id: text("razorpay_payment_id"),
  razorpay_signature: text("razorpay_signature"),
  amount: integer("amount").notNull(), // Amount in paise
  currency: text("currency").notNull().default("INR"),
  status: text("status").notNull().default("pending"), // pending, paid, failed
  coupon_code: text("coupon_code"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const academyCoupons = pgTable("academy_coupons", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").unique().notNull(),
  course_slug: text("course_slug"), // null means applicable to all courses
  discount_percentage: integer("discount_percentage").notNull(), // 0 to 100
  is_active: integer("is_active").notNull().default(1), // 1 for active, 0 for inactive
  usage_limit: integer("usage_limit").default(-1), // -1 for unlimited
  usage_count: integer("usage_count").default(0).notNull(),
  group_name: text("group_name"), // Added group name for institutional/group coupons
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

