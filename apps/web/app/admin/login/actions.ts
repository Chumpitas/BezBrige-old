"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminLozinkaPodesena,
  lozinkaTacna,
  napraviToken,
} from "@/lib/admin-auth";

export async function prijaviSe(_prev: string | null, formData: FormData) {
  if (!adminLozinkaPodesena()) {
    return "Admin lozinka nije podešena (ADMIN_LOZINKA).";
  }
  const lozinka = String(formData.get("lozinka") || "");
  if (!lozinkaTacna(lozinka)) {
    return "Pogrešna lozinka.";
  }
  const c = await cookies();
  c.set(ADMIN_COOKIE, napraviToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
  const od = String(formData.get("od") || "/admin");
  redirect(od.startsWith("/admin") ? od : "/admin");
}

export async function odjaviSe() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
