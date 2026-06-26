"use server";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { posaljiAdminEmail, escapeHtml } from "@/lib/email";

export interface VnrRezultat {
  ok: boolean;
  poruka: string;
}

export async function posaljiVnrPrijavu(
  _prev: VnrRezultat | null,
  formData: FormData,
): Promise<VnrRezultat> {
  const ime = String(formData.get("ime") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const telefon = String(formData.get("telefon") || "").trim();
  const organizacija = String(formData.get("organizacija") || "").trim();
  const brojOsoba = Math.max(1, Number(formData.get("broj_osoba")) || 1);
  const napomena = String(formData.get("napomena") || "").trim();
  const honey = String(formData.get("vebsajt") || "");

  if (honey) return { ok: true, poruka: "Hvala!" };
  if (!ime || !email) {
    return { ok: false, poruka: "Ime i email su obavezni." };
  }

  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    return {
      ok: true,
      poruka: "Prijava je primljena. (Baza još nije povezana.)",
    };
  }

  const { error } = await sb.from("vnr_prijave").insert({
    ime,
    email,
    telefon: telefon || null,
    organizacija: organizacija || null,
    broj_osoba: brojOsoba,
    napomena: napomena || null,
  });
  if (error) return { ok: false, poruka: "Greška pri slanju. Pokušajte ponovo." };

  await posaljiAdminEmail(
    `Velika noć rakije — nova prijava: ${ime} (${brojOsoba})`,
    `<h2>Nova prijava za Veliku noć rakije</h2>
     <p><strong>Gost:</strong> ${escapeHtml(ime)}</p>
     <p><strong>Email:</strong> ${escapeHtml(email)}${telefon ? " — " + escapeHtml(telefon) : ""}</p>
     <p><strong>Organizacija:</strong> ${escapeHtml(organizacija || "—")}</p>
     <p><strong>Broj osoba:</strong> ${brojOsoba}</p>
     ${napomena ? `<p><strong>Napomena:</strong> ${escapeHtml(napomena)}</p>` : ""}`,
  );

  return { ok: true, poruka: "Hvala! Vaša prijava za „Veliku noć rakije” je poslata." };
}
