-- Allow writes on prompts for the admin CRUD page.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

-- There's still no real auth system in this app, so (as with prompt_likes/
-- saved_prompts in migration 0003) these are public write policies rather
-- than auth.uid()-scoped ones. Fine for this demo's admin page; replace with
-- a real admin-role check once auth exists.
create policy "Public can insert prompts"
  on public.prompts for insert
  with check (true);

create policy "Public can update prompts"
  on public.prompts for update
  using (true)
  with check (true);

create policy "Public can delete prompts"
  on public.prompts for delete
  using (true);
