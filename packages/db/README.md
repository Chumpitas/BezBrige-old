# @rakija/db

Šema baze i migracije za platformu „Rakija – kulturno dobro Srbije".

## Primena migracija

Migracije se primenjuju na **zaseban** Supabase projekat (ne na BezBrige!).

1. Kreiraj novi Supabase projekat (npr. „Rakija").
2. Otvori **SQL Editor** i pokreni redom:
   - `migrations/0001_init.sql`
   - `migrations/0002_seed.sql`
3. U `apps/web/.env.local` upiši `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (vidi `.env.example` u korenu).

Alternativno, preko Supabase CLI:

```bash
supabase link --project-ref <ref>
supabase db push   # ako se migracije prebace u supabase/migrations
```

## Tabele

| Tabela | Opis |
|---|---|
| `proizvodjaci` | Destilerije / proizvođači rakije (osnova javnog direktorijuma) |
| `proizvodi` | Pojedinačne rakije |
| `nagrade` | Domaće i međunarodne nagrade |
| `prijave` | Prijave za učešće na događaju + snapshot bodovanja po 6 kriterijuma |
| `partneri` | Pokrovitelji / partneri / medijski partneri |
| `program_stavke` | Program događaja (5 nivoa + tematski dani) |
| `vesti` | Vesti / blog |
| `kontakt_poruke` | Poruke sa kontakt forme |

RLS je uključen: javno se čita samo objavljen sadržaj; `prijave` i `kontakt_poruke`
dozvoljavaju anoniman INSERT, ali ne i SELECT (admin čita preko service-role ključa).
