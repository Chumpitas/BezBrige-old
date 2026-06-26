import { isAdminConfigured } from "@/lib/supabase-admin";
import { UvozForm } from "./UvozForm";

export const metadata = { title: "Admin · Uvoz", robots: { index: false } };

const KOLONE = [
  "naziv (obavezno)",
  "slug (opciono — generiše se iz naziva)",
  "porodica",
  "generacija",
  "godina_osnivanja",
  "selo",
  "grad",
  "region",
  "velicina (mala/srednja/velika)",
  "sajt",
  "lat",
  "lng",
  "objavljen (da/1/true)",
  "prica",
];

export default function AdminUvoz() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-sljiva-900">
        Uvoz proizvođača (CSV)
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-sljiva-600">
        Nalepi CSV sa zaglavljem u prvom redu. Podržane kolone (redosled
        nebitan):
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {KOLONE.map((k) => (
          <li
            key={k}
            className="rounded-full bg-sljiva-100 px-3 py-1 font-mono text-xs text-sljiva-700"
          >
            {k}
          </li>
        ))}
      </ul>

      {!isAdminConfigured() && (
        <div className="mt-6 rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
          <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> nije
          podešen — uvoz neće raditi dok ga ne dodaš.
        </div>
      )}

      <div className="mt-6">
        <UvozForm />
      </div>
    </div>
  );
}
