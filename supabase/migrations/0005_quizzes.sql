-- Quizzes: quizzes + quiz_questions + quiz_results (empty), seeded from
-- src/data/quizzes.ts. Text primary keys are used (matching the mock data's
-- string ids) rather than uuids, per AGENTS.md schema decisions.

create table if not exists public.quizzes (
  id text primary key,
  title text not null,
  description text not null,
  estimated_minutes int not null
);

create table if not exists public.quiz_questions (
  id text primary key,
  quiz_id text not null references public.quizzes (id) on delete cascade,
  question text not null,
  options text[] not null,
  correct_index int not null,
  explanation text not null,
  order_index int not null
);

create index if not exists idx_quiz_questions_quiz_id on public.quiz_questions (quiz_id);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id),
  quiz_id text references public.quizzes (id),
  score_percent numeric,
  correct_count int,
  total_questions int,
  completed_at timestamptz default now(),
  certificate_name text
);

create index if not exists idx_quiz_results_user_id on public.quiz_results (user_id);
create index if not exists idx_quiz_results_quiz_id on public.quiz_results (quiz_id);

-- ─────────────────────────────
-- Row Level Security
-- ─────────────────────────────
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_results enable row level security;

create policy "Public can read quizzes"
  on public.quizzes for select
  using (true);

create policy "Public can read quiz questions"
  on public.quiz_questions for select
  using (true);

create policy "Public can read quiz results"
  on public.quiz_results for select
  using (true);

-- Demo app has no real auth (see AGENTS.md) — public write policy is an
-- intentional demo-only tradeoff, to be replaced with an auth.uid()-based
-- ownership policy once real auth is added.
create policy "Public can insert quiz results (demo, no auth)"
  on public.quiz_results for insert
  with check (true);

-- ─────────────────────────────
-- Seed data (from src/data/quizzes.ts) — quiz_results is intentionally left
-- empty; it's populated by real usage.
-- ─────────────────────────────
insert into public.quizzes (id, title, description, estimated_minutes)
values
  ('ai-fundamentals', 'AI Fundamentals', 'Core AI concepts every professional should know.', 6),
  ('prompt-engineering', 'Prompt Engineering Basics', 'Practical techniques for writing better AI prompts.', 5),
  ('choosing-tools', 'Choosing the Right AI Tool', 'Match workplace tasks to the right AI tool.', 5)
on conflict (id) do nothing;

