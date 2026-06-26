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

  const sb = getSupabaseAdmin()!;
  const [{ data: prijaveKat }, { data: regije }] = await Promise.all([
    sb.from("prijave").select("kategorija"),
    sb.from("proizvodjaci").select("region"),
  ]);

  const KAT_LABEL: Record<string, string> = {
    veliki_majstori: "Veliki majstori",
    cuvari_kvaliteta: "Čuvari kvaliteta",
    mladi_majstori: "Mladi majstori",
  };
  const poKategoriji = prebrojGrupe(
    (prijaveKat ?? []).map((r) => (r as { kategorija: string | null }).kategorija),
  );
  const poRegionu = prebrojGrupe(
    (regije ?? []).map((r) => (r as { region: string | null }).region),
  );

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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Statistika
          naslov="Prijave po kategoriji"
          stavke={poKategoriji.map(([k, n]) => [KAT_LABEL[k] ?? k, n])}
        />
        <Statistika naslov="Proizvođači po regionu" stavke={poRegionu} />
      </div>
    </div>
  );
}

function prebrojGrupe(vrednosti: (string | null)[]): [string, number][] {
  const m = new Map<string, number>();
  for (const v of vrednosti) {
    const k = v && v.trim() ? v : "—";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

function Statistika({
  naslov,
  stavke,
}: {
  naslov: string;
  stavke: [string, number][];
}) {
  const max = Math.max(1, ...stavke.map(([, n]) => n));
  return (
    <div className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-sljiva-900">{naslov}</h2>
      {stavke.length === 0 ? (
        <p className="mt-3 text-sm text-sljiva-500">Nema podataka.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {stavke.map(([label, n]) => (
            <div key={label}>
              <div className="flex justify-between text-sm">
                <span className="text-sljiva-600">{label}</span>
                <span className="font-medium text-sljiva-800">{n}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-sljiva-100">
                <div className="h-full bg-bakar-500" style={{ width: `${(n / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
