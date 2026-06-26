"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

export interface UvozRezultat {
  ok: boolean;
  poruka: string;
  uvezeno?: number;
  preskoceno?: number;
}

/** Jednostavan CSV parser (podržava navodnike i zareze unutar polja). */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    if (row.some((x) => x.trim() !== "")) rows.push(row);
  }
  return rows;
}

const VELICINE = new Set(["mala", "srednja", "velika"]);

export async function uveziProizvodjace(
  _prev: UvozRezultat | null,
  formData: FormData,
): Promise<UvozRezultat> {
  if (!(await jeAdmin())) return { ok: false, poruka: "Niste prijavljeni." };
  const sb = getSupabaseAdmin();
  if (!sb)
    return { ok: false, poruka: "SUPABASE_SERVICE_ROLE_KEY nije podešen." };

  const csv = String(formData.get("csv") || "").trim();
  if (!csv) return { ok: false, poruka: "Nalepi CSV sadržaj." };

  const rows = parseCSV(csv);
  if (rows.length < 2)
    return { ok: false, poruka: "CSV mora imati zaglavlje i bar jedan red." };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  const iNaziv = idx("naziv");
  if (iNaziv === -1)
    return { ok: false, poruka: "Zaglavlje mora sadržati kolonu 'naziv'." };

  const num = (v: string | undefined) => {
    const n = v ? Number(v.replace(",", ".")) : NaN;
    return Number.isFinite(n) ? n : null;
  };
  const txt = (v: string | undefined) => {
    const t = (v ?? "").trim();
    return t === "" ? null : t;
  };

  const redovi: Record<string, unknown>[] = [];
  let preskoceno = 0;
  for (const r of rows.slice(1)) {
    const naziv = txt(r[iNaziv]);
    if (!naziv) {
      preskoceno++;
      continue;
    }
    const velicinaRaw = txt(r[idx("velicina")])?.toLowerCase() ?? null;
    redovi.push({
      naziv,
      slug: txt(r[idx("slug")]) ?? slugify(naziv),
      porodica: txt(r[idx("porodica")]),
      generacija: num(r[idx("generacija")]),
      godina_osnivanja: num(r[idx("godina_osnivanja")]),
      selo: txt(r[idx("selo")]),
      grad: txt(r[idx("grad")]),
      region: txt(r[idx("region")]),
      velicina: velicinaRaw && VELICINE.has(velicinaRaw) ? velicinaRaw : null,
      prica: txt(r[idx("prica")]),
      sajt: txt(r[idx("sajt")]),
      lat: num(r[idx("lat")]),
      lng: num(r[idx("lng")]),
      objavljen: ["1", "true", "da"].includes(
        (txt(r[idx("objavljen")]) ?? "").toLowerCase(),
      ),
    });
  }

  if (redovi.length === 0)
    return { ok: false, poruka: "Nema validnih redova za uvoz.", preskoceno };

  const { error } = await sb
    .from("proizvodjaci")
    .upsert(redovi, { onConflict: "slug" });

  if (error)
    return { ok: false, poruka: `Greška pri uvozu: ${error.message}` };

  revalidatePath("/admin/proizvodjaci");
  revalidatePath("/proizvodjaci");
  return {
    ok: true,
    poruka: "Uvoz uspešan.",
    uvezeno: redovi.length,
    preskoceno,
  };
}
