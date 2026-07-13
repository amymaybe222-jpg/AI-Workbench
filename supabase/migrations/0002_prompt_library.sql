-- Prompt Library: Prompts + likes/saves
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create extension if not exists pgcrypto;

-- ─────────────────────────────
-- Prompts
-- ─────────────────────────────
create type public.prompt_category as enum (
  'Productivity',
  'Engineering',
  'Customer Support',
  'Leadership',
  'Data & Analytics',
  'Marketing & Comms',
  'People & HR',
  'Sales'
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category public.prompt_category not null,
  tool text not null,
  description text not null,
  prompt_text text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists idx_prompts_category on public.prompts (category);
create index if not exists idx_prompts_tags on public.prompts using gin (tags);

-- ─────────────────────────────
-- Prompt likes (join table; replaces the "likes" counter + localStorage)
-- ─────────────────────────────
create table if not exists public.prompt_likes (
  user_id uuid not null references public.users (id) on delete cascade,
  prompt_id uuid not null references public.prompts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create index if not exists idx_prompt_likes_prompt_id on public.prompt_likes (prompt_id);

-- ─────────────────────────────
-- Saved prompts (join table; replaces localStorage "savedPrompts")
-- ─────────────────────────────
create table if not exists public.saved_prompts (
  user_id uuid not null references public.users (id) on delete cascade,
  prompt_id uuid not null references public.prompts (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create index if not exists idx_saved_prompts_prompt_id on public.saved_prompts (prompt_id);

-- A view to get a live like count per prompt without a denormalized counter column.
create or replace view public.prompts_with_like_counts as
select
  p.*,
  coalesce(l.like_count, 0) as like_count
from public.prompts p
left join (
  select prompt_id, count(*) as like_count
  from public.prompt_likes
  group by prompt_id
) l on l.prompt_id = p.id;

-- ─────────────────────────────
-- Row Level Security
-- ─────────────────────────────
alter table public.prompts enable row level security;
alter table public.prompt_likes enable row level security;
alter table public.saved_prompts enable row level security;

-- Prompts are public content: anyone (including anon) can read.
create policy "Public can read prompts"
  on public.prompts for select
  using (true);

-- Likes/saves are per-user data. Without Supabase Auth wired up yet, there's
-- no auth.uid() to check ownership against, so no public write policies are
-- created here. Reads of aggregate counts should go through the
-- prompts_with_like_counts view (or a server-side role) rather than exposing
-- prompt_likes/saved_prompts rows directly, since those tables reveal which
-- users liked/saved what.
create policy "Users can read their own likes"
  on public.prompt_likes for select
  using (false);

create policy "Users can read their own saves"
  on public.saved_prompts for select
  using (false);

-- Writes (insert/delete on prompt_likes/saved_prompts) should go through a
-- trusted server-side context using the service_role key until real auth
-- (auth.uid()-based ownership policies) is in place.

-- ─────────────────────────────
-- Seed data (from src/data/prompts.ts)
-- ─────────────────────────────
insert into public.prompts (id, title, category, tool, description, prompt_text, tags, created_at)
values
  ('a1111111-0000-0000-0000-000000000001', 'Turn meeting notes into action items', 'Productivity', 'Claude or ChatGPT',
   'Convert raw, messy meeting notes into a clean summary with clear owners and deadlines.',
   'You are helping me turn raw meeting notes into a clear summary.' || chr(10) || chr(10) ||
   'Here are my notes:' || chr(10) || '[paste raw notes]' || chr(10) || chr(10) ||
   'Produce:' || chr(10) ||
   '1. A 3-4 sentence summary of what was discussed' || chr(10) ||
   '2. A bullet list of decisions made' || chr(10) ||
   '3. A table of action items with columns: Task | Owner | Due date' || chr(10) || chr(10) ||
   'If an owner or due date isn''t clear from the notes, write "TBD" rather than guessing.',
   array['meetings', 'summarization', 'action items'], now()),

  ('a1111111-0000-0000-0000-000000000002', 'Draft a weekly status update', 'Productivity', 'Claude or ChatGPT',
   'Generate a concise weekly update for your manager or team from a rough list of what you did.',
   'Write a weekly status update for my manager based on the bullet points below. Audience: my direct manager, who is busy and wants a fast read.' || chr(10) || chr(10) ||
   'Format:' || chr(10) ||
   '- Headline (1 line: overall status)' || chr(10) ||
   '- Done this week (bullets)' || chr(10) ||
   '- In progress (bullets)' || chr(10) ||
   '- Blockers or risks (bullets, or "None" if empty)' || chr(10) ||
   '- Next week''s focus (bullets)' || chr(10) || chr(10) ||
   'Keep the whole thing under 150 words. Here''s what happened this week:' || chr(10) || '[paste your rough notes]',
   array['status update', 'reporting'], now()),

  ('a1111111-0000-0000-0000-000000000003', 'Prioritize a messy to-do list', 'Productivity', 'Claude',
   'Get help triaging a long task list using urgency and impact.',
   'Here is my current to-do list, in no particular order:' || chr(10) || '[paste tasks]' || chr(10) || chr(10) ||
   'Group these into three priority tiers: "Do today", "This week", and "Later / delegate". For each item, add a one-line reason for its tier based on urgency and impact. Flag anything that looks like it could be delegated to someone else.',
   array['prioritization', 'planning'], now()),

  ('a1111111-0000-0000-0000-000000000004', 'Summarize a long email thread', 'Productivity', 'Claude',
   'Get the gist of a sprawling email thread before you reply.',
   'Summarize the email thread below. I need to reply and want to understand the full context fast.' || chr(10) || chr(10) ||
   'Include:' || chr(10) ||
   '- What the thread is ultimately about (1-2 sentences)' || chr(10) ||
   '- Key points raised, in chronological order' || chr(10) ||
   '- Any open questions that still need my answer' || chr(10) ||
   '- The most recent message''s tone (e.g. neutral, frustrated, urgent)' || chr(10) || chr(10) ||
   'Thread:' || chr(10) || '[paste email thread]',
   array['email', 'summarization'], now()),

  ('a1111111-0000-0000-0000-000000000005', 'Explain an unfamiliar code module', 'Engineering', 'Claude or GitHub Copilot',
   'Get a plain-language walkthrough of code you''ve just inherited.',
   'I''m new to this codebase. Explain what the following code does, step by step, for a developer who knows the language but not this specific system.' || chr(10) || chr(10) ||
   'Include:' || chr(10) ||
   '1. A one-paragraph high-level summary of its purpose' || chr(10) ||
   '2. Key functions/classes and what each is responsible for' || chr(10) ||
   '3. Any non-obvious logic, edge cases, or assumptions worth flagging' || chr(10) ||
   '4. Questions I should ask the original author if I had the chance' || chr(10) || chr(10) ||
   'Code:' || chr(10) || '[paste code]',
   array['code review', 'onboarding'], now())
on conflict (id) do nothing;
