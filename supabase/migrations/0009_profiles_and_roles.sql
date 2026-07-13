-- Real identity + admin roles, backed by Supabase Auth (auth.users), now that
-- Google OAuth is wired up. This is separate from public.users (migration
-- 0001), which stays as fake demo-content attribution and is out of scope
-- here.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

-- ─────────────────────────────
-- Profiles
-- ─────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────
-- Admin allowlist
-- Emails in this table are granted the 'admin' role automatically the first
-- time they sign in. This is config, not a UI surface — there is no
-- client-facing way to read or write it, so it can't be abused by other
-- users. Manage it via the SQL editor.
-- ─────────────────────────────
create table if not exists public.admin_allowlist (
  email text primary key
);

insert into public.admin_allowlist (email)
values ('amymaybe222@gmail.com')
on conflict (email) do nothing;

-- ─────────────────────────────
-- is_admin() helper
-- security definer so it can read profiles regardless of the caller's RLS
-- visibility, avoiding self-referential recursion in policies that check
-- admin status on the profiles table itself.
-- ─────────────────────────────
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'admin'
  );
$$;

-- ─────────────────────────────
-- handle_new_user() trigger
-- Creates a profiles row for every new Supabase Auth user, granting 'admin'
-- automatically if their email is on the allowlist.
-- ─────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    case
      when exists (select 1 from public.admin_allowlist where email = new.email) then 'admin'
      else 'user'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────
-- Row Level Security
-- ─────────────────────────────
alter table public.profiles enable row level security;
alter table public.admin_allowlist enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can read all profiles"
  on public.profiles for select
  using (public.is_admin(auth.uid()));

-- No insert/update/delete policies on profiles: rows are only ever written
-- by the security-definer trigger above.
-- No policies at all on admin_allowlist: it's never read or written by
-- client code, only by the security-definer functions above.
