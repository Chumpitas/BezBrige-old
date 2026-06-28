-- =====================================================================
--  PREDLOZI JAVNOSTI — stare fotografije i predlozi eksponata
-- =====================================================================

do $$ begin
  create type tip_predloga as enum ('foto', 'eksponat');
exception when duplicate_object then null; end $$;

do $$ begin
  create type status_predloga as enum ('nova', 'prihvacena', 'odbijena');
exception when duplicate_object then null; end $$;

create table if not exists predlozi (
  id uuid primary key default gen_random_uuid(),
  tip tip_predloga not null default 'foto',
  ime text not null,
  email text,
  telefon text,
  mesto text,                          -- kraj / mesto porekla (npr. tip kazana po kraju)
  opis text,
  foto_url text,                       -- otpremljena fotografija (opciono)
  status status_predloga not null default 'nova',
  created_at timestamptz not null default now()
);
create index if not exists idx_predlozi_status on predlozi (status);

alter table predlozi enable row level security;

drop policy if exists "anon salje predlog" on predlozi;
create policy "anon salje predlog" on predlozi
  for insert with check (true);
