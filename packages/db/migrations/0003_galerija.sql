-- =====================================================================
--  GALERIJA (slike i video) — Faza 3
-- =====================================================================

do $$ begin
  create type tip_medija as enum ('slika', 'video');
exception when duplicate_object then null; end $$;

create table if not exists galerija (
  id uuid primary key default gen_random_uuid(),
  tip tip_medija not null default 'slika',
  url text not null,                 -- URL slike ili video (YouTube/Vimeo/mp4)
  naslov text,
  opis text,
  redosled int not null default 0,
  objavljen boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_galerija_objavljen on galerija (objavljen);

alter table galerija enable row level security;

drop policy if exists "javno cita galeriju" on galerija;
create policy "javno cita galeriju" on galerija
  for select using (objavljen = true);
