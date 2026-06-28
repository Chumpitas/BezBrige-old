-- =====================================================================
--  DEGUSTACIJSKE TURE — rezervacije
-- =====================================================================

do $$ begin
  create type tura_status as enum ('nova', 'potvrdjena', 'otkazana');
exception when duplicate_object then null; end $$;

create table if not exists ture_rezervacije (
  id uuid primary key default gen_random_uuid(),
  ime text not null,
  email text not null,
  telefon text,
  datum date,
  broj_osoba int not null default 1,
  destilerija text,                    -- željena destilerija / regija
  poruka text,
  status tura_status not null default 'nova',
  created_at timestamptz not null default now()
);
create index if not exists idx_ture_status on ture_rezervacije (status);

alter table ture_rezervacije enable row level security;

drop policy if exists "anon salje rezervaciju" on ture_rezervacije;
create policy "anon salje rezervaciju" on ture_rezervacije
  for insert with check (true);
