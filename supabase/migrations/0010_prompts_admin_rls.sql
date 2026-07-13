-- Tighten prompts write access now that real admin roles exist (migration
-- 0009). The public.is_admin() check below replaces the wide-open
-- using(true)/with check(true) policies from migration 0007.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

drop policy if exists "Public can insert prompts" on public.prompts;
drop policy if exists "Public can update prompts" on public.prompts;
drop policy if exists "Public can delete prompts" on public.prompts;

create policy "Admins can insert prompts"
  on public.prompts for insert
  with check (public.is_admin(auth.uid()));

create policy "Admins can update prompts"
  on public.prompts for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "Admins can delete prompts"
  on public.prompts for delete
  using (public.is_admin(auth.uid()));
