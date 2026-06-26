-- =====================================================================
--  RAKIJA SUMMIT — paneli i govornici
-- =====================================================================

create table if not exists paneli (
  id uuid primary key default gen_random_uuid(),
  naslov text not null,
  opis text,
  govornici text,                    -- imena govornika (slobodan tekst)
  sala text,
  datum date,
  vreme_od time,
  vreme_do time,
  redosled int not null default 0,
  objavljen boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_paneli_datum on paneli (datum, redosled);

alter table paneli enable row level security;

drop policy if exists "javno cita panele" on paneli;
create policy "javno cita panele" on paneli
  for select using (objavljen = true);
