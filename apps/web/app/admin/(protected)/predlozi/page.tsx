import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { promeniPredlogStatus } from "../actions";

export const metadata = { title: "Admin · Predlozi", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  nova: "Nov",
  prihvacena: "Prihvaćen",
  odbijena: "Odbijen",
};
const STATUS_BOJA: Record<string, string> = {
  nova: "bg-sljiva-100 text-sljiva-700",
  prihvacena: "bg-green-100 text-green-700",
  odbijena: "bg-red-100 text-red-700",
};

interface Red {
  id: string;
  tip: string;
  ime: string;
  email: string | null;
  telefon: string | null;
  mesto: string | null;
  opis: string | null;
  foto_url: string | null;
  status: string;
  created_at: string;
}

export default async function AdminPredlozi() {
  if (!isAdminConfigured()) {
    return (
      <div className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
      </div>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb
    .from("predlozi")
    .select("id, tip, ime, email, telefon, mesto, opis, foto_url, status, created_at")
    .order("created_at", { ascending: false });
  const redovi = (data ?? []) as Red[];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-sljiva-900">
        Predlozi javnosti ({redovi.length})
      </h1>
      <p className="mt-1 text-sm text-sljiva-500">Stare fotografije i predlozi eksponata.</p>

      {redovi.length === 0 ? (
        <p className="mt-6 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Još nema predloga.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {redovi.map((r) => (
            <div key={r.id} className="rounded-2xl border border-sljiva-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-sljiva-100 px-2.5 py-1 text-xs font-semibold text-sljiva-700">
                    {r.tip === "eksponat" ? "🪵 Eksponat" : "📷 Fotografija"}
                  </span>
                  <h2 className="mt-2 font-semibold text-sljiva-900">{r.ime}</h2>
                  <p className="text-xs text-sljiva-500">
                    {[r.mesto, r.email, r.telefon].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BOJA[r.status] ?? ""}`}>
                  {STATUS_LABEL[r.status] ?? r.status}
                </span>
              </div>
              {r.opis && <p className="mt-3 text-sm text-sljiva-600">{r.opis}</p>}
              {r.foto_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.foto_url} alt="" className="mt-3 h-40 w-full rounded-lg object-cover" />
              )}
              <form action={promeniPredlogStatus} className="mt-4 flex gap-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
