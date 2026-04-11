CREATE TABLE IF NOT EXISTS academy_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  course_slug text NOT NULL,
  certificate_number text NOT NULL,
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  course_title text NOT NULL,
  grade text NOT NULL,
  percentage integer NOT NULL,
  completed_at timestamp NOT NULL,
  email_status text NOT NULL DEFAULT 'pending',
  email_sent_at timestamp,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS academy_certificate_user_course_unique
  ON academy_certificates (user_id, course_slug);

CREATE UNIQUE INDEX IF NOT EXISTS academy_certificate_number_unique
  ON academy_certificates (certificate_number);
