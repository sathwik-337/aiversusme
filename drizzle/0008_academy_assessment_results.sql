CREATE TABLE IF NOT EXISTS academy_assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  course_slug text NOT NULL,
  module_id text NOT NULL,
  assessment_type text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS academy_assessment_unique
  ON academy_assessment_results (user_id, course_slug, module_id, assessment_type);
