-- Supabase Storage: public bucket for product images.
-- Run in SQL Editor after 001_products.sql (or merge with run-on-supabase.sql).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Demo policies: anon + authenticated can manage objects in this bucket.
-- Tighten for production (e.g. authenticated only, or signed URLs).
drop policy if exists "product_images_select" on storage.objects;
drop policy if exists "product_images_insert" on storage.objects;
drop policy if exists "product_images_update" on storage.objects;
drop policy if exists "product_images_delete" on storage.objects;

create policy "product_images_select"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "product_images_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'product-images');

create policy "product_images_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy "product_images_delete"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'product-images');
