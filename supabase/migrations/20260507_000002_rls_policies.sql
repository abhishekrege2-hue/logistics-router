-- Meridian SCM: baseline RLS for ledger tables.
-- Note: Supabase service role bypasses RLS; API routes use service role for writes/reads.

alter table public.events enable row level security;
alter table public.shipment_projection enable row level security;

-- Deny-by-default posture for anon.
revoke all on table public.events from anon, authenticated;
revoke all on table public.shipment_projection from anon, authenticated;

-- Allow authenticated users to read shipment projections (dashboard-ready).
grant select on table public.shipment_projection to authenticated;

drop policy if exists "authenticated can read shipment projection" on public.shipment_projection;
create policy "authenticated can read shipment projection"
on public.shipment_projection
for select
to authenticated
using (true);

-- Events table: keep read/write restricted to service role (no public policies).

