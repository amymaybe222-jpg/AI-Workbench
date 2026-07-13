-- Allow admins to update other users' role from the new admin "Company
-- details" page. profiles had no update policy at all until now (rows were
-- only ever written by the handle_new_user trigger, migration 0009).
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));
