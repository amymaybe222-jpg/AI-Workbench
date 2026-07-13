-- posts.user_id still had a `not null` foreign key to the legacy fake
-- public.users table (migration 0001). Migration 0012 moved real ownership
-- to posts.owner_id (references auth.users), but every insert still writes
-- the real signed-in user's id into user_id too — which doesn't exist in
-- public.users, so the old FK rejects every new post with a foreign key
-- violation. public.users is legacy demo-only data at this point (see
-- 0009's comment), so drop the constraint rather than repoint it: existing
-- seeded posts keep their fake user_id for display purposes, and it's no
-- longer meaningful as a referential link for new posts (owner_id is).
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

alter table public.posts
  drop constraint if exists posts_user_id_fkey;
