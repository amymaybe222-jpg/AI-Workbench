-- Community feed: extend posts with author/role/team/tool/seo fields,
-- add comments + post_likes tables, seed all posts + comments from
-- src/data/community.ts.

alter table public.posts
  add column if not exists author text,
  add column if not exists role text,
  add column if not exists team text,
  add column if not exists tool text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists seo_title text,
  add column if not exists seo_description text;

create index if not exists idx_posts_tags on public.posts using gin (tags);

-- ─────────────────────────────
-- Comments
-- ─────────────────────────────
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author text not null,
  role text,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_comments_post_id on public.comments (post_id);

-- ─────────────────────────────
-- Post likes (join table; replaces mock "likes" counter + localStorage)
-- ─────────────────────────────
create table if not exists public.post_likes (
  user_id uuid not null references public.users (id) on delete cascade,
  post_id uuid not null references public.posts (id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

create index if not exists idx_post_likes_post_id on public.post_likes (post_id);

create or replace view public.posts_with_like_counts as
select
  p.*,
  coalesce(l.like_count, 0) as like_count
from public.posts p
left join (
  select post_id, count(*) as like_count
  from public.post_likes
  group by post_id
) l on l.post_id = p.id;

-- ─────────────────────────────
-- Row Level Security
-- ─────────────────────────────
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;

create policy "Public can read comments"
  on public.comments for select
  using (true);

-- Demo app has no real auth (see AGENTS.md) — public write policies are an
-- intentional demo-only tradeoff, to be replaced with auth.uid()-based
-- ownership policies once real auth is added.
create policy "Public can insert comments (demo, no auth)"
  on public.comments for insert
  with check (true);

create policy "Public can delete comments (demo, no auth)"
  on public.comments for delete
  using (true);

create policy "Public can read post likes"
  on public.post_likes for select
  using (true);

create policy "Public can insert post likes (demo, no auth)"
  on public.post_likes for insert
  with check (true);

create policy "Public can delete post likes (demo, no auth)"
  on public.post_likes for delete
  using (true);

-- ─────────────────────────────
-- Seed data (from src/data/community.ts)
-- Historical like counts are not fabricated as individual post_likes rows
-- (see AGENTS.md) — post_likes starts empty and like_count defaults to 0
-- via the view above.
-- ─────────────────────────────
insert into public.posts (id, user_id, title, body, category, published_at, created_at, author, role, team, tool, tags, seo_title, seo_description)
values
  ('5ebcbd4b-51ab-4cc1-a8cf-59e6db1a3a49', '11111111-1111-1111-1111-111111111111', 'Cut our sprint retro prep time from 30 min to 5 using Claude', 'I used to spend a solid 30 minutes before every retro pulling together what shipped, what slipped, and rough themes from standup notes. I started pasting our raw Slack standup thread into Claude with a prompt asking for ''what shipped, what''s blocked, and recurring themes across the week'' and it gets me 90% of the way there in one pass. I still read through and adjust, but it''s a huge time save. Happy to share the exact prompt if useful.', null, '2026-06-18T09:12:00.000Z', '2026-06-18T09:12:00.000Z', 'Priya Nair', 'Engineering Manager', 'Platform', 'Claude', array['engineering', 'productivity', 'retros'], 'How Claude cut our retro prep to 5 min', 'Priya Nair, an Engineering Manager, shares how she uses Claude to summarize sprint retro notes in minutes, not hours.'),
  ('0c69e175-88cf-4dde-9840-b5bba7508558', '22222222-2222-2222-2222-222222222222', 'Using GitHub Copilot chat for onboarding into a legacy repo', 'Joined the payments team last month and the codebase has almost no comments. Instead of pinging teammates for every question, I''ve been asking Copilot Chat to explain functions and files before I dig deeper myself. It''s dramatically cut down how many ''dumb question'' Slack messages I send, and I actually retain the explanations better than a quick verbal answer in a meeting.', null, '2026-06-20T14:30:00.000Z', '2026-06-20T14:30:00.000Z', 'Marcus Lee', 'Software Engineer II', 'Payments', 'GitHub Copilot', array['engineering', 'onboarding', 'github-copilot'], 'Using GitHub Copilot for repo onboarding', 'Marcus Lee explains how GitHub Copilot Chat helped him ramp up on an unfamiliar legacy codebase without constant Slack questions.'),
  ('5c3b4a71-34a5-4385-905c-ed4507e7df46', '33333333-3333-3333-3333-333333333333', 'AI-assisted first drafts for support macros — feedback wanted', 'Drafted a first pass of 8 new canned responses using one of the Prompt Library templates and tightened the tone with two rounds of feedback. Sharing here before we roll these out team-wide — would appreciate a gut check from anyone outside Support on whether the tone reads as genuine rather than corporate. Linking the draft doc in the comments.', null, '2026-06-22T08:05:00.000Z', '2026-06-22T08:05:00.000Z', 'Jordan Kim', 'Customer Support Lead', 'Support', 'ChatGPT', array['support', 'feedback wanted', 'templates'], 'AI-drafted support macros — feedback wanted', 'Jordan Kim, a Customer Support Lead, shares AI-drafted canned responses from the Prompt Library and asks for peer feedback on tone.'),
  ('31a9e755-ba43-490f-bda8-3fefd4974327', '11111111-1111-1111-1111-111111111111', 'Passed the Prompt Engineering assessment — here''s what surprised me', 'Took the Prompt Engineering Basics assessment this morning (scored 86%). The question about iterating with follow-ups instead of restarting a conversation actually changed how I work — I used to open a fresh chat every time a response wasn''t quite right. Small habit change, noticeably better outputs since.', null, '2026-06-25T16:20:00.000Z', '2026-06-25T16:20:00.000Z', 'Tomasz Nowak', 'Product Manager', 'Growth', 'Other', array['assessments', 'learning', 'prompt-engineering'], 'What I learned passing the prompt quiz', 'Tomasz Nowak, a Product Manager, shares what surprised him after passing the Prompt Engineering Basics assessment.'),
  ('1a437287-6c0c-4eda-a926-97bd7ef25fa9', '22222222-2222-2222-2222-222222222222', 'Perplexity for competitor research ahead of QBRs', 'Ahead of quarterly business reviews I use Perplexity to pull a quick, cited snapshot of what our top accounts'' competitors have shipped recently. Having the citations means I can actually drop the source link into the QBR deck instead of a vague ''AI said so'' bullet. Much faster than my old process of manually checking 5 different competitor blogs.', null, '2026-06-27T11:00:00.000Z', '2026-06-27T11:00:00.000Z', 'Elena Petrova', 'Sales Director', 'Enterprise Sales', 'Perplexity', array['sales', 'research', 'perplexity'], 'Using Perplexity for competitor research', 'Elena Petrova, a Sales Director, uses Perplexity''s cited AI research to prep faster for quarterly business reviews.')
on conflict (id) do nothing;

insert into public.comments (id, post_id, author, role, body, created_at)
values
  ('ff04922f-7771-40dc-95cc-866e6090ea28', '5ebcbd4b-51ab-4cc1-a8cf-59e6db1a3a49', 'Daniel Osei', 'Senior Engineer', 'Would love the exact prompt — we do the same thing manually every sprint.', '2026-06-18T10:03:00.000Z'),
  ('42db19c2-889c-406a-88fa-29420565a6ca', '5ebcbd4b-51ab-4cc1-a8cf-59e6db1a3a49', 'Priya Nair', 'Engineering Manager', 'Posted it in the Prompt Library under Productivity — search ''meeting notes''.', '2026-06-18T11:47:00.000Z'),
  ('401cc962-67e4-44d5-9b80-8a7a1510cd38', '0c69e175-88cf-4dde-9840-b5bba7508558', 'Aisha Rahman', 'Staff Engineer', 'Good approach — just make sure to still verify against tests, Copilot''s explanations of *intent* aren''t always right even when the code summary is.', '2026-06-20T15:02:00.000Z'),
  ('eaef1a97-abc8-49f6-9a11-ef07908eb279', '5c3b4a71-34a5-4385-905c-ed4507e7df46', 'Priya Nair', 'Engineering Manager', 'Read through these — they read well to me, not robotic at all. Nice work.', '2026-06-22T09:15:00.000Z'),
  ('1edc65db-a334-4f2c-a90f-d7e0405c8ff7', '5c3b4a71-34a5-4385-905c-ed4507e7df46', 'Sofia Almeida', 'Support Specialist', 'Agreed, though I''d shorten the refund one slightly — customers skim past long ones.', '2026-06-22T10:40:00.000Z'),
  ('74039d66-003f-4b9a-a45b-62908f297c1c', '31a9e755-ba43-490f-bda8-3fefd4974327', 'Marcus Lee', 'Software Engineer II', 'Same habit here, definitely underrated tip.', '2026-06-25T17:02:00.000Z')
on conflict (id) do nothing;
