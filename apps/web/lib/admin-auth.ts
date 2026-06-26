import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

type CookieZaPostavljanje = { name: string; value: string; options?: CookieOptions };

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function authConfigured(): boolean {
  return Boolean(URL && ANON);
}

/** SSR Supabase klijent vezan za kolačiće (za server akcije i komponente). */
export async function createSsrClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();
  return createServerClient(URL!, ANON!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet: CookieZaPostavljanje[]) => {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // U Server Component-ima set nije dozvoljen — sesiju osvežava middleware.
        }
      },
    },
  });
}

export async function getKorisnik() {
  if (!authConfigured()) return null;
  const sb = await createSsrClient();
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

/** Lista dozvoljenih admin emailova (prazno = svaki autentikovan korisnik). */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function jeAdmin(): Promise<boolean> {
  const u = await getKorisnik();
  if (!u) return false;
  const allow = adminEmails();
  if (allow.length === 0) return true;
  return Boolean(u.email && allow.includes(u.email.toLowerCase()));
}

export async function adminEmail(): Promise<string | null> {
  const u = await getKorisnik();
  return u?.email ?? null;
}
