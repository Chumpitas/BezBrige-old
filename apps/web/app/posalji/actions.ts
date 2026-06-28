"use server";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { posaljiAdminEmail, escapeHtml } from "@/lib/email";

export interface PredlogRezultat {
  ok: boolean;
  poruka: string;
}

export async function posaljiPredlog(
  _prev: PredlogRezultat | null,
  formData: FormData,
): Promise<PredlogRezultat> {
  const tip = String(formData.get("tip")) === "eksponat" ? "eksponat" : "foto";
  const ime = String(formData.get("ime") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const telefon = String(formData.get("telefon") || "").trim();
  const mesto = String(formData.get("mesto") || "").trim();
  const opis = String(formData.get("opis") || "").trim();
  const fotoUrl = String(formData.get("foto_url") || "").trim();
  const honey = String(formData.get("vebsajt") || "");

  if (honey) return { ok: true, poruka: "Hvala!" };
  if (!ime || !opis) {
    return { ok: false, poruka: "Ime i opis su obavezni." };
  }

  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    return { ok: true, poruka: "Predlog je primljen. (Baza još nije povezana.)" };
  }

  const { error } = await sb.from("predlozi").insert({
    tip,
    ime,
    email: email || null,
    telefon: telefon || null,
    mesto: mesto || null,
    opis,
    foto_url: fotoUrl || null,
  });
  if (error) return { ok: false, poruka: "Greška pri slanju. Pokušajte ponovo." };

  await posaljiAdminEmail(
    `Novi predlog (${tip === "eksponat" ? "eksponat" : "stara fotografija"}): ${ime}`,
    `<h2>Novi predlog sa sajta</h2>
     <p><strong>Tip:</strong> ${tip === "eksponat" ? "Predlog eksponata" : "Stara fotografija"}</p>
     <p><strong>Ime:</strong> ${escapeHtml(ime)}</p>
     <p><strong>Kontakt:</strong> ${escapeHtml(email || "—")} ${telefon ? "· " + escapeHtml(telefon) : ""}</p>
     <p><strong>Mesto / kraj:</strong> ${escapeHtml(mesto || "—")}</p>
     <p><strong>Opis:</strong> ${escapeHtml(opis).replace(/\n/g, "<br/>")}</p>
     ${fotoUrl ? `<p><strong>Foto:</strong> <a href="${fotoUrl}">${fotoUrl}</a></p>` : ""}`,
  );

  return {
    ok: true,
    poruka: "Hvala! Vaš predlog je poslat. Javićemo vam se ako bude izabran.",
  };
}
