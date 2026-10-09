import type { Proizvodjac } from "./types";

/** Vrste rakije koje nudimo kao filter (čip „Rakija"). */
export const VRSTE_RAKIJE = [
  "Šljivovica",
  "Klekovača",
  "Kajsijevača",
  "Viljamovka",
  "Travarica",
  "Dunjevača",
  "Lozovača",
];

const PRAVILA: [RegExp, string][] = [
  [/šljiv/i, "Šljivovica"],
  [/klek/i, "Klekovača"],
  [/kajsij/i, "Kajsijevača"],
  [/viljamov|kruš/i, "Viljamovka"],
  [/travaric/i, "Travarica"],
  [/dunj/i, "Dunjevača"],
  [/lozov|grožđ/i, "Lozovača"],
];

/** Pokušava da izvede vrste rakije iz naziva + priče proizvođača. */
export function vrsteProizvodjaca(p: Proizvodjac): string[] {
  const t = `${p.naziv} ${p.prica ?? ""}`;
  return PRAVILA.filter(([re]) => re.test(t)).map(([, v]) => v);
}

export function vrsteLabel(p: Proizvodjac): string {
  const v = vrsteProizvodjaca(p);
  return v.length ? v.join(" · ") : "voćne rakije";
}
