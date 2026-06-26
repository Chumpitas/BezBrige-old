/**
 * Sloj za dohvat podataka. Ako je Supabase povezan — čita iz baze;
 * u suprotnom vraća statički fallback, pa sajt uvek radi.
 */
import { getSupabase } from "./supabase";
import {
  FALLBACK_NAGRADE,
  FALLBACK_PARTNERI,
  FALLBACK_PROGRAM,
  FALLBACK_PROIZVODI,
  FALLBACK_PROIZVODJACI,
} from "./fallback";
import type {
  Nagrada,
  Partner,
  ProgramStavka,
  Proizvod,
  Proizvodjac,
  ProizvodjacDetalji,
} from "./types";

const PROIZVODJAC_KOLONE =
  "id, naziv, slug, porodica, generacija, godina_osnivanja, selo, grad, region, velicina, prica, logo_url, foto_url, sajt, lat, lng, objavljen, istaknut";

export async function getPartneri(): Promise<Partner[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK_PARTNERI;
  const { data, error } = await sb
    .from("partneri")
    .select("id, naziv, tip, logo_url, sajt, redosled")
    .eq("objavljen", true)
    .order("redosled", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_PARTNERI;
  return data as Partner[];
}

export async function getProgram(): Promise<ProgramStavka[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK_PROGRAM;
  const { data, error } = await sb
    .from("program_stavke")
    .select("id, nivo, naslov, opis, lokacija, datum, redosled")
    .eq("objavljen", true)
    .order("redosled", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_PROGRAM;
  return data as ProgramStavka[];
}

export async function getProizvodjaci(): Promise<Proizvodjac[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK_PROIZVODJACI;
  const { data, error } = await sb
    .from("proizvodjaci")
    .select(PROIZVODJAC_KOLONE)
    .eq("objavljen", true)
    .order("istaknut", { ascending: false })
    .order("naziv", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_PROIZVODJACI;
  return data as unknown as Proizvodjac[];
}

export async function getProizvodjac(
  slug: string,
): Promise<ProizvodjacDetalji | null> {
  const sb = getSupabase();
  if (!sb) {
    const p = FALLBACK_PROIZVODJACI.find((x) => x.slug === slug);
    if (!p) return null;
    return {
      ...p,
      proizvodi: FALLBACK_PROIZVODI.filter((x) => x.proizvodjac_id === p.id),
      nagrade: FALLBACK_NAGRADE.filter((x) => x.proizvodjac_id === p.id),
    };
  }
  const { data, error } = await sb
    .from("proizvodjaci")
    .select(PROIZVODJAC_KOLONE)
    .eq("slug", slug)
    .eq("objavljen", true)
    .maybeSingle();
  if (error || !data) return null;
  const p = data as unknown as Proizvodjac;

  const [{ data: proizvodi }, { data: nagrade }] = await Promise.all([
    sb
      .from("proizvodi")
      .select("id, proizvodjac_id, naziv, vrsta, sorta, opis, foto_url")
      .eq("proizvodjac_id", p.id)
      .order("naziv", { ascending: true }),
    sb
      .from("nagrade")
      .select("id, proizvodjac_id, naziv, nivo, medjunarodna, godina")
      .eq("proizvodjac_id", p.id)
      .order("godina", { ascending: false }),
  ]);

  return {
    ...p,
    proizvodi: (proizvodi ?? []) as Proizvod[],
    nagrade: (nagrade ?? []) as Nagrada[],
  };
}

export async function getSviSlugovi(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return FALLBACK_PROIZVODJACI.map((p) => p.slug).filter(Boolean) as string[];
  const { data } = await sb
    .from("proizvodjaci")
    .select("slug")
    .eq("objavljen", true);
  return (data ?? []).map((r) => (r as { slug: string }).slug).filter(Boolean);
}
