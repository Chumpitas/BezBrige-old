import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Vraća Supabase klijent ili `null` ako env varijable nisu podešene.
 * Time sajt radi i pre nego što se baza poveže (koristi se fallback sadržaj).
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
