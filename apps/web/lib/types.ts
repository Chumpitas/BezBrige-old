export type VelicinaDestilerije = "mala" | "srednja" | "velika";

export type KategorijaRakijasa =
  | "veliki_majstori"
  | "cuvari_kvaliteta"
  | "mladi_majstori";

export type TipPartnera = "pokrovitelj" | "partner" | "medijski_partner";

export interface Proizvodjac {
  id: string;
  naziv: string;
  slug: string | null;
  porodica: string | null;
  generacija: number | null;
  godina_osnivanja: number | null;
  selo: string | null;
  grad: string | null;
  region: string | null;
  velicina: VelicinaDestilerije | null;
  prica: string | null;
  logo_url: string | null;
  foto_url: string | null;
  sajt: string | null;
  objavljen: boolean;
  istaknut: boolean;
}

export interface Partner {
  id: string;
  naziv: string;
  tip: TipPartnera;
  logo_url: string | null;
  sajt: string | null;
  redosled: number;
}

export interface ProgramStavka {
  id: string;
  nivo: string | null;
  naslov: string;
  opis: string | null;
  lokacija: string | null;
  datum: string | null;
  redosled: number;
}
