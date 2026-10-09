/**
 * Slike sajta. Sve su lokalni fajlovi u apps/web/public/slike/ — bez eksternog CDN-a.
 * - LOKALNE: autentične fotografije (naslovna, Stara Sokolova, kazani, podrum)
 * - GEN: AI-generisane (Gemini) etno/rakija/Srbija slike, optimizovane
 */

/** Autentične fotografije. */
export const LOKALNE = {
  naslovna: "/slike/naslovna-podrum.jpg",
  staraSokolovaBurad: "/slike/stara-sokolova-burad.jpg",
  staraSokolovaCasa: "/slike/stara-sokolova-casa.jpg",
  stariKazan1: "/slike/stari-kazan-1.jpg",
  stariKazan2: "/slike/stari-kazan-2.jpg",
  podrumBurad: "/slike/podrum-burad.jpg",
} as const;

/** Generisane tematske slike (16:9). */
export const GEN = {
  sljive: "/slike/gen-sljive.jpg",
  kazan: "/slike/gen-kazan.jpg",
  burad: "/slike/gen-burad.jpg",
  pejzaz: "/slike/gen-pejzaz.jpg",
  gala: "/slike/gen-gala.jpg",
  summit: "/slike/gen-summit.jpg",
  muzej: "/slike/gen-muzej.jpg",
  casa: "/slike/gen-casa.jpg",
  porodica: "/slike/gen-porodica.jpg",
  // Nova serija (proces + atmosfera)
  forum: "/slike/gen-forum.jpg",
  berba: "/slike/gen-berba.jpg",
  vatra: "/slike/gen-vatra.jpg",
  tocenje: "/slike/gen-tocenje.jpg",
  velikaNoc: "/slike/gen-velika-noc.jpg",
  majstor: "/slike/gen-majstor.jpg",
  nagrade: "/slike/gen-nagrade.jpg",
  izlozba: "/slike/gen-izlozba.jpg",
  tara: "/slike/gen-tara.jpg",
  nazdravlje: "/slike/gen-nazdravlje.jpg",
  istrazivanje: "/slike/gen-istrazivanje.jpg",
} as const;

/** Tematski aliasi (koriste ih heroji stranica). */
export const SLIKE = {
  sljive: GEN.sljive,
  kazan: GEN.kazan,
  case: GEN.casa,
  gala: GEN.gala,
  pejzaz: GEN.pejzaz,
  burad: GEN.burad,
  summit: GEN.summit,
  muzej: GEN.muzej,
  porodica: GEN.porodica,
  forum: GEN.forum,
  berba: GEN.berba,
  vatra: GEN.vatra,
  tocenje: GEN.tocenje,
  velikaNoc: GEN.velikaNoc,
  majstor: GEN.majstor,
  nagrade: GEN.nagrade,
  izlozba: GEN.izlozba,
  tara: GEN.tara,
  nazdravlje: GEN.nazdravlje,
} as const;

/** Koraci procesa (berba → pečenje → točenje → odležavanje). */
export const PROCES = [
  { slika: GEN.berba, naslov: "Berba šljive", opis: "Zrela šljiva iz porodičnih voćnjaka." },
  { slika: GEN.vatra, naslov: "Pečenje", opis: "Kazan nad otvorenom vatrom." },
  { slika: GEN.tocenje, naslov: "Točenje", opis: "Prvi tok bistre rakije." },
  { slika: LOKALNE.podrumBurad, naslov: "Odležavanje", opis: "Hrastova burad u podrumu." },
] as const;

/** Slike regiona (rotira se po karticama na /regioni). */
export const REGION_SLIKE = [
  "/slike/gen-region-zapad.jpg",
  "/slike/gen-region-sumadija.jpg",
  "/slike/gen-region-vojvodina.jpg",
  GEN.pejzaz,
  "/slike/gen-region-zapad.jpg",
  "/slike/gen-region-sumadija.jpg",
  "/slike/gen-region-jug.jpg",
  "/slike/gen-region-jug.jpg",
  "/slike/gen-region-istok.jpg",
  "/slike/gen-region-istok.jpg",
];

/** Rotacioni fallback za kartice/profile proizvođača bez fotografije. */
export const FALLBACK_FOTO = [
  LOKALNE.stariKazan1,
  GEN.burad,
  LOKALNE.podrumBurad,
  GEN.kazan,
  LOKALNE.staraSokolovaBurad,
];

/** Slike za vesti (rotacija kad vest nema svoj cover). */
export const VESTI_SLIKE = [
  GEN.forum,
  GEN.izlozba,
  GEN.muzej,
  GEN.nagrade,
  GEN.berba,
  GEN.tara,
  GEN.velikaNoc,
  GEN.tocenje,
];

/** Prikladna slika po konkretnoj vesti (slug). */
const VESTI_SLUG_SLIKA: Record<string, string> = {
  "istrazivanje-tradicionalne-proizvodnje-sljivovice": GEN.istrazivanje,
  "najava-izlozbe-rakija-kulturno-dobro-srbije": GEN.izlozba,
};

export function slikaZaVest(seed: string, cover?: string | null): string {
  if (cover) return cover;
  if (VESTI_SLUG_SLIKA[seed]) return VESTI_SLUG_SLIKA[seed];
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i)) % VESTI_SLIKE.length;
  return VESTI_SLIKE[n];
}

export function fotoZaProizvodjaca(seed: string, foto?: string | null): string {
  if (foto) return foto;
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i)) % FALLBACK_FOTO.length;
  return FALLBACK_FOTO[n];
}

const LOKALNA_FOTO_PROIZVODJACA: Record<string, string> = {
  "stara-sokolova": LOKALNE.staraSokolovaBurad,
};

export function lokalnaFotoProizvodjaca(slug?: string | null): string | null {
  if (!slug) return null;
  return LOKALNA_FOTO_PROIZVODJACA[slug] ?? null;
}

/** Prava galerija (mix autentičnih i generisanih lokalnih slika). */
export const GALERIJA_PRAVE = [
  { id: "g1", src: LOKALNE.stariKazan1, fallback: GEN.kazan, naslov: "Pečenje rakije", opis: "Tradicionalni kazan, zidano ložište" },
  { id: "g2", src: GEN.kazan, fallback: LOKALNE.stariKazan2, naslov: "Kazandžinica", opis: "Bakarni kazan i para" },
  { id: "g3", src: LOKALNE.podrumBurad, fallback: GEN.burad, naslov: "Stari podrum", opis: "Bačve i alat za proizvodnju" },
  { id: "g4", src: LOKALNE.staraSokolovaBurad, fallback: GEN.burad, naslov: "Odležavanje", opis: "Stara Sokolova — hrastove bačve" },
  { id: "g5", src: GEN.sljive, fallback: GEN.pejzaz, naslov: "Šljivici", opis: "Berba u zapadnoj Srbiji" },
  { id: "g6", src: GEN.casa, fallback: LOKALNE.staraSokolovaCasa, naslov: "Degustacija", opis: "Čaša vrhunske rakije" },
  { id: "g7", src: GEN.muzej, fallback: GEN.burad, naslov: "Eksponati", opis: "Stari predmeti proizvodnje" },
  { id: "g8", src: GEN.porodica, fallback: LOKALNE.naslovna, naslov: "Sa kolena na koleno", opis: "Porodična tradicija" },
];
