import Link from "next/link";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { postaviObjavljen } from "../actions";

export const metadata = { title: "Admin · Proizvođači", robots: { index: false } };
export const dynamic = "force-dynamic";

interface Red {
  id: string;
  naziv: string;
  slug: string | null;
  grad: string | null;
  region: string | null;
  velicina: string | null;
  objavljen: boolean;
}

export default async function AdminProizvodjaci() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> da bi
        upravljao proizvođačima.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("proizvodjaci")
    .select("id, naziv, slug, grad, region, velicina, objavljen")
    .order("naziv", { ascending: true });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-sljiva-900">
          Proizvođači ({redovi.length})
        </h1>
        <Link
          href="/admin/uvoz"
          className="rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white hover:bg-bakar-700"
        >
          Uvezi (CSV)
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
              <th className="px-4 py-3">Naziv</th>
              <th className="px-4 py-3">Mesto</th>
              <th className="px-4 py-3">Veličina</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {redovi.map((r) => (
              <tr key={r.id} className="border-b border-sljiva-100 last:border-0">
                <td className="px-4 py-3 font-semibold text-sljiva-900">
                  {r.naziv}
                  {r.slug && (
                    <Link
                      href={`/proizvodjaci/${r.slug}`}
                      className="ml-2 text-xs font-normal text-bakar-700 hover:underline"
                    >
                      ↗
                    </Link>
                  )}
                </td>
                <td className="px-4 py-3 text-sljiva-700">
                  {[r.grad, r.region].filter(Boolean).join(", ")}
                </td>
                <td className="px-4 py-3 text-sljiva-700">{r.velicina ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.objavljen
                        ? "bg-green-100 text-green-700"
                        : "bg-sljiva-100 text-sljiva-600"
                    }`}
                  >
                    {r.objavljen ? "Objavljen" : "Skriven"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={postaviObjavljen}>
                    <input type="hidden" name="id" value={r.id} />
                    <input
                      type="hidden"
                      name="objavljen"
                      value={(!r.objavljen).toString()}
                    />
                    <button className="rounded-lg bg-sljiva-900 px-3 py-1 text-xs font-semibold text-white hover:bg-sljiva-800">
                      {r.objavljen ? "Sakrij" : "Objavi"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
