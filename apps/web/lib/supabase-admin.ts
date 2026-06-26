import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Admin (server-only) Supabase klijent sa service_role ključem.
 * Zaobilazi RLS — koristi se ISKLJUČIVO na serveru (admin operacije).
 * Vraća null ako ključ nije podešen.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
