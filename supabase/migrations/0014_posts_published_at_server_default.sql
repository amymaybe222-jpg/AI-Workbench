-- posts.published_at was being set from the browser's clock at insert time
-- (new Date().toISOString()). The SELECT policy requires
-- `published_at <= now()`, and RLS re-checks SELECT policies against the
-- row returned by `INSERT ... RETURNING` (what supabase-js's
-- `.select().single()` becomes). If the client's clock is even slightly
-- ahead of the Postgres server's, the newly-inserted row briefly fails its
-- own "published" check and the whole insert is rejected with
-- "new row violates row-level security policy for table posts" — even
-- though the INSERT's own WITH CHECK passed fine.
-- Default published_at to the server's own clock instead, so it can never
-- be ahead of `now()` at check time.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

alter table public.posts
  alter column published_at set default now();
