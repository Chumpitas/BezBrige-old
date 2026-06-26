"use server";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { posaljiAdminEmail, escapeHtml } from "@/lib/email";
import {
  izracunajBodove,
  kategorija,
  KATEGORIJE_INFO,
  type PrijavaUlaz,
} from "@/lib/scoring";

export interface PrijavaPodnesak {
  nazivDestilerije: string;
  kontaktIme: string;
  email: string;
  telefon?: string;
  grad?: string;
  ulaz: PrijavaUlaz;
}

export interface PrijavaRezultat {
  ok: boolean;
  poruka: string;
  bodovi?: number;
  kategorija?: string;
  sacuvano?: boolean;
}

export async function posaljiPrijavu(
  p: PrijavaPodnesak,
): Promise<PrijavaRezultat> {
  // osnovna validacija
  if (!p.nazivDestilerije?.trim() || !p.kontaktIme?.trim() || !p.email?.trim()) {
    return { ok: false, poruka: "Naziv destilerije, ime i email su obavezni." };
  }

  // autoritativno bodovanje na serveru
  const bodovi = izracunajBodove(p.ulaz);
  const kat = kategorija(bodovi.ukupno);

  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    // baza još nije povezana — vrati rezultat bez čuvanja
    return {
      ok: true,
      poruka:
        "Prijava je obrađena. (Baza još nije povezana, pa prijava nije trajno sačuvana.)",
      bodovi: bodovi.ukupno,
      kategorija: kat,
      sacuvano: false,
    };
  }

  const { error } = await sb.from("prijave").insert({
    naziv_destilerije: p.nazivDestilerije.trim(),
    kontakt_ime: p.kontaktIme.trim(),
    email: p.email.trim(),
    telefon: p.telefon?.trim() || null,
    grad: p.grad?.trim() || null,
    podaci: p.ulaz,
    bodovi_tradicija: bodovi.tradicija,
    bodovi_proizvodnja: bodovi.proizvodnja,
    bodovi_nagrade: bodovi.nagrade,
    bodovi_brend: bodovi.brend,
    bodovi_organizacija: bodovi.organizacija,
    bodovi_vrednost: bodovi.vrednost,
    bodovi_ukupno: bodovi.ukupno,
    kategorija: kat,
  });

  if (error) {
    return {
      ok: false,
      poruka: "Došlo je do greške pri čuvanju prijave. Pokušajte ponovo.",
    };
  }

  await posaljiAdminEmail(
    `Nova prijava: ${p.nazivDestilerije} (${bodovi.ukupno} — ${KATEGORIJE_INFO[kat].naziv})`,
    `<h2>Nova prijava proizvođača</h2>
     <p><strong>Destilerija:</strong> ${escapeHtml(p.nazivDestilerije)}</p>
     <p><strong>Kontakt:</strong> ${escapeHtml(p.kontaktIme)} — ${escapeHtml(p.email)}${p.telefon ? " — " + escapeHtml(p.telefon) : ""}</p>
     <p><strong>Grad:</strong> ${escapeHtml(p.grad || "—")}</p>
     <p><strong>Bodovi:</strong> ${bodovi.ukupno}/100 — <strong>${KATEGORIJE_INFO[kat].naziv}</strong></p>
     <p>Tradicija ${bodovi.tradicija} · Proizvodnja ${bodovi.proizvodnja} · Nagrade ${bodovi.nagrade} · Brend ${bodovi.brend} · Organizacija ${bodovi.organizacija} · Vrednost ${bodovi.vrednost}</p>
     <p>Pregled u admin panelu: /admin/prijave</p>`,
  );

  return {
    ok: true,
    poruka: "Hvala! Vaša prijava je uspešno poslata.",
    bodovi: bodovi.ukupno,
    kategorija: kat,
    sacuvano: true,
  };
}