insert into public.quiz_questions (id, quiz_id, question, options, correct_index, explanation, order_index)
values
  ('ai-fundamentals-q1', 'ai-fundamentals', 'What best describes what a generative AI model actually does?', array['It searches a database of pre-written answers and returns the closest match', 'It predicts the most likely next words based on patterns learned from training data', 'It runs a fixed set of if/else rules written by engineers', 'It only reformats existing text without creating anything new'], 1, 'Generative models produce new content by predicting likely continuations based on learned patterns — they don''t look up stored answers.', 0),
  ('ai-fundamentals-q2', 'ai-fundamentals', 'Why do LLMs sometimes produce confident but incorrect information ("hallucination")?', array['The model is intentionally trying to deceive the user', 'The servers are overloaded and return random text', 'The model predicts plausible-sounding text rather than verifying facts against a source', 'Hallucination only happens with free-tier accounts'], 2, 'Because models generate statistically plausible text rather than retrieving verified facts, they can produce incorrect statements confidently.', 1),
  ('ai-fundamentals-q3', 'ai-fundamentals', 'What is a model''s "context window"?', array['The subscription tier you''re paying for', 'The amount of text (prompt, history, documents) the model can consider at once', 'The time of day the model performs best', 'A setting that controls how creative the output is'], 1, 'The context window is the amount of text the model can factor into its response, including your prompt and any pasted content.', 2),
  ('ai-fundamentals-q4', 'ai-fundamentals', 'Which is the most appropriate first step before pasting customer data into a consumer AI tool?', array['Just paste it — AI tools are private by default', 'Check your organization''s data policy and whether an approved enterprise agreement covers this use', 'Remove the customer''s name only', 'Ask a colleague if they''ve done it before'], 1, 'Data policies vary by organization and tool tier — always confirm what''s approved before sharing confidential or customer data.', 3),
  ('ai-fundamentals-q5', 'ai-fundamentals', 'What is the most reliable way to treat AI-generated statistics or citations?', array['Trust them completely since the model sounds confident', 'Ignore AI outputs entirely', 'Verify them against a primary source before relying on them', 'Only trust them if the number sounds precise'], 2, 'AI-generated facts and figures should be treated as unverified until checked against a trustworthy source, especially for anything customer-facing or regulatory.', 4),
  ('ai-fundamentals-q6', 'ai-fundamentals', 'Which task is generative AI generally LEAST suited to on its own?', array['Drafting a first pass of a document', 'Summarizing a long report', 'Guaranteeing a legally binding, fully verified compliance statement without human review', 'Suggesting a first-pass structure for a presentation'], 2, 'AI can draft compliance-related content, but it cannot guarantee legal accuracy — that always requires human/expert verification.', 5),
  ('ai-fundamentals-q7', 'ai-fundamentals', 'What does it mean to be transparent about AI use at work?', array['Never using AI tools at all', 'Noting when AI meaningfully shaped a deliverable so reviewers know to check it accordingly', 'Only disclosing AI use if directly asked', 'Using AI only outside of work hours'], 1, 'Being transparent means flagging meaningful AI contribution, particularly for client-facing, financial, or regulated content.', 6),
  ('ai-fundamentals-q8', 'ai-fundamentals', 'A colleague pastes an entire unreleased financial report into a free, consumer-tier AI chatbot to summarize it. What''s the main concern?', array['The summary might be too short', 'This may violate data confidentiality policies depending on the tool''s data handling terms', 'Free tools are always slower', 'There is no concern as long as the summary is accurate'], 1, 'Confidential or unreleased financial data typically shouldn''t go into consumer-tier tools without an approved enterprise agreement covering data handling.', 7),
  ('prompt-engineering-q1', 'prompt-engineering', 'What is the single biggest lever for improving AI output quality?', array['Typing in all caps', 'Providing relevant context (audience, goal, constraints)', 'Making the prompt as short as possible', 'Repeating the same question multiple times'], 1, 'The more relevant context you provide, the less the model has to guess — this is the highest-leverage change you can make.', 0),
  ('prompt-engineering-q2', 'prompt-engineering', 'Which prompt structure is generally most reliable?', array['Just the task, with no other detail', 'Role → Task → Context → Format', 'A single keyword', 'A long list of unrelated examples with no explanation'], 1, 'Specifying who the AI should act as, what to do, relevant background, and the desired output format produces consistently better results.', 1),
  ('prompt-engineering-q3', 'prompt-engineering', 'You get a decent first response but it''s too long. What''s the best next step?', array['Start an entirely new conversation from scratch', 'Ask a follow-up like "make this more concise" in the same conversation', 'Give up and write it manually', 'Repeat the exact same prompt again'], 1, 'The model retains context from earlier turns, so iterating with follow-ups is faster and more effective than restarting.', 2),
  ('prompt-engineering-q4', 'prompt-engineering', 'Why is specifying the output format (e.g. table, bullet list, email) useful?', array['It isn''t useful, formatting doesn''t matter', 'It guarantees factual accuracy', 'It makes the response easier to use immediately in its intended context', 'It makes the model respond faster'], 2, 'Specifying format saves you reformatting time and ensures the output slots directly into your intended use (e.g. a table for data, an email for a reply).', 3),
  ('prompt-engineering-q5', 'prompt-engineering', 'Which of these prompts provides the most useful context?', array['"Write an email."', '"Write a follow-up email to a customer whose refund is delayed, apologetic but not over-apologetic, under 100 words."', '"Email please."', '"Make something for a customer."'], 1, 'This prompt specifies audience, situation, tone, and length constraints — all context that reduces guesswork.', 4),
  ('prompt-engineering-q6', 'prompt-engineering', 'What''s a good use of providing an example in your prompt?', array['To confuse the model with irrelevant information', 'To show the style, tone, or structure you want replicated', 'Examples are never useful', 'Only to make the prompt look more professional'], 1, 'A representative example helps the model match your intended tone or structure more precisely than description alone.', 5),
  ('prompt-engineering-q7', 'prompt-engineering', 'You need to reason through a complex, multi-step problem. What''s a useful prompting technique?', array['Ask for the final answer only, with no reasoning', 'Ask the model to show its step-by-step reasoning so you can check the logic', 'Ask ten unrelated questions at once', 'Avoid giving any context at all'], 1, 'Asking for visible reasoning makes it easier to spot errors in logic before you rely on the conclusion.', 6),
  ('choosing-tools-q1', 'choosing-tools', 'You need to summarize a 40-page contract in one sitting. Which tool trait matters most?', array['Image generation quality', 'A large context window that can hold the whole document at once', 'Voice mode', 'Plugin ecosystem size'], 1, 'Long-document tasks are best served by tools with large context windows, so the whole document can be reasoned over in one pass.', 0),
  ('choosing-tools-q2', 'choosing-tools', 'You want inline code suggestions as you type in your IDE. What''s the best fit?', array['Midjourney', 'Perplexity', 'GitHub Copilot', 'Notion AI'], 2, 'GitHub Copilot is built directly into the IDE and provides inline completions aware of your open files and repo.', 1),
  ('choosing-tools-q3', 'choosing-tools', 'You need a fully cited answer about a competitor''s recent product launch. What''s the best fit?', array['Midjourney', 'Perplexity', 'GitHub Copilot', 'None of these can help'], 1, 'Perplexity searches the live web and returns citations, which is ideal for research that needs to be verifiable.', 2),
  ('choosing-tools-q4', 'choosing-tools', 'Your team''s meeting notes and project docs already live entirely in Notion. Which tool saves the most time for summarizing them?', array['Notion AI, since it works inline with existing content', 'Midjourney', 'A brand-new standalone chat tool, always', 'None — you should copy content elsewhere first'], 0, 'The most convenient tool is often the one embedded where the content already lives, avoiding copy-paste overhead.', 3),
  ('choosing-tools-q5', 'choosing-tools', 'You need highly stylized concept art for a marketing campaign mood board. Best fit?', array['GitHub Copilot', 'Perplexity', 'Midjourney', 'Notion AI'], 2, 'Midjourney is purpose-built for high-quality stylized image generation, well suited to concept art and mood boards.', 4),
  ('choosing-tools-q6', 'choosing-tools', 'What''s a reasonable general framework for choosing a tool?', array['Always use the newest tool released, regardless of task', 'Match the tool to the shape of the task, and consider where the work already lives', 'Only ever use one tool for everything', 'Choose based on which tool has the most followers on social media'], 1, 'Matching the tool to the task type — and favoring tools embedded where you already work — is a reliable, low-effort heuristic.', 5),
  ('choosing-tools-q7', 'choosing-tools', 'A tool''s output looks correct, professional, and confident. Does this guarantee accuracy?', array['Yes, confident tone means accurate content', 'No — tone and accuracy are independent; verification is still required', 'Only for image generation tools', 'Only if the tool is a paid tier'], 1, 'Confident, well-formatted output is not the same as verified output — always check specifics before relying on them.', 6)
on conflict (id) do nothing;
