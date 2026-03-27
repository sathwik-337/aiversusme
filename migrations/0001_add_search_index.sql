CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS job_search_idx ON jobs USING gin (title gin_trgm_ops, slug gin_trgm_ops, synonyms gin_trgm_ops);
