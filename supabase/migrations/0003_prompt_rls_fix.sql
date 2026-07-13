-- Fix RLS on prompt_likes/saved_prompts so the Prompt Library like/save
-- buttons can actually work end-to-end. There is no real auth system in this
-- demo app (see AGENTS.md), so these are intentionally public read/write
-- policies scoped by client-supplied user_id rather than auth.uid()-based
-- ownership. Replace with real per-user ownership policies once Supabase
-- Auth (or equivalent) is added.

drop policy if exists "Users can read their own likes" on public.prompt_likes;
drop policy if exists "Users can read their own saves" on public.saved_prompts;

create policy "Public can read prompt likes (demo, no auth)"
  on public.prompt_likes for select
  using (true);

create policy "Public can insert prompt likes (demo, no auth)"
  on public.prompt_likes for insert
  with check (true);

create policy "Public can delete prompt likes (demo, no auth)"
  on public.prompt_likes for delete
  using (true);

create policy "Public can read saved prompts (demo, no auth)"
  on public.saved_prompts for select
  using (true);

create policy "Public can insert saved prompts (demo, no auth)"
  on public.saved_prompts for insert
  with check (true);

create policy "Public can delete saved prompts (demo, no auth)"
  on public.saved_prompts for delete
  using (true);
