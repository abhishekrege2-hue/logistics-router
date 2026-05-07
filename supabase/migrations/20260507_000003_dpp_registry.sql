-- Meridian SCM: EU Digital Product Passport (DPP) registry (ESPR 2026 scaffold)

create table if not exists public.product_passports (
  id uuid primary key default uuid_generate_v4(),
  product_sku text not null,
  product_name text not null,
  manufacturer text not null,
  manufacturing_country text,
  dpp_version text not null default '1.0',
  materials jsonb not null default '[]'::jsonb,
  sustainability jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_passports_sku_idx
  on public.product_passports (product_sku);

create table if not exists public.dpp_lifecycle_events (
  id uuid primary key default uuid_generate_v4(),
  passport_id uuid not null references public.product_passports(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists dpp_events_passport_idx
  on public.dpp_lifecycle_events (passport_id, occurred_at);

-- RLS
alter table public.product_passports enable row level security;
alter table public.dpp_lifecycle_events enable row level security;

revoke all on table public.product_passports from anon, authenticated;
revoke all on table public.dpp_lifecycle_events from anon, authenticated;

grant select on table public.product_passports to authenticated;
grant select on table public.dpp_lifecycle_events to authenticated;

drop policy if exists "authenticated can read product passports" on public.product_passports;
create policy "authenticated can read product passports"
on public.product_passports
for select
to authenticated
using (true);

drop policy if exists "authenticated can read dpp lifecycle events" on public.dpp_lifecycle_events;
create policy "authenticated can read dpp lifecycle events"
on public.dpp_lifecycle_events
for select
to authenticated
using (true);

