# Rakija – kulturno dobro Srbije

Platforma za nacionalni projekat i izložbu o **tradicionalnoj porodičnoj
proizvodnji rakije u Srbiji i Bajinoj Bašti**. Dve vertikale:

1. **Sajt događaja** — program, partneri/pokrovitelji, vesti i **prijava
   proizvođača sa automatskim bodovanjem** po 6 kriterijuma i kategorizacijom.
2. **Baza proizvođača rakije** — javni direktorijum destilerija iz cele Srbije
   (cilj: 1000+), koji se gradi postepeno.

> Projekat je **potpuno odvojen** od ostalih sistema — zasebna baza (novi
> Supabase projekat), zaseban domen i deploy.

## Struktura (monorepo)

```
.
├── apps/
│   └── web/            # Next.js 15 (App Router) — javni sajt + direktorijum
├── packages/
│   └── db/             # SQL šema i migracije (Supabase/Postgres)
├── turbo.json
└── pnpm-workspace.yaml
```

## Tehnologije

- **Next.js 15** (App Router, RSC) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Postgres + Auth + Storage + RLS) — zaseban projekat „Rakija"
- **Vercel** (hosting), **Turborepo** + **pnpm** (monorepo)

## Pokretanje

```bash
pnpm install
cp .env.example apps/web/.env.local   # popuni Supabase ključeve (opciono za demo)
pnpm dev
```

Sajt radi i **bez** baze (prikazuje demo/fallback sadržaj). Kad se Supabase
poveže, podaci se čitaju iz baze, a prijave se trajno čuvaju.

### Povezivanje baze

1. Kreiraj nov Supabase projekat „Rakija" (zaseban od BezBrige!).
2. U SQL Editoru pokreni `packages/db/migrations/0001_init.sql` pa `0002_seed.sql`.
3. Upiši `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` u
   `apps/web/.env.local`.

## Bodovanje (Faza 1)

Logika je u `apps/web/lib/scoring.ts` — 6 kriterijuma (Tradicija, Proizvodnja,
Nagrade, Brend i tržište, Organizacija, Vrednost/priča), ukupno 100 bodova, sa
kategorijama: **Veliki majstori (75–100)**, **Čuvari kvaliteta (45–74)**,
**Mladi majstori (0–44)**.

## Plan po fazama

- **Faza 0** — Setup (monorepo, Supabase, deploy) ✅
- **Faza 1** — Sajt događaja + prijava sa bodovanjem ✅ (ovde)
- **Faza 2** — Direktorijum proizvođača + mapa destilerija + admin uvoz
- **Faza 3** — Admin panel, vesti/galerija, „Velika noć rakije" RSVP
- **Faza 4** — Skaliranje baze ka 1000+, EN verzija, Summit funkcije
