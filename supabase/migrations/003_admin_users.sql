-- Admin allowlist table for dashboard access.
-- Add rows manually in Supabase (Table editor or SQL) after creating admin auth users.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  created_at timestamptz not null default now()
);

-- Optional: prevent duplicate admin emails (helps management in Table Editor).
create unique index if not exists admin_users_email_ux
on public.admin_users (email)
where email is not null;

alter table public.admin_users enable row level security;

drop policy if exists "admin_users_self_select" on public.admin_users;

-- Authenticated users can only check if THEY are an admin.
create policy "admin_users_self_select"
  on public.admin_users for select
  to authenticated
  using (auth.uid() = user_id);

