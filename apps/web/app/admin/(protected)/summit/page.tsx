import Link from "next/link";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";

export const metadata = { title: "Admin · Summit", robots: { index: false } };
export const dynamic = "force-dynamic";

interface Red {
  id: string;
  naslov: string;
  datum: string | null;
  sala: string | null;
  redosled: number;
  objavljen: boolean;
}

export default async function AdminSummit() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("paneli")
    .select("id, naslov, datum, sala, redosled, objavljen")
    .order("datum", { ascending: true, nullsFirst: false })
    .order("redosled", { ascending: true });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-sljiva-900">
          Summit — paneli ({redovi.length})
        </h1>
        <Link href="/admin/summit/novi" className="rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white hover:bg-bakar-700">
          + Dodaj
        </Link>
      </div>

      {redovi.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Još nema panela.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
                <th className="px-4 py-3">Naslov</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Sala</th>
                <th className="px-4 py-3">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {redovi.map((r) => (
                <tr key={r.id} className="border-b border-sljiva-100 last:border-0">
                  <td className="px-4 py-3 font-semibold text-sljiva-900">{r.naslov}</td>
                  <td className="px-4 py-3 text-sljiva-600">{r.datum ?? "—"}</td>
                  <td className="px-4 py-3 text-sljiva-600">{r.sala ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/summit/${r.id}/uredi`} className="rounded-lg border border-sljiva-300 px-3 py-1 text-xs font-semibold text-sljiva-700 hover:border-bakar-400">
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
