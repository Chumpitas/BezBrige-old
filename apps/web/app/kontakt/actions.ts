"use server";

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { posaljiAdminEmail, escapeHtml } from "@/lib/email";

export interface KontaktRezultat {
  ok: boolean;
  poruka: string;
}

export async function posaljiPoruku(
  _prev: KontaktRezultat | null,
  formData: FormData,
): Promise<KontaktRezultat> {
  const ime = String(formData.get("ime") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const poruka = String(formData.get("poruka") || "").trim();
  // honeypot protiv spama
  const honey = String(formData.get("vebsajt") || "");

  if (honey) return { ok: true, poruka: "Hvala!" };
  if (!ime || !email || !poruka) {
    return { ok: false, poruka: "Sva polja su obavezna." };
  }

  const sb = getSupabase();
  if (!sb || !isSupabaseConfigured()) {
    return {
      ok: true,
      poruka:
        "Poruka je primljena. (Baza još nije povezana, pa nije trajno sačuvana.)",
    };
  }

  const { error } = await sb
    .from("kontakt_poruke")
    .insert({ ime, email, poruka });
  if (error) {
    return { ok: false, poruka: "Greška pri slanju. Pokušajte ponovo." };
  }

  await posaljiAdminEmail(
    `Nova kontakt poruka: ${ime}`,
    `<h2>Nova poruka sa sajta</h2>
     <p><strong>Ime:</strong> ${escapeHtml(ime)}</p>
     <p><strong>Email:</strong> ${escapeHtml(email)}</p>
     <p><strong>Poruka:</strong></p>
     <p>${escapeHtml(poruka).replace(/\n/g, "<br/>")}</p>`,
  );

  return { ok: true, poruka: "Hvala! Vaša poruka je poslata." };
}
