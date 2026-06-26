/**
 * Bodovanje rakijaša po 6 kriterijuma (iz dokumenta "Kriterijumi za rakijaše").
 *
 * Max bodova:
 *   1. Tradicija            20
 *   2. Proizvodnja          15
 *   3. Nagrade              25
 *   4. Brend i tržište      15
 *   5. Organizacija         10
 *   6. Vrednost / priča     15
 *   ----------------------------
 *   UKUPNO                 100
 *
 * Kategorije:
 *   75–100  Veliki majstori rakije
 *   45–74   Čuvari kvaliteta
 *    0–44   Mladi majstori / nove destilerije
 */

import type { KategorijaRakijasa } from "./types";

export interface PrijavaUlaz {
  // 1. Tradicija
  godineTradicije: number; // koliko godina destilerija postoji
  porodicnaTradicija: boolean; // bonus +5

  // 2. Proizvodnja (godišnje, u litrima)
  velicina: "mala" | "srednja" | "velika" | "";

  // 3. Nagrade (broj nagrada po nivou)
  medjZlato: number;
  medjSrebro: number;
  medjBronza: number;
  domZlato: number;
  domSrebro: number;
  domBronza: number;

  // 4. Brend i tržište
  izvozPreko50: boolean; // +5
  horeca: boolean; // +5
  retail: boolean; // +5

  // 5. Organizacija
  brojZaposlenih: number;
  profMenadzment: boolean;
  tehnolog: boolean;
  standardi: boolean; // ISO i dr.

  // 6. Vrednost brenda / autentičnost / priča (subjektivno, samoprocena)
  porodicnaPrica: boolean;
  lokalnaSorta: boolean;
  tradicionalnaProizvodnja: boolean;
  posebnost: boolean;
}

export interface Bodovi {
  tradicija: number;
  proizvodnja: number;
  nagrade: number;
  brend: number;
  organizacija: number;
  vrednost: number;
  ukupno: number;
}

const clamp = (n: number, max: number) => Math.max(0, Math.min(n, max));

function bodTradicija(u: PrijavaUlaz): number {
  const g = u.godineTradicije || 0;
  let b: number;
  if (g >= 30) b = 20;
  else if (g >= 15) b = 15;
  else if (g >= 5) b = 10;
  else b = 5;
  if (u.porodicnaTradicija) b += 5;
  return clamp(b, 20);
}

function bodProizvodnja(u: PrijavaUlaz): number {
  switch (u.velicina) {
    case "velika":
      return 15;
    case "srednja":
      return 10;
    case "mala":
      return 5;
    default:
      return 0;
  }
}

function bodNagrade(u: PrijavaUlaz): number {
  const b =
    u.medjZlato * 3 +
    u.medjSrebro * 2 +
    u.medjBronza * 1 +
    u.domZlato * 1.5 +
    u.domSrebro * 1 +
    u.domBronza * 0.5;
  return clamp(b, 25);
}

function bodBrend(u: PrijavaUlaz): number {
  let b = 0;
  if (u.izvozPreko50) b += 5;
  if (u.horeca) b += 5;
  if (u.retail) b += 5;
  return clamp(b, 15);
}

function bodOrganizacija(u: PrijavaUlaz): number {
  let b = 0;
  // broj zaposlenih: skalirano do 2.5
  const z = u.brojZaposlenih || 0;
  if (z >= 20) b += 2.5;
  else if (z >= 6) b += 2;
  else if (z >= 1) b += 1;
  if (u.profMenadzment) b += 2.5;
  if (u.tehnolog) b += 2.5;
  if (u.standardi) b += 2.5;
  return clamp(b, 10);
}

function bodVrednost(u: PrijavaUlaz): number {
  // subjektivno; samoprocena daje preliminarni rezultat (admin može korigovati)
  let b = 0;
  if (u.porodicnaPrica) b += 3.75;
  if (u.lokalnaSorta) b += 3.75;
  if (u.tradicionalnaProizvodnja) b += 3.75;
  if (u.posebnost) b += 3.75;
  return clamp(b, 15);
}

export function izracunajBodove(u: PrijavaUlaz): Bodovi {
  const tradicija = bodTradicija(u);
  const proizvodnja = bodProizvodnja(u);
  const nagrade = bodNagrade(u);
  const brend = bodBrend(u);
  const organizacija = bodOrganizacija(u);
  const vrednost = bodVrednost(u);
  const ukupno =
    tradicija + proizvodnja + nagrade + brend + organizacija + vrednost;
  return {
    tradicija,
    proizvodnja,
    nagrade,
    brend,
    organizacija,
    vrednost,
    ukupno: Math.round(ukupno * 100) / 100,
  };
}

export function kategorija(ukupno: number): KategorijaRakijasa {
  if (ukupno >= 75) return "veliki_majstori";
  if (ukupno >= 45) return "cuvari_kvaliteta";
  return "mladi_majstori";
}

export const KATEGORIJE_INFO: Record<
  KategorijaRakijasa,
  { naziv: string; raspon: string; benefiti: string[] }
> = {
  veliki_majstori: {
    naziv: "Veliki majstori rakije",
    raspon: "75–100 bodova",
    benefiti: [
      "Najveći branding (centralni pano)",
      "Centralne pozicije (prvenstvo na eksponate)",
      "Ekskluzivni događaji (sopstveni događaj u okviru Rakija Summita)",
      "Speaking slot — govor na panelu",
    ],
  },
  cuvari_kvaliteta: {
    naziv: "Čuvari kvaliteta",
    raspon: "45–74 bodova",
    benefiti: [
      "Standardna vidljivost",
      "Degustacije",
      "Učešće u programu",
    ],
  },
  mladi_majstori: {
    naziv: "Mladi majstori / nove destilerije",
    raspon: "0–44 bodova",
    benefiti: [
      "Niža cena ulaska",
      "Zajednički prostor",
      "Digitalna promocija",
    ],
  },
};
