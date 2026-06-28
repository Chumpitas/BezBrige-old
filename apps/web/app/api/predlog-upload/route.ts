import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

const BUCKET = "media";
const MAX = 10 * 1024 * 1024; // 10 MB

// Javni upload (za predloge eksponata/starih fotografija). Samo slike.
export async function POST(req: Request) {
  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ error: "Upload trenutno nije dostupan." }, { status: 503 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nedostaje fajl." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Dozvoljene su samo slike." }, { status: 400 });
  }
  if (file.size > MAX) {
    return NextResponse.json({ error: "Slika je prevelika (max 10 MB)." }, { status: 400 });
  }

  const tacka = file.name.lastIndexOf(".");
  const ext = tacka >= 0 ? file.name.slice(tacka + 1).toLowerCase() : "jpg";
  const baza = slugify(tacka >= 0 ? file.name.slice(0, tacka) : file.name) || "foto";
  const path = `predlozi/${baza}-${randomUUID().slice(0, 8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
