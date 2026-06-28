"use server";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { posaljiAdminEmail, escapeHtml } from "@/lib/email";

export interface TuraRezultat {
  ok: boolean;
  poruka: string;
}

export async function posaljiRezervaciju(
  _prev: TuraRezultat | null,
  formData: FormData,
): Promise<TuraRezultat> {
  const ime = String(formData.get("ime") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const telefon = String(formData.get("telefon") || "").trim();
  const datum = String(formData.get("datum") || "").trim();
  const brojOsoba = Math.max(1, Number(formData.get("broj_osoba")) || 1);
  const destilerija = String(formData.get("destilerija") || "").trim();
  const poruka = String(formData.get("poruka") || "").trim();
  const honey = String(formData.get("vebsajt") || "");

  if (honey) return { ok: true, poruka: "Hvala!" };
  if (!ime || !email) return { ok: false, poruka: "Ime i email su obavezni." };

  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    return { ok: true, poruka: "Rezervacija je primljena. (Baza još nije povezana.)" };
  }

  const { error } = await sb.from("ture_rezervacije").insert({
    ime,
    email,
    telefon: telefon || null,
    datum: datum || null,
    broj_osoba: brojOsoba,
    destilerija: destilerija || null,
    poruka: poruka || null,
  });
  if (error) return { ok: false, poruka: "Greška pri slanju. Pokušajte ponovo." };

  await posaljiAdminEmail(
    `Nova rezervacija ture: ${ime} (${brojOsoba})`,
    `<h2>Nova rezervacija degustacijske ture</h2>
     <p><strong>Ime:</strong> ${escapeHtml(ime)}</p>
     <p><strong>Kontakt:</strong> ${escapeHtml(email)} ${telefon ? "· " + escapeHtml(telefon) : ""}</p>
     <p><strong>Datum:</strong> ${escapeHtml(datum || "—")}</p>
     <p><strong>Broj osoba:</strong> ${brojOsoba}</p>
     <p><strong>Destilerija / regija:</strong> ${escapeHtml(destilerija || "—")}</p>
     ${poruka ? `<p><strong>Poruka:</strong> ${escapeHtml(poruka)}</p>` : ""}`,
  );

  return { ok: true, poruka: "Hvala! Vaša rezervacija je poslata — javićemo vam se sa potvrdom." };
}
