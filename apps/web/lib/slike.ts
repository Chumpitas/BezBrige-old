/**
 * Mockup (AI-generisane) slike za vizuelni prikaz sajta.
 * Zameniti pravim fotografijama kada budu dostupne.
 */
const BASE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_2zCFsJmlhH6t01iCupOrbjaSRvW";

export const SLIKE = {
  sljive: `${BASE}/hf_20260626_131110_9a366b9b-e659-4b89-9e67-e44d41f6ac9f.jpeg`,
  kazan: `${BASE}/hf_20260626_131123_d4cb5211-b99d-430e-a084-1c6db9fd78be.jpeg`,
  case: `${BASE}/hf_20260626_131129_e0a2997b-addf-4720-8585-ef5251195da3.jpeg`,
  gala: `${BASE}/hf_20260626_131135_9c37a999-3a9a-42ff-8549-4452151a5a55.jpeg`,
  pejzaz: `${BASE}/hf_20260626_131142_e7b388c9-8c3a-476b-9063-e77f5be6d10c.jpeg`,
  burad: `${BASE}/hf_20260626_131148_e5761e00-bca1-471c-8a2b-7ad5a59ff683.jpeg`,
  summit: `${BASE}/hf_20260626_131156_369bf3d6-820c-4723-b282-2b0a374a3032.jpeg`,
} as const;

/** Rotacioni fallback za kartice/profile proizvođača bez fotografije. */
export const FALLBACK_FOTO = [SLIKE.kazan, SLIKE.burad, SLIKE.case, SLIKE.sljive];

export function fotoZaProizvodjaca(seed: string, foto?: string | null): string {
  if (foto) return foto;
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n + seed.charCodeAt(i)) % FALLBACK_FOTO.length;
  return FALLBACK_FOTO[n];
}

/** Mockup galerija (koristi se kad je 'galerija' tabela prazna). */
export const GALERIJA_MOCKUP = [
  { id: "m1", url: SLIKE.sljive, naslov: "Šljive u voćnjaku", opis: "Zapadna Srbija, berba" },
  { id: "m2", url: SLIKE.kazan, naslov: "Tradicionalni kazan", opis: "Pečenje rakije" },
  { id: "m3", url: SLIKE.case, naslov: "Degustacija", opis: "Vrhunska šljivovica" },
  { id: "m4", url: SLIKE.burad, naslov: "Odležavanje", opis: "Hrastove bačve" },
  { id: "m5", url: SLIKE.pejzaz, naslov: "Bajina Bašta", opis: "Dolina Drine i Tara" },
  { id: "m6", url: SLIKE.gala, naslov: "Velika noć rakije", opis: "Gala veče" },
];
