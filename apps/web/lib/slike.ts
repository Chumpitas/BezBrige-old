/**
 * Slike sajta. Prave (autentične) fotografije su u apps/web/public/slike/.
 * Sve referencirane slike koriste lokalne fajlove — bez zavisnosti od eksternog CDN-a.
 */

/** Lokalne (prave) fotografije — fajlovi u apps/web/public/slike/. */
export const LOKALNE = {
  naslovna: "/slike/naslovna-podrum.jpg", // otac i sin u podrumu
  staraSokolovaBurad: "/slike/stara-sokolova-burad.jpg",
  staraSokolovaCasa: "/slike/stara-sokolova-casa.jpg",
  stariKazan1: "/slike/stari-kazan-1.jpg",
  stariKazan2: "/slike/stari-kazan-2.jpg",
  podrumBurad: "/slike/podrum-burad.jpg",
} as const;

/**
 * Tematske slike (aliasi na prave lokalne fotografije).
 * Ranije su bile AI-generisane (CDN) — sada koriste autentične etno fotke.
 */
export const SLIKE = {
  sljive: LOKALNE.naslovna,
  kazan: LOKALNE.stariKazan1,
  case: LOKALNE.staraSokolovaCasa,
  gala: LOKALNE.staraSokolovaCasa,
  pejzaz: LOKALNE.naslovna,
  burad: LOKALNE.podrumBurad,
  summit: LOKALNE.stariKazan2,
} as const;

/** Rotacioni fallback za kartice/profile proizvođača bez fotografije. */
export const FALLBACK_FOTO = [
  LOKALNE.stariKazan1,
  LOKALNE.podrumBurad,
  LOKALNE.staraSokolovaBurad,
  LOKALNE.stariKazan2,
];

export function fotoZaProizvodjaca(seed: string, foto?: string | null): string {
  if (foto) return foto;
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i)) % FALLBACK_FOTO.length;
  return FALLBACK_FOTO[n];
}

const LOKALNA_FOTO_PROIZVODJACA: Record<string, string> = {
  "stara-sokolova": LOKALNE.staraSokolovaBurad,
};

/** Lokalna prava foto za poznatog proizvođača (ili null). */
export function lokalnaFotoProizvodjaca(slug?: string | null): string | null {
  if (!slug) return null;
  return LOKALNA_FOTO_PROIZVODJACA[slug] ?? null;
}

/** Prava galerija (lokalne slike). */
export const GALERIJA_PRAVE = [
  { id: "g1", src: LOKALNE.stariKazan1, fallback: LOKALNE.stariKazan2, naslov: "Pečenje rakije", opis: "Tradicionalni kazan, zidano ložište" },
  { id: "g2", src: LOKALNE.stariKazan2, fallback: LOKALNE.stariKazan1, naslov: "Stari bakarni kazan", opis: "Seoska kazandžinica" },
  { id: "g3", src: LOKALNE.podrumBurad, fallback: LOKALNE.staraSokolovaBurad, naslov: "Stari podrum", opis: "Bačve i alat za proizvodnju" },
  { id: "g4", src: LOKALNE.staraSokolovaBurad, fallback: LOKALNE.podrumBurad, naslov: "Odležavanje", opis: "Stara Sokolova — hrastove bačve" },
  { id: "g5", src: LOKALNE.staraSokolovaCasa, fallback: LOKALNE.staraSokolovaBurad, naslov: "Degustacija", opis: "Stara Sokolova rakija" },
  { id: "g6", src: LOKALNE.naslovna, fallback: LOKALNE.podrumBurad, naslov: "Sa kolena na koleno", opis: "Porodična tradicija" },
];
