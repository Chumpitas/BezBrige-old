import Link from "next/link";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";

export const metadata = { title: "Admin pregled", robots: { index: false } };
export const dynamic = "force-dynamic";

async function prebroj(tabela: string, filter?: { kol: string; vr: unknown }) {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  let q = sb.from(tabela).select("*", { count: "exact", head: true });
  if (filter) q = q.eq(filter.kol, filter.vr);
  const { count } = await q;
  return count ?? 0;
}

export default async function AdminDashboard() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> nije podešen.
        Dodaj ga (kao env varijablu) da bi admin čitao i upravljao podacima.
      </div>
    );
  }

  const [prijaveNove, prijaveUkupno, proizvodjaci, objavljeni] =
    await Promise.all([
      prebroj("prijave", { kol: "status", vr: "nova" }),
      prebroj("prijave"),
      prebroj("proizvodjaci"),
      prebroj("proizvodjaci", { kol: "objavljen", vr: true }),
    ]);

  const kartice = [
    { label: "Nove prijave", vr: prijaveNove, href: "/admin/prijave" },
    { label: "Ukupno prijava", vr: prijaveUkupno, href: "/admin/prijave" },
    { label: "Proizvođača", vr: proizvodjaci, href: "/admin/proizvodjaci" },
    { label: "Objavljenih", vr: objavljeni, href: "/admin/proizvodjaci" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-sljiva-900">Pregled</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kartice.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm transition hover:border-bakar-300"
          >
            <p className="text-sm text-sljiva-500">{k.label}</p>
            <p className="mt-2 font-serif text-4xl font-bold text-sljiva-900">
              {k.vr ?? "—"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
