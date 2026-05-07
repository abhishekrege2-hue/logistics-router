-- Meridian SCM: event-sourced logistics ledger (append-only)
-- Apply in Supabase SQL editor or via supabase CLI migrations.

create extension if not exists "uuid-ossp";

-- Append-only event store (event sourcing).
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  aggregate_type text not null default 'shipment',
  aggregate_id uuid not null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists events_aggregate_idx
  on public.events (aggregate_type, aggregate_id, occurred_at);

create index if not exists events_type_time_idx
  on public.events (event_type, occurred_at desc);

-- Read model: denormalized projection for fast queries.
create table if not exists public.shipment_projection (
  shipment_id uuid primary key,
  reference text not null,
  origin text,
  destination text,
  status text not null default 'Created',
  mode text,
  incoterm text,
  eta_date date,
  demurrage_risk boolean not null default false,
  last_event_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shipment_projection_status_idx
  on public.shipment_projection (status);

create or replace function public.apply_shipment_event()
returns trigger
language plpgsql
as $$
declare
  v_ref text;
  v_origin text;
  v_destination text;
  v_status text;
  v_mode text;
  v_incoterm text;
  v_eta date;
  v_demurrage boolean;
begin
  if new.aggregate_type <> 'shipment' then
    return new;
  end if;

  v_ref := coalesce(new.payload->>'reference', null);
  v_origin := coalesce(new.payload->>'origin', null);
  v_destination := coalesce(new.payload->>'destination', null);
  v_status := coalesce(new.payload->>'status', null);
  v_mode := coalesce(new.payload->>'mode', null);
  v_incoterm := coalesce(new.payload->>'incoterm', null);
  v_eta := nullif(new.payload->>'etaDate', '')::date;
  v_demurrage := coalesce((new.payload->>'demurrageRisk')::boolean, false);

  insert into public.shipment_projection (
    shipment_id,
    reference,
    origin,
    destination,
    status,
    mode,
    incoterm,
    eta_date,
    demurrage_risk,
    last_event_at,
    created_at,
    updated_at
  )
  values (
    new.aggregate_id,
    coalesce(v_ref, concat('MS-', replace(new.aggregate_id::text, '-', '')::text)),
    v_origin,
    v_destination,
    coalesce(v_status, new.event_type),
    v_mode,
    v_incoterm,
    v_eta,
    v_demurrage,
    new.occurred_at,
    new.occurred_at,
    new.occurred_at
  )
  on conflict (shipment_id) do update set
    reference = coalesce(excluded.reference, shipment_projection.reference),
    origin = coalesce(excluded.origin, shipment_projection.origin),
    destination = coalesce(excluded.destination, shipment_projection.destination),
    status = coalesce(excluded.status, shipment_projection.status),
    mode = coalesce(excluded.mode, shipment_projection.mode),
    incoterm = coalesce(excluded.incoterm, shipment_projection.incoterm),
    eta_date = coalesce(excluded.eta_date, shipment_projection.eta_date),
    demurrage_risk = shipment_projection.demurrage_risk or excluded.demurrage_risk,
    last_event_at = excluded.last_event_at,
    updated_at = excluded.updated_at;

  return new;
end;
$$;

drop trigger if exists trg_apply_shipment_event on public.events;
create trigger trg_apply_shipment_event
after insert on public.events
for each row execute function public.apply_shipment_event();

