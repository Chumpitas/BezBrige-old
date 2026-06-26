import type { Metadata } from "next";
import { getProizvodjaci } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Proizvođači",
  description:
    "Direktorijum proizvođača rakije u Srbiji — destilerije, porodice i njihove priče.",
};

const VELICINA_LABEL: Record<string, string> = {
  mala: "Mala destilerija",
  srednja: "Srednja destilerija",
  velika: "Velika destilerija",
};

export const revalidate = 60;

export default async function ProizvodjaciPage() {
  const proizvodjaci = await getProizvodjaci();
  const povezano = isSupabaseConfigured();

  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">
        Proizvođači rakije
      </h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Direktorijum destilerija i porodica iz cele Srbije. Baza se postepeno
        proširuje ka cilju od preko 1000 proizvođača.
      </p>

      {!povezano && (
        <div className="mt-6 rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
          Prikazani su demo podaci. Nakon povezivanja baze, ovde se prikazuju svi
          objavljeni proizvođači iz direktorijuma.
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {proizvodjaci.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-serif text-xl font-bold text-sljiva-900">
                {p.naziv}
              </h2>
              {p.istaknut && (
                <span className="rounded-full bg-sljiva-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-bakar-200">
                  istaknuto
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-sljiva-500">
              {[
                p.porodica && `Porodica ${p.porodica}`,
                p.selo || p.grad,
                p.region,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.godina_osnivanja && (
                <span className="rounded-full bg-bakar-100 px-3 py-1 text-xs font-semibold text-bakar-700">
                  od {p.godina_osnivanja}.
                </span>
              )}
              {p.generacija && (
                <span className="rounded-full bg-sljiva-100 px-3 py-1 text-xs font-semibold text-sljiva-700">
                  {p.generacija}. generacija
                </span>
              )}
              {p.velicina && (
                <span className="rounded-full bg-sljiva-100 px-3 py-1 text-xs font-semibold text-sljiva-700">
                  {VELICINA_LABEL[p.velicina]}
                </span>
              )}
            </div>
            {p.prica && (
              <p className="mt-4 line-clamp-5 text-sm text-sljiva-600">{p.prica}</p>
            )}
            {p.sajt && (
              <a
                href={p.sajt}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-semibold text-bakar-700 hover:underline"
              >
                Sajt destilerije →
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
