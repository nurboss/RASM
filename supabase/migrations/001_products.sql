-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query).

create table if not exists public.products (
  id text primary key,
  name text not null,
  price integer not null check (price >= 0),
  category text not null,
  description text not null default '',
  sizes text[] not null default '{}',
  images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured);

alter table public.products enable row level security;

-- Demo-friendly policies: allow anon + authenticated CRUD. Tighten for production.
create policy "products_select_all"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "products_insert_all"
  on public.products for insert
  to anon, authenticated
  with check (true);

create policy "products_update_all"
  on public.products for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "products_delete_all"
  on public.products for delete
  to anon, authenticated
  using (true);
