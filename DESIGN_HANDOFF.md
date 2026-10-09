# Rakija Srbije — Handoff za dizajn

Dokument za dizajnera (npr. „Claude Design") koji preuzima vizuelni redizajn.
Fokus: **kako je sve sklopljeno i šta sme/ne sme da se dira** da redizajn ne pokvari funkcionalnost.

---

## 1. Šta je projekat

**„Rakija Srbije"** — nacionalni projekat i veb platforma o tradicionalnoj porodičnoj
proizvodnji rakije u Srbiji (prva izložba: Bajina Bašta i Sokolski kraj, Etnografski
muzej 2026). Sajt sadrži: predstavljanje projekta, Nacionalnu izložbu, Forum (15
događaja), rakijske regione, direktorijum proizvođača sa mapom, degustacijske ture,
galeriju, vesti, više javnih formi (prijava sa bodovanjem, kontakt, VIP veče, predlozi
eksponata, rezervacije tura) i kompletan **admin panel**.

- **Live:** https://voluble-faun-427052.netlify.app
- **Repo / grana:** `Chumpitas/BezBrige-old`, grana `claude/project-overview-3t40br`
- **Deploy:** Netlify (auto-deploy sa GitHub-a, Next.js runtime adapter)
- **Jezik UI:** srpski (latinica), + EN prevod okvira (prekidač SR/EN)

---

## 2. Tehnologija

- **Monorepo** (pnpm workspaces + Turborepo). Aplikacija je u **`apps/web`**.
- **Next.js 15 (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS** (konfiguracija `apps/web/tailwind.config.ts`)
- **Supabase** (Postgres + Auth + Storage) — sa „fallback" slojem (sajt radi i bez baze)
- **Leaflet + OpenStreetMap** za mapu destilerija
- Generisane slike/sertifikati preko `next/og` (`/api/sertifikat`, `opengraph-image`)

### Pokretanje lokalno
```bash
pnpm install
# apps/web/.env.local:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
pnpm dev     # http://localhost:3000
pnpm build   # provera build-a pre commit-a
```

---

## 3. Dizajn sistem (trenutno stanje)

### Boje — `apps/web/tailwind.config.ts`
Dve skale (50–950), inspirisane šljivom i bakarnim kazanom:
- **`sljiva`** (ljubičasto-šljiva) — primarni brend; `sljiva-900` tamna pozadina hero/footera
- **`bakar`** (bakar/terakota) — akcenti, dugmad, linkovi; `bakar-600` glavni CTA

Pozadina sajta: `sljiva-50`. Tekst: `sljiva-950/700/600`.

### Tipografija — `apps/web/app/globals.css`
- `--font-sans: Inter` (telo), `--font-serif: Playfair Display` (naslovi, `font-serif`)
- ⚠️ **Fontovi NISU učitani** (nema `next/font` ni Google Fonts linka) — trenutno se
  renderuju sistemski fallback (`system-ui` / `Georgia`). **Prvi zadatak dizajna:**
  pravilno učitati fontove (preporuka: `next/font/google` u `app/layout.tsx`).

### Ostalo
- `.container-page` util (max-w-6xl, horizontalni padding) — koristi se svuda
- Kartice: `rounded-2xl border border-sljiva-200 bg-white shadow-sm`
- Hero sekcije: slika + `bg-gradient` preko (sljiva-900/bakar-900), beli tekst
- Breakpoint menija: desktop meni na **`xl`** (≥1280), ispod → hamburger (mobilni drawer)

---

## 4. Rute (stranice)

### Javne
`/` (naslovna) · `/o-projektu` · `/nacionalna-izlozba` · `/bajina-basta` ·
`/naucno-istrazivanje` · `/forum` · `/regioni` · `/proizvodjaci` ·
`/proizvodjaci/[slug]` · `/ture` · `/galerija` · `/velika-noc-rakije` · `/vesti` ·
`/vesti/[slug]` · `/partneri` · `/program` · `/posalji` (predlozi) · `/kontakt` ·
`/prijava` (sa živim bodovanjem)

> Napomena: `/program` i `/summit` su iz ranije strukture; nova struktura koristi
> `/forum`. Dizajner sme da ih objedini/povuče iz navigacije po dogovoru.

### Admin (`/admin`, zaštićeno Supabase Auth-om)
`/admin/login` + `(protected)`: pregled, prijave, vnr, ture, predlozi, proizvođači
(CRUD + CSV uvoz), vesti (CRUD), summit (CRUD), galerija. **Admin nije prioritet
dizajna** (interni alat) — fokus je javni deo.

---

## 5. Ključne komponente (`apps/web/components`)

| Fajl | Uloga |
|---|---|
| `site-header.tsx` | Zaglavlje + navigacija (server komp.); `NAV` (desktop) i `NAV_MOBILE` |
| `mobile-menu.tsx` | Hamburger + slide-in drawer (**client**) |
| `site-footer.tsx` | Footer sa svim linkovima |
| `language-switcher.tsx` | SR/EN prekidač (**client**, kolačić `lang`) |
| `slika.tsx` | `<img>` sa fallback-om (prava slika → mockup ako fali) — **client** |
| `direktorijum.tsx` | Grid proizvođača sa filterima (**client**) |
| `mapa-destilerija.tsx` | Leaflet mapa (**client**) |
| `uploader.tsx` | Upload slike (admin + javni predlozi) (**client**) |
| `json-ld.tsx` | SEO strukturirani podaci |

---

## 6. Sadržaj i podaci (NE LOMITI)

- **`lib/data.ts`** — svi upiti ka Supabase-u; svaki ima **fallback** (`lib/fallback.ts`)
  pa sajt radi i bez baze. Dizajn menja *prikaz*, ne ove funkcije.
- **`lib/content-override.ts`** — ručni tekstualni override (npr. priča Stare Sokolove).
- **`lib/i18n.ts`** — rečnik SR/EN + `tFactory`. Nove UI tekstove dodati ovde (ne hardkodovati EN).
- **`lib/scoring.ts`** — logika bodovanja prijave (6 kriterijuma, kategorije). Ne dirati.
- **`lib/slike.ts`** — mape slika: `SLIKE` (AI mockup, CDN), `LOKALNE` (prave slike u
  `apps/web/public/slike/`), `GALERIJA_PRAVE`, fallback po proizvođaču.

### Slike
- Prave fotografije su u **`apps/web/public/slike/`** (npr. `naslovna-podrum.jpg`,
  `stara-sokolova-burad.jpg`, `stari-kazan-1/2.jpg`, `podrum-burad.jpg`).
- Mockup (AI) slike su Higgsfield CDN URL-ovi u `SLIKE` — **privremene**, zameniti pravim.
- Koristi se obični `<img>` (+ `Slika` sa fallback-om). Dizajner može preći na
  `next/image` (tada podesiti `remotePatterns` u `next.config`).

---

## 7. Arhitektonska pravila (važno za dizajn)

1. **Server vs Client komponente.** Većina stranica su **server** komponente (async,
   čitaju podatke). Interaktivne komponente (meni, filteri, mapa, forme, prekidač jezika,
   `Slika`) su **`"use client"`**. Ako dodaješ interaktivnost (hover state sa JS, akordeoni,
   lightbox…), to ide u client komponentu — ne ubacivati hook-ove u server stranice.
2. **i18n preko kolačića** → stranice su dinamičke (čitaju `cookies()`). To je ok.
3. **Forme = server actions** (`actions.ts` uz svaku formu). Ne menjati potpis akcija;
   slobodno restajlovati polja/dugmad. Honeypot polje `vebsajt` mora ostati skriveno.
4. **Responsive:** sve mora da radi na telefonu (gutter 16px, bez horizontalnog skrola).
   Testirati i `xl` prelom menija.
5. **Pristupačnost:** zadržati kontrast (bakar na beloj zna biti nizak), alt tekstove,
   fokus stanja na formama.

---

## 8. Predlog prioriteta za redizajn

1. **Učitati prave fontove** (Playfair Display + Inter) — odmah podiže utisak.
2. **Naslovna strana** — jači hero, bolja hijerarhija, konzistentni razmaci sekcija.
3. **Tipografska skala i vertikalni ritam** (naslovi, lead, body, caption).
4. **Kartice i mreže** (proizvođači, regioni, forum događaji) — ujednačiti stil.
5. **Hero šabloni** (trenutno slika+gradient na više stranica) — standardizovati kao
   jednu komponentu.
6. **Forme** (prijava, kontakt, ture, predlozi) — jedinstven stil polja, validacija, stanja.
7. **Dark mode** (opciono) — trenutno ne postoji.
8. Zameniti **mockup slike** pravim fotografijama kad stignu.

---

## 9. Poznate „grube ivice"

- Fontovi deklarisani ali ne učitani (vidi 3).
- Dve generacije strukture (`/program`+`/summit` vs `/forum`) — treba konsolidovati.
- Mockup slike su eksterni CDN linkovi (mogu nestati) — prebaciti u repo/Storage.
- Admin UI je funkcionalan ali minimalan (nije prioritet).

---

## 10. Deploy & okruženje

- **Netlify** gradi `apps/web` (Base directory `apps/web`, `netlify.toml` + Next plugin),
  auto na svaki push na granu. Link ostaje isti.
- **Env (Netlify):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  (+ `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`, opciono `RESEND_API_KEY` za mejlove).
- **Supabase** (projekat `miqhtrfxlhoiibdtbdmd`) — besplatni plan se **pauzira** posle
  neaktivnosti; tada „Restore/Resume" u dashboard-u. SQL šema: `packages/db/apply_all.sql`.

---

## 11. Mapa fajlova za dizajn

```
apps/web/
├── app/
│   ├── globals.css           ← globalni stilovi, font varijable, .container-page
│   ├── layout.tsx            ← root layout (ovde učitati fontove), <SiteHeader/>, <SiteFooter/>
│   ├── page.tsx              ← naslovna
│   └── <ruta>/page.tsx       ← pojedinačne stranice
├── components/               ← header, footer, meni, kartice, mapa, slika…
├── tailwind.config.ts        ← paleta (sljiva/bakar), fontFamily
└── public/slike/             ← prave fotografije
```

**Zlatno pravilo:** menjaj `className`-ove, stilove, raspored i komponente slobodno;
**ne diraj** `lib/*` logiku podataka, potpise server akcija i API rute.
Uvek pokreni `pnpm build` pre commit-a.
