/**
 * Sloj za dohvat podataka. Ako je Supabase povezan — čita iz baze;
 * u suprotnom vraća statički fallback, pa sajt uvek radi.
 */
import { getSupabase } from "./supabase";
import {
  FALLBACK_PARTNERI,
  FALLBACK_PROGRAM,
  FALLBACK_PROIZVODJACI,
} from "./fallback";
import type { Partner, ProgramStavka, Proizvodjac } from "./types";

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
    .select(
      "id, naziv, slug, porodica, generacija, godina_osnivanja, selo, grad, region, velicina, prica, logo_url, foto_url, sajt, objavljen, istaknut",
    )
    .eq("objavljen", true)
    .order("istaknut", { ascending: false })
    .order("naziv", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_PROIZVODJACI;
  return data as Proizvodjac[];
}
