-- =====================================================================
--  VELIKA NOĆ RAKIJE — RSVP / prijave gostiju
-- =====================================================================

do $$ begin
  create type vnr_status as enum ('nova', 'potvrdjena', 'odbijena');
exception when duplicate_object then null; end $$;

create table if not exists vnr_prijave (
  id uuid primary key default gen_random_uuid(),
  ime text not null,
  email text not null,
  telefon text,
  organizacija text,
  broj_osoba int not null default 1,
  napomena text,
  status vnr_status not null default 'nova',
  created_at timestamptz not null default now()
);
create index if not exists idx_vnr_status on vnr_prijave (status);

alter table vnr_prijave enable row level security;

drop policy if exists "anon salje vnr prijavu" on vnr_prijave;
create policy "anon salje vnr prijavu" on vnr_prijave
  for insert with check (true);
