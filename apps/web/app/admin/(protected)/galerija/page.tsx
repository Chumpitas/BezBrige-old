import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { dodajMedij, obrisiMedij, toggleMedij } from "./crud";

export const metadata = { title: "Admin · Galerija", robots: { index: false } };
export const dynamic = "force-dynamic";

interface Red {
  id: string;
  tip: string;
  url: string;
  naslov: string | null;
  redosled: number;
  objavljen: boolean;
}

const inputCls =
  "rounded-lg border border-sljiva-200 px-3 py-2 text-sm outline-none focus:border-bakar-500";

export default async function AdminGalerija() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> da bi upravljao galerijom.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("galerija")
    .select("id, tip, url, naslov, redosled, objavljen")
    .order("redosled", { ascending: true });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-sljiva-900">Galerija</h1>

      {/* Dodavanje */}
      <form
        action={dodajMedij}
        className="mt-6 grid gap-3 rounded-2xl border border-sljiva-200 bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        <label className="text-sm">
          <span className="text-sljiva-600">Tip</span>
          <select name="tip" className={`mt-1 w-full ${inputCls}`}>
            <option value="slika">Slika</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-sljiva-600">Redosled</span>
          <input name="redosled" type="number" defaultValue={0} className={`mt-1 w-full ${inputCls}`} />
        </label>
        <label className="text-sm sm:col-span-2">
          <span className="text-sljiva-600">URL (slika ili YouTube/Vimeo/mp4) *</span>
          <input name="url" required placeholder="https://" className={`mt-1 w-full ${inputCls}`} />
        </label>
        <label className="text-sm">
          <span className="text-sljiva-600">Naslov</span>
          <input name="naslov" className={`mt-1 w-full ${inputCls}`} />
        </label>
        <label className="text-sm">
          <span className="text-sljiva-600">Opis</span>
          <input name="opis" className={`mt-1 w-full ${inputCls}`} />
        </label>
        <div className="sm:col-span-2">
          <button className="rounded-full bg-bakar-600 px-5 py-2 text-sm font-semibold text-white hover:bg-bakar-700">
            Dodaj u galeriju
          </button>
        </div>
      </form>

      {/* Lista */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Tip</th>
              <th className="px-4 py-3">Naslov / URL</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {redovi.map((r) => (
              <tr key={r.id} className="border-b border-sljiva-100 last:border-0">
                <td className="px-4 py-3 text-sljiva-500">{r.redosled}</td>
                <td className="px-4 py-3 text-sljiva-700">{r.tip}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-sljiva-900">{r.naslov ?? "—"}</div>
                  <div className="max-w-xs truncate text-xs text-sljiva-500">{r.url}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.objavljen ? "bg-green-100 text-green-700" : "bg-sljiva-100 text-sljiva-600"
                    }`}
                  >
                    {r.objavljen ? "Objavljen" : "Skriven"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <form action={toggleMedij}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="objavljen" value={(!r.objavljen).toString()} />
                      <button className="rounded-lg bg-sljiva-900 px-3 py-1 text-xs font-semibold text-white hover:bg-sljiva-800">
                        {r.objavljen ? "Sakrij" : "Objavi"}
                      </button>
                    </form>
                    <form action={obrisiMedij}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50">
                        Obriši
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
