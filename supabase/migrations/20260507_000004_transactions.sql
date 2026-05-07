-- Meridian SCM: payment transactions ledger (Stripe Payment Intents)

create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,
  shipment_id uuid,
  stripe_payment_intent_id text not null,
  amount integer not null check (amount >= 0),
  currency text not null default 'usd',
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transactions_user_idx on public.transactions (user_id, created_at desc);
create index if not exists transactions_pi_idx on public.transactions (stripe_payment_intent_id);

alter table public.transactions enable row level security;

revoke all on table public.transactions from anon, authenticated;
grant select, insert, update on table public.transactions to authenticated;

drop policy if exists "users can view own transactions" on public.transactions;
create policy "users can view own transactions"
on public.transactions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "users can insert own transactions" on public.transactions;
create policy "users can insert own transactions"
on public.transactions
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users can update own transactions" on public.transactions;
create policy "users can update own transactions"
on public.transactions
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

