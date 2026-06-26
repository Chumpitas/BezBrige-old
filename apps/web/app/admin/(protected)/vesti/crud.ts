"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

function txt(v: FormDataEntryValue | null): string | null {
  const t = v ? String(v).trim() : "";
  return t === "" ? null : t;
}

export async function sacuvajVest(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;

  const id = txt(formData.get("id"));
  const naslov = txt(formData.get("naslov"));
  if (!naslov) return;

  const objavljen = formData.get("objavljen") === "on";
  const objavljenoUnos = txt(formData.get("objavljeno_at"));

  const podaci: Record<string, unknown> = {
    naslov,
    slug: txt(formData.get("slug")) ?? slugify(naslov),
    sazetak: txt(formData.get("sazetak")),
    sadrzaj: txt(formData.get("sadrzaj")),
    cover_url: txt(formData.get("cover_url")),
    objavljen,
    objavljeno_at:
      objavljenoUnos ?? (objavljen ? new Date().toISOString() : null),
  };

  if (id) {
    await sb.from("vesti").update(podaci).eq("id", id);
  } else {
    await sb.from("vesti").insert(podaci);
  }
  revalidatePath("/admin/vesti");
  revalidatePath("/vesti");
  redirect("/admin/vesti");
}

export async function obrisiVest(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  if (!id) return;
  await sb.from("vesti").delete().eq("id", id);
  revalidatePath("/admin/vesti");
  revalidatePath("/vesti");
  redirect("/admin/vesti");
}
