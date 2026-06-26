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
  lat: number | null;
  lng: number | null;
  objavljen: boolean;
  istaknut: boolean;
}

export interface Proizvod {
  id: string;
  proizvodjac_id: string;
  naziv: string;
  vrsta: string | null;
  sorta: string | null;
  opis: string | null;
  foto_url: string | null;
}

export interface Nagrada {
  id: string;
  proizvodjac_id: string | null;
  naziv: string;
  nivo: "zlato" | "srebro" | "bronza" | null;
  medjunarodna: boolean;
  godina: number | null;
}

export interface ProizvodjacDetalji extends Proizvodjac {
  proizvodi: Proizvod[];
  nagrade: Nagrada[];
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
