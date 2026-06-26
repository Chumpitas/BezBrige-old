import type { Metadata } from "next";
import { getPartneri } from "@/lib/data";
import type { TipPartnera } from "@/lib/types";

export const metadata: Metadata = { title: "Partneri" };
export const revalidate = 60;

const SEKCIJE: { tip: TipPartnera; naslov: string }[] = [
  { tip: "pokrovitelj", naslov: "Pokrovitelji" },
  { tip: "partner", naslov: "Partneri" },
  { tip: "medijski_partner", naslov: "Medijski partneri" },
];

export default async function PartneriPage() {
  const partneri = await getPartneri();

  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">
        Partneri i pokrovitelji
      </h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Projekat realizujemo uz podršku ključnih državnih institucija, strukovnih
        organizacija i nacionalnih medija.
      </p>

      <div className="mt-12 space-y-12">
        {SEKCIJE.map(({ tip, naslov }) => {
          const lista = partneri.filter((p) => p.tip === tip);
          if (!lista.length) return null;
          return (
            <section key={tip}>
              <h2 className="font-serif text-2xl font-bold text-bakar-700">
                {naslov}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center rounded-xl border border-sljiva-200 bg-white px-5 py-4 shadow-sm"
                  >
                    <span className="font-medium text-sljiva-800">{p.naziv}</span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
