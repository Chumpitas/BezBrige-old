-- =====================================================================
--  RAKIJA – kulturno dobro Srbije
--  Inicijalna šema (Faza 1: događaj + temelj baze proizvođača)
-- =====================================================================

-- ---------- ENUM tipovi ----------
do $$ begin
  create type velicina_destilerije as enum ('mala', 'srednja', 'velika');
exception when duplicate_object then null; end $$;

do $$ begin
  create type kategorija_rakijasa as enum ('veliki_majstori', 'cuvari_kvaliteta', 'mladi_majstori');
exception when duplicate_object then null; end $$;

do $$ begin
  create type status_prijave as enum ('nova', 'u_obradi', 'prihvacena', 'odbijena');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tip_partnera as enum ('pokrovitelj', 'partner', 'medijski_partner');
exception when duplicate_object then null; end $$;

do $$ begin
  create type nivo_nagrade as enum ('zlato', 'srebro', 'bronza');
exception when duplicate_object then null; end $$;

-- ---------- Pomoćna funkcija za updated_at ----------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- =====================================================================
--  PROIZVOĐAČI (destilerije)
-- =====================================================================
create table if not exists proizvodjaci (
  id uuid primary key default gen_random_uuid(),
  naziv text not null,
  slug text unique,
  porodica text,                       -- npr. "Bogdanović"
  generacija int,                      -- broj generacija (npr. 7)
  godina_osnivanja int,
  selo text,
  grad text,
  region text,                         -- npr. "Sokolski kraj", "Zlatiborski okrug"
  velicina velicina_destilerije,
  prica text,                          -- porodična priča / opis
  logo_url text,
  foto_url text,
  sajt text,
  email text,
  telefon text,
  lat double precision,                -- za mapu destilerija
  lng double precision,
  objavljen boolean not null default false,  -- vidljiv na javnom direktorijumu
  istaknut boolean not null default false,   -- izdvojen na naslovnoj
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_proizvodjaci_objavljen on proizvodjaci (objavljen);
create index if not exists idx_proizvodjaci_region on proizvodjaci (region);
drop trigger if exists trg_proizvodjaci_updated on proizvodjaci;
create trigger trg_proizvodjaci_updated before update on proizvodjaci
  for each row execute function set_updated_at();

-- =====================================================================
--  PROIZVODI (rakije)
-- =====================================================================
create table if not exists proizvodi (
  id uuid primary key default gen_random_uuid(),
  proizvodjac_id uuid not null references proizvodjaci(id) on delete cascade,
  naziv text not null,
  vrsta text,                          -- šljivovica, kleka, kajsija...
  sorta text,                          -- lokalna sorta
  opis text,
  foto_url text,
  created_at timestamptz not null default now()
);
create index if not exists idx_proizvodi_proizvodjac on proizvodi (proizvodjac_id);

-- =====================================================================
--  NAGRADE
-- =====================================================================
create table if not exists nagrade (
  id uuid primary key default gen_random_uuid(),
  proizvodjac_id uuid references proizvodjaci(id) on delete cascade,
  proizvod_id uuid references proizvodi(id) on delete set null,
  naziv text not null,                 -- npr. "USA Ratings 2025"
  nivo nivo_nagrade,
  medjunarodna boolean not null default false,
  godina int,
  created_at timestamptz not null default now()
);
create index if not exists idx_nagrade_proizvodjac on nagrade (proizvodjac_id);

-- =====================================================================
--  PRIJAVE ZA UČEŠĆE (sa bodovanjem po 6 kriterijuma)
-- =====================================================================
create table if not exists prijave (
  id uuid primary key default gen_random_uuid(),
  -- kontakt podnosioca
  naziv_destilerije text not null,
  kontakt_ime text not null,
  email text not null,
  telefon text,
  grad text,

  -- ulazni podaci za bodovanje (čuvaju se zbog transparentnosti)
  podaci jsonb not null default '{}'::jsonb,

  -- rezultat bodovanja (snapshot u trenutku prijave)
  bodovi_tradicija numeric(5,2) not null default 0,
  bodovi_proizvodnja numeric(5,2) not null default 0,
  bodovi_nagrade numeric(5,2) not null default 0,
  bodovi_brend numeric(5,2) not null default 0,
  bodovi_organizacija numeric(5,2) not null default 0,
  bodovi_vrednost numeric(5,2) not null default 0,
  bodovi_ukupno numeric(5,2) not null default 0,
  kategorija kategorija_rakijasa,

  status status_prijave not null default 'nova',
  napomena text,                       -- interna napomena admina
  proizvodjac_id uuid references proizvodjaci(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_prijave_status on prijave (status);
drop trigger if exists trg_prijave_updated on prijave;
create trigger trg_prijave_updated before update on prijave
  for each row execute function set_updated_at();

-- =====================================================================
--  PARTNERI / POKROVITELJI / MEDIJI
-- =====================================================================
create table if not exists partneri (
  id uuid primary key default gen_random_uuid(),
  naziv text not null,
  tip tip_partnera not null,
  logo_url text,
  sajt text,
  redosled int not null default 0,
  objavljen boolean not null default true,
  created_at timestamptz not null default now()
);

-- =====================================================================
--  PROGRAM DOGAĐAJA (5 nivoa + tematski dani)
-- =====================================================================
create table if not exists program_stavke (
  id uuid primary key default gen_random_uuid(),
  nivo text,                           -- "Izložba", "Rakija Summit", "Tematski dani", "Medijska komponenta", "Velika noć rakije"
  naslov text not null,
  opis text,
  lokacija text,                       -- Atrijum, Glavna sala, Bioskopska sala...
  datum date,
  vreme_od time,
  vreme_do time,
  redosled int not null default 0,
  objavljen boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_program_nivo on program_stavke (nivo);

-- =====================================================================
--  VESTI / BLOG
-- =====================================================================
create table if not exists vesti (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  naslov text not null,
  sazetak text,
  sadrzaj text,
  cover_url text,
  objavljen boolean not null default false,
  objavljeno_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_vesti_updated on vesti;
create trigger trg_vesti_updated before update on vesti
  for each row execute function set_updated_at();

-- =====================================================================
--  KONTAKT PORUKE
-- =====================================================================
create table if not exists kontakt_poruke (
  id uuid primary key default gen_random_uuid(),
  ime text not null,
  email text not null,
  poruka text not null,
  created_at timestamptz not null default now()
);

-- =====================================================================
--  RLS POLITIKE
-- =====================================================================
alter table proizvodjaci    enable row level security;
alter table proizvodi       enable row level security;
alter table nagrade         enable row level security;
alter table prijave         enable row level security;
alter table partneri        enable row level security;
alter table program_stavke  enable row level security;
alter table vesti           enable row level security;
alter table kontakt_poruke  enable row level security;

-- Javno čitanje samo objavljenog sadržaja
drop policy if exists "javno cita objavljene proizvodjace" on proizvodjaci;
create policy "javno cita objavljene proizvodjace" on proizvodjaci
  for select using (objavljen = true);

drop policy if exists "javno cita proizvode objavljenih" on proizvodi;
create policy "javno cita proizvode objavljenih" on proizvodi
  for select using (
    exists (select 1 from proizvodjaci p where p.id = proizvodi.proizvodjac_id and p.objavljen)
  );

drop policy if exists "javno cita nagrade objavljenih" on nagrade;
create policy "javno cita nagrade objavljenih" on nagrade
  for select using (
    exists (select 1 from proizvodjaci p where p.id = nagrade.proizvodjac_id and p.objavljen)
  );

drop policy if exists "javno cita partnere" on partneri;
create policy "javno cita partnere" on partneri
  for select using (objavljen = true);

drop policy if exists "javno cita program" on program_stavke;
create policy "javno cita program" on program_stavke
  for select using (objavljen = true);

drop policy if exists "javno cita vesti" on vesti;
create policy "javno cita vesti" on vesti
  for select using (objavljen = true);

-- Javni unos: prijave i kontakt poruke (anon sme INSERT, ne i SELECT)
drop policy if exists "anon salje prijavu" on prijave;
create policy "anon salje prijavu" on prijave
  for insert with check (true);

drop policy if exists "anon salje kontakt" on kontakt_poruke;
create policy "anon salje kontakt" on kontakt_poruke
  for insert with check (true);

-- Napomena: admin pristup (čitanje prijava, upravljanje sadržajem) ide preko
-- service_role ključa na serveru, koji zaobilazi RLS.
