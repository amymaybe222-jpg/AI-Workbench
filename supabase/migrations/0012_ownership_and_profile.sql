-- Real per-user ownership for posts/comments/likes, tied to auth.users now
-- that Google OAuth is wired up (migration 0009), plus profile columns for
-- job title/team/website so profile edits can persist server-side instead
-- of localStorage-only. Replaces the "demo, no auth" public write policies
-- from migrations 0001/0004 with auth.uid()-scoped ownership.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

-- ─────────────────────────────
-- Ownership columns
-- ─────────────────────────────
alter table public.posts
  add column if not exists owner_id uuid references auth.users (id) on delete set null;

alter table public.comments
  add column if not exists owner_id uuid references auth.users (id) on delete set null;

create index if not exists idx_posts_owner_id on public.posts (owner_id);
create index if not exists idx_comments_owner_id on public.comments (owner_id);

-- posts_with_like_counts (migration 0004) was created with `p.*` before
-- owner_id existed — Postgres freezes a view's column list at creation
-- time, so adding the column to the table above doesn't add it to the
-- view. `create or replace view` can only append columns at the end, and
-- owner_id lands before like_count in p.*'s expansion, so it must be
-- dropped and recreated rather than replaced.
drop view if exists public.posts_with_like_counts;

create view public.posts_with_like_counts as
select
  p.*,
  coalesce(l.like_count, 0) as like_count
from public.posts p
left join (
  select post_id, count(*) as like_count
  from public.post_likes
  group by post_id
) l on l.post_id = p.id;

-- post_likes.user_id pointed at the fake public.users table (migration 0001).
-- The table is seeded empty (migration 0004), so it's safe to repoint the FK
-- at the real auth.users table.
alter table public.post_likes
  drop constraint if exists post_likes_user_id_fkey;

alter table public.post_likes
  add constraint post_likes_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- ─────────────────────────────
-- Profile fields (distinct from the existing `role` column, which is the
-- admin/user access flag, not a job title)
-- ─────────────────────────────
alter table public.profiles
  add column if not exists job_title text,
  add column if not exists team text,
  add column if not exists website text;

-- ─────────────────────────────
-- posts: ownership-scoped writes
-- ─────────────────────────────
drop policy if exists "Owners can insert posts" on public.posts;
create policy "Owners can insert posts"
  on public.posts for insert
  with check (auth.uid() is not null and owner_id = auth.uid());

drop policy if exists "Owners can update own posts" on public.posts;
create policy "Owners can update own posts"
  on public.posts for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "Owners can delete own posts" on public.posts;
create policy "Owners can delete own posts"
  on public.posts for delete
  using (owner_id = auth.uid());

-- ─────────────────────────────
-- comments: replace demo-only insert/delete with ownership, add update
-- ─────────────────────────────
drop policy if exists "Public can insert comments (demo, no auth)" on public.comments;
drop policy if exists "Public can delete comments (demo, no auth)" on public.comments;

drop policy if exists "Owners can insert comments" on public.comments;
create policy "Owners can insert comments"
  on public.comments for insert
  with check (auth.uid() is not null and owner_id = auth.uid());

drop policy if exists "Owners can update own comments" on public.comments;
create policy "Owners can update own comments"
  on public.comments for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "Owners can delete own comments" on public.comments;
create policy "Owners can delete own comments"
  on public.comments for delete
  using (owner_id = auth.uid());

-- ─────────────────────────────
-- post_likes: replace demo-only insert/delete with ownership
-- ─────────────────────────────
drop policy if exists "Public can insert post likes (demo, no auth)" on public.post_likes;
drop policy if exists "Public can delete post likes (demo, no auth)" on public.post_likes;

drop policy if exists "Owners can insert own post likes" on public.post_likes;
create policy "Owners can insert own post likes"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Owners can delete own post likes" on public.post_likes;
create policy "Owners can delete own post likes"
  on public.post_likes for delete
  using (auth.uid() = user_id);

-- ─────────────────────────────
-- profiles: let users update their own row, but not their own `role`
-- (access flag) — a before-update trigger resets `role` back to its
-- previous value unless the caller is already an admin, so the new
-- self-service policy below can't be used to self-promote.
-- ─────────────────────────────
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin(auth.uid()) then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role_trigger on public.profiles;
create trigger protect_profile_role_trigger
  before update on public.profiles
  for each row execute function public.protect_profile_role();

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
