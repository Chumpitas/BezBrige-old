"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";

function txt(v: FormDataEntryValue | null): string | null {
  const t = v ? String(v).trim() : "";
  return t === "" ? null : t;
}

async function osvezi() {
  revalidatePath("/admin/galerija");
  revalidatePath("/galerija");
}

export async function dodajMedij(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const url = txt(formData.get("url"));
  if (!url) return;
  const tip = String(formData.get("tip")) === "video" ? "video" : "slika";
  const redosled = Number(formData.get("redosled")) || 0;
  await sb.from("galerija").insert({
    url,
    tip,
    naslov: txt(formData.get("naslov")),
    opis: txt(formData.get("opis")),
    redosled,
    objavljen: true,
  });
  await osvezi();
}

export async function obrisiMedij(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  if (!id) return;
  await sb.from("galerija").delete().eq("id", id);
  await osvezi();
}

export async function toggleMedij(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  const objavljen = String(formData.get("objavljen")) === "true";
  if (!id) return;
  await sb.from("galerija").update({ objavljen }).eq("id", id);
  await osvezi();
}
