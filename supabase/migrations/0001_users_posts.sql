-- Membership / community schema: Users + Posts
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create extension if not exists pgcrypto;

-- ─────────────────────────────
-- Users
-- ─────────────────────────────
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_users_email on public.users (email);

-- ─────────────────────────────
-- Posts
-- ─────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  body text not null,
  category text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_posts_user_id on public.posts (user_id);
create index if not exists idx_posts_category on public.posts (category);
create index if not exists idx_posts_published_at on public.posts (published_at desc);

-- ─────────────────────────────
-- Row Level Security
-- ─────────────────────────────
alter table public.users enable row level security;
alter table public.posts enable row level security;

-- Posts are public content: anyone (including anon) can read published posts.
create policy "Public can read published posts"
  on public.posts for select
  using (published_at is not null and published_at <= now());

-- Users table holds password_hash, so no public select policy is created here.
-- This app is not using Supabase Auth, so auth.uid()-based ownership policies
-- don't apply. Writes (insert/update/delete) should go through a trusted
-- server-side context using the service_role key, which bypasses RLS.
-- Tighten/extend these policies once your auth strategy is decided.

-- ─────────────────────────────
-- Seed data
-- ─────────────────────────────
with seed_users as (
  insert into public.users (id, name, email, password_hash, avatar_url)
  values
    ('11111111-1111-1111-1111-111111111111', 'Ava Thompson', 'ava@example.com', 'placeholder_hash_1', 'https://i.pravatar.cc/150?u=ava'),
    ('22222222-2222-2222-2222-222222222222', 'Ben Carter', 'ben@example.com', 'placeholder_hash_2', 'https://i.pravatar.cc/150?u=ben'),
    ('33333333-3333-3333-3333-333333333333', 'Chloe Rivera', 'chloe@example.com', 'placeholder_hash_3', 'https://i.pravatar.cc/150?u=chloe')
  on conflict (id) do nothing
  returning id
)
insert into public.posts (user_id, title, body, category, published_at)
values
  ('11111111-1111-1111-1111-111111111111', 'Welcome to the community', 'Excited to kick things off with everyone here. Introduce yourself below!', 'announcements', now() - interval '5 days'),
  ('22222222-2222-2222-2222-222222222222', 'Tips for staying productive', 'A few habits that have helped me stay focused during deep work sessions.', 'productivity', now() - interval '4 days'),
  ('11111111-1111-1111-1111-111111111111', 'Monthly meetup recap', 'Thanks to everyone who joined the meetup last week — here are the highlights.', 'events', now() - interval '3 days'),
  ('33333333-3333-3333-3333-333333333333', 'Book recommendations thread', 'Drop your favorite reads from this year in the comments.', 'discussion', now() - interval '2 days'),
  ('22222222-2222-2222-2222-222222222222', 'New feature: dark mode', 'You can now toggle dark mode from your profile settings.', 'announcements', now() - interval '1 day');
