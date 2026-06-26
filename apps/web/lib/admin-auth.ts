import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { ADMIN_COOKIE } from "./admin-cookie";

export { ADMIN_COOKIE };

function secret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "rakija-dev-secret"
  );
}

export function adminLozinkaPodesena(): boolean {
  return Boolean(process.env.ADMIN_LOZINKA);
}

function potpis(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Token oblika "ok.<hmac>" */
export function napraviToken(): string {
  const payload = "ok";
  return `${payload}.${potpis(payload)}`;
}

export function tokenValjan(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (payload !== "ok" || !sig) return false;
  const ocekivano = potpis(payload);
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(ocekivano, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function lozinkaTacna(unos: string): boolean {
  const tacna = process.env.ADMIN_LOZINKA || "";
  if (!tacna) return false;
  const a = Buffer.from(unos);
  const b = Buffer.from(tacna);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Da li je trenutni zahtev autentikovan kao admin. */
export async function jeAdmin(): Promise<boolean> {
  const c = await cookies();
  return tokenValjan(c.get(ADMIN_COOKIE)?.value);
}
