"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";

function txt(v: FormDataEntryValue | null): string | null {
  const t = v ? String(v).trim() : "";
  return t === "" ? null : t;
}

export async function sacuvajPanel(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  const naslov = txt(formData.get("naslov"));
  if (!naslov) return;

  const podaci = {
    naslov,
    opis: txt(formData.get("opis")),
    govornici: txt(formData.get("govornici")),
    sala: txt(formData.get("sala")),
    datum: txt(formData.get("datum")),
    vreme_od: txt(formData.get("vreme_od")),
    vreme_do: txt(formData.get("vreme_do")),
    redosled: Number(formData.get("redosled")) || 0,
    objavljen: formData.get("objavljen") === "on",
  };

  if (id) await sb.from("paneli").update(podaci).eq("id", id);
  else await sb.from("paneli").insert(podaci);

  revalidatePath("/admin/summit");
  revalidatePath("/summit");
  redirect("/admin/summit");
}

export async function obrisiPanel(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  if (!id) return;
  await sb.from("paneli").delete().eq("id", id);
  revalidatePath("/admin/summit");
  revalidatePath("/summit");
  redirect("/admin/summit");
}
