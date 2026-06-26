"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

const VELICINE = new Set(["mala", "srednja", "velika"]);

function num(v: FormDataEntryValue | null): number | null {
  const s = v ? String(v).trim().replace(",", ".") : "";
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
function txt(v: FormDataEntryValue | null): string | null {
  const t = v ? String(v).trim() : "";
  return t === "" ? null : t;
}

export async function sacuvajProizvodjaca(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;

  const id = txt(formData.get("id"));
  const naziv = txt(formData.get("naziv"));
  if (!naziv) return;

  const velicina = txt(formData.get("velicina"))?.toLowerCase() ?? null;
  const podaci = {
    naziv,
    slug: txt(formData.get("slug")) ?? slugify(naziv),
    porodica: txt(formData.get("porodica")),
    generacija: num(formData.get("generacija")),
    godina_osnivanja: num(formData.get("godina_osnivanja")),
    selo: txt(formData.get("selo")),
    grad: txt(formData.get("grad")),
    region: txt(formData.get("region")),
    velicina: velicina && VELICINE.has(velicina) ? velicina : null,
    sajt: txt(formData.get("sajt")),
    logo_url: txt(formData.get("logo_url")),
    foto_url: txt(formData.get("foto_url")),
    prica: txt(formData.get("prica")),
    lat: num(formData.get("lat")),
    lng: num(formData.get("lng")),
    objavljen: formData.get("objavljen") === "on",
    istaknut: formData.get("istaknut") === "on",
  };

  if (id) {
    await sb.from("proizvodjaci").update(podaci).eq("id", id);
  } else {
    await sb.from("proizvodjaci").insert(podaci);
  }
  revalidatePath("/admin/proizvodjaci");
  revalidatePath("/proizvodjaci");
  redirect("/admin/proizvodjaci");
}

export async function obrisiProizvodjaca(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = txt(formData.get("id"));
  if (!id) return;
  await sb.from("proizvodjaci").delete().eq("id", id);
  revalidatePath("/admin/proizvodjaci");
  revalidatePath("/proizvodjaci");
  redirect("/admin/proizvodjaci");
}
