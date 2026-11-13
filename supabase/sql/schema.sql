-- Run once in the Supabase SQL editor for the Neon.Inn project.

create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  short_description text not null default '',
  description       text not null default '',
  normalcost        numeric not null default 0,
  maxretailprice    numeric not null default 0,
  price             numeric not null default 0,
  currency          text not null default 'INR',
  images            text[] not null default '{}',
  category          text not null default '',
  badge             text,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now()
);

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  customer_name    text not null,
  customer_phone   text not null,
  customer_address text not null default '',
  items            jsonb not null default '[]',
  total            numeric not null default 0,
  status           text not null default 'pending',
  source           text not null default 'whatsapp',
  notes            text,
  created_at       timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- NOTE: the admin login is client-side only (no Supabase Auth), so the admin
-- panel talks to Supabase as the anonymous role. These policies therefore let
-- anyone with the anon key write. Tighten them once real auth is added.
create policy "products read"  on public.products for select using (true);
create policy "products write" on public.products for all using (true) with check (true);
create policy "orders all"     on public.orders   for all using (true) with check (true);

-- Public bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product images read"   on storage.objects for select using (bucket_id = 'product-images');
create policy "product images upload" on storage.objects for insert with check (bucket_id = 'product-images');
create policy "product images delete" on storage.objects for delete using (bucket_id = 'product-images');
