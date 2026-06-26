import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { jeAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvPolje(v: unknown): string {
  const s = v == null ? "" : String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await jeAdmin())) {
    return NextResponse.json({ error: "Niste prijavljeni." }, { status: 401 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ error: "Nije podešeno." }, { status: 500 });
  }

  const { data } = await sb
    .from("prijave")
    .select(
      "created_at, naziv_destilerije, kontakt_ime, email, telefon, grad, bodovi_ukupno, kategorija, bodovi_tradicija, bodovi_proizvodnja, bodovi_nagrade, bodovi_brend, bodovi_organizacija, bodovi_vrednost, status",
    )
    .order("created_at", { ascending: false });

  const kolone = [
    "datum",
    "destilerija",
    "kontakt",
    "email",
    "telefon",
    "grad",
    "bodovi_ukupno",
    "kategorija",
    "tradicija",
    "proizvodnja",
    "nagrade",
    "brend",
    "organizacija",
    "vrednost",
    "status",
  ];

  const redovi = (data ?? []).map((r) =>
    [
      r.created_at,
      r.naziv_destilerije,
      r.kontakt_ime,
      r.email,
      r.telefon,
      r.grad,
      r.bodovi_ukupno,
      r.kategorija,
      r.bodovi_tradicija,
      r.bodovi_proizvodnja,
      r.bodovi_nagrade,
      r.bodovi_brend,
      r.bodovi_organizacija,
      r.bodovi_vrednost,
      r.status,
    ]
      .map(csvPolje)
      .join(","),
  );

  // BOM za ispravan prikaz ćirilice/latinice u Excelu
  const csv = "﻿" + [kolone.join(","), ...redovi].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="prijave.csv"',
    },
  });
}
