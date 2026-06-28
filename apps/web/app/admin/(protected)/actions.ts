"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";

export async function promeniStatusPrijave(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await sb.from("prijave").update({ status }).eq("id", id);
  revalidatePath("/admin/prijave");
}

export async function promeniVnrStatus(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await sb.from("vnr_prijave").update({ status }).eq("id", id);
  revalidatePath("/admin/vnr");
}

export async function promeniPredlogStatus(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await sb.from("predlozi").update({ status }).eq("id", id);
  revalidatePath("/admin/predlozi");
}

export async function postaviObjavljen(formData: FormData) {
  if (!(await jeAdmin())) return;
  const sb = getSupabaseAdmin();
  if (!sb) return;
  const id = String(formData.get("id"));
  const objavljen = String(formData.get("objavljen")) === "true";
  await sb.from("proizvodjaci").update({ objavljen }).eq("id", id);
  revalidatePath("/admin/proizvodjaci");
  revalidatePath("/proizvodjaci");
}
