-- Run once in the Supabase SQL editor (after schema.sql).

create table if not exists public.categories (
  id         uuid primary key default gen_random_uuid(),
  name       text unique not null,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

-- Same note as schema.sql: admin login is client-side, so anon can write.
create policy "categories read"  on public.categories for select using (true);
create policy "categories write" on public.categories for all using (true) with check (true);

-- Import categories already used by existing products
insert into public.categories (name)
select distinct category from public.products
where category is not null and category <> ''
on conflict (name) do nothing;
