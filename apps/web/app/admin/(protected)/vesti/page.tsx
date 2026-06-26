import Link from "next/link";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";

export const metadata = { title: "Admin · Vesti", robots: { index: false } };
export const dynamic = "force-dynamic";

interface Red {
  id: string;
  naslov: string;
  slug: string;
  objavljen: boolean;
  objavljeno_at: string | null;
}

export default async function AdminVesti() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> da bi upravljao vestima.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("vesti")
    .select("id, naslov, slug, objavljen, objavljeno_at")
    .order("objavljeno_at", { ascending: false, nullsFirst: true });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-sljiva-900">
          Vesti ({redovi.length})
        </h1>
        <Link
          href="/admin/vesti/nova"
          className="rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white hover:bg-bakar-700"
        >
          + Dodaj
        </Link>
      </div>

      {redovi.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Još nema vesti.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
                <th className="px-4 py-3">Naslov</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {redovi.map((r) => (
                <tr key={r.id} className="border-b border-sljiva-100 last:border-0">
                  <td className="px-4 py-3 font-semibold text-sljiva-900">{r.naslov}</td>
                  <td className="px-4 py-3 text-sljiva-600">
                    {r.objavljeno_at ? r.objavljeno_at.slice(0, 10) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        r.objavljen ? "bg-green-100 text-green-700" : "bg-sljiva-100 text-sljiva-600"
                      }`}
                    >
                      {r.objavljen ? "Objavljeno" : "Skica"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/vesti/${r.id}/uredi`}
                      className="rounded-lg border border-sljiva-300 px-3 py-1 text-xs font-semibold text-sljiva-700 hover:border-bakar-400"
                    >
                      Uredi
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
