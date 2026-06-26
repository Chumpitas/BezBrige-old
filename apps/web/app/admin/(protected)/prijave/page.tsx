import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { promeniStatusPrijave } from "../actions";

export const metadata = { title: "Admin · Prijave", robots: { index: false } };
export const dynamic = "force-dynamic";

const KAT_LABEL: Record<string, string> = {
  veliki_majstori: "Veliki majstori",
  cuvari_kvaliteta: "Čuvari kvaliteta",
  mladi_majstori: "Mladi majstori",
};

const STATUS_LABEL: Record<string, string> = {
  nova: "Nova",
  u_obradi: "U obradi",
  prihvacena: "Prihvaćena",
  odbijena: "Odbijena",
};

const STATUS_BOJA: Record<string, string> = {
  nova: "bg-sljiva-100 text-sljiva-700",
  u_obradi: "bg-bakar-100 text-bakar-700",
  prihvacena: "bg-green-100 text-green-700",
  odbijena: "bg-red-100 text-red-700",
};

interface Prijava {
  id: string;
  naziv_destilerije: string;
  kontakt_ime: string;
  email: string;
  telefon: string | null;
  grad: string | null;
  bodovi_ukupno: number;
  kategorija: string | null;
  status: string;
  created_at: string;
}

export default async function AdminPrijave() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> da bi
        video prijave.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("prijave")
    .select(
      "id, naziv_destilerije, kontakt_ime, email, telefon, grad, bodovi_ukupno, kategorija, status, created_at",
    )
    .order("created_at", { ascending: false });
  const prijave = (data ?? []) as Prijava[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-sljiva-900">
          Prijave ({prijave.length})
        </h1>
        {prijave.length > 0 && (
          <a
            href="/api/admin/export/prijave"
            className="rounded-full border border-sljiva-300 px-4 py-2 text-sm font-semibold text-sljiva-700 hover:border-bakar-400"
          >
            ↓ Export CSV
          </a>
        )}
      </div>

      {prijave.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Još nema prijava.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sljiva-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sljiva-200 text-left text-xs uppercase tracking-wide text-sljiva-500">
                <th className="px-4 py-3">Destilerija</th>
                <th className="px-4 py-3">Kontakt</th>
                <th className="px-4 py-3">Bodovi</th>
                <th className="px-4 py-3">Kategorija</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {prijave.map((p) => (
                <tr key={p.id} className="border-b border-sljiva-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sljiva-900">
                      {p.naziv_destilerije}
                    </div>
                    <div className="text-xs text-sljiva-500">{p.grad}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sljiva-800">{p.kontakt_ime}</div>
                    <div className="text-xs text-sljiva-500">{p.email}</div>
                    {p.telefon && (
                      <div className="text-xs text-sljiva-500">{p.telefon}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-serif text-lg font-bold text-sljiva-900">
                    {p.bodovi_ukupno}
                  </td>
                  <td className="px-4 py-3 text-sljiva-700">
                    {p.kategorija ? KAT_LABEL[p.kategorija] : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        STATUS_BOJA[p.status] ?? ""
                      }`}
                    >
                      {STATUS_LABEL[p.status] ?? p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form action={promeniStatusPrijave} className="flex gap-2">
                      <input type="hidden" name="id" value={p.id} />
                      <select
                        name="status"
                        defaultValue={p.status}
                        className="rounded-lg border border-sljiva-200 px-2 py-1 text-xs"
                      >
                        {Object.entries(STATUS_LABEL).map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
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
