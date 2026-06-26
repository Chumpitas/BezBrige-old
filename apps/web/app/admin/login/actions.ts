"use server";

import { redirect } from "next/navigation";
import { authConfigured, createSsrClient } from "@/lib/admin-auth";

export async function prijaviSe(_prev: string | null, formData: FormData) {
  if (!authConfigured()) {
    return "Supabase nije podešen (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY).";
  }
  const email = String(formData.get("email") || "").trim();
  const lozinka = String(formData.get("lozinka") || "");
  if (!email || !lozinka) return "Email i lozinka su obavezni.";

  const sb = await createSsrClient();
  const { error } = await sb.auth.signInWithPassword({
    email,
    password: lozinka,
  });
  if (error) return "Pogrešan email ili lozinka.";

  const od = String(formData.get("od") || "/admin");
  redirect(od.startsWith("/admin") ? od : "/admin");
}

export async function odjaviSe() {
  const sb = await createSsrClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
