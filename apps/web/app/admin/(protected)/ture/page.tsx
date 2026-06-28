import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { promeniTuraStatus } from "../actions";

export const metadata = { title: "Admin · Ture", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  nova: "Nova",
  potvrdjena: "Potvrđena",
  otkazana: "Otkazana",
};
const STATUS_BOJA: Record<string, string> = {
  nova: "bg-sljiva-100 text-sljiva-700",
  potvrdjena: "bg-green-100 text-green-700",
  otkazana: "bg-red-100 text-red-700",
};

interface Red {
  id: string;
  ime: string;
  email: string;
  telefon: string | null;
  datum: string | null;
  broj_osoba: number;
  destilerija: string | null;
  poruka: string | null;
  status: string;
}

export default async function AdminTure() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("ture_rezervacije")
    .select("id, ime, email, telefon, datum, broj_osoba, destilerija, poruka, status")
    .order("created_at", { ascending: false });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-sljiva-900">
        Rezervacije tura ({redovi.length})
      </h1>

      {redovi.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Još nema rezervacija.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
                <th className="px-4 py-3">Gost</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Osoba</th>
                <th className="px-4 py-3">Destilerija</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {redovi.map((r) => (
                <tr key={r.id} className="border-b border-sljiva-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sljiva-900">{r.ime}</div>
                    <div className="text-xs text-sljiva-500">{r.email}{r.telefon ? " · " + r.telefon : ""}</div>
                    {r.poruka && <div className="mt-1 max-w-xs text-xs text-sljiva-500">{r.poruka}</div>}
                  </td>
                  <td className="px-4 py-3 text-sljiva-700">{r.datum ?? "—"}</td>
                  <td className="px-4 py-3 font-serif text-lg font-bold text-sljiva-900">{r.broj_osoba}</td>
                  <td className="px-4 py-3 text-sljiva-700">{r.destilerija ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BOJA[r.status] ?? ""}`}>
                      {STATUS_LABEL[r.status] ?? r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form action={promeniTuraStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} className="rounded-lg border border-sljiva-200 px-2 py-1 text-xs">
                        {Object.entries(STATUS_LABEL).map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </select>
                      <button className="rounded-lg bg-sljiva-900 px-3 py-1 text-xs font-semibold text-white hover:bg-sljiva-800">
                        Sačuvaj
                      </button>
                    </form>
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
