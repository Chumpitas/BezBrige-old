import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";

const BUCKET = "media";

export async function POST(req: Request) {
  if (!(await jeAdmin())) {
    return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY nije podešen." },
      { status: 500 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nedostaje fajl." }, { status: 400 });
  }
  const folder = String(form.get("folder") || "ostalo").replace(/[^a-z0-9-]/gi, "");

  const tacka = file.name.lastIndexOf(".");
  const ext = tacka >= 0 ? file.name.slice(tacka + 1).toLowerCase() : "bin";
  const baza = slugify(tacka >= 0 ? file.name.slice(0, tacka) : file.name) || "fajl";
  const path = `${folder}/${baza}-${randomUUID().slice(0, 8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
