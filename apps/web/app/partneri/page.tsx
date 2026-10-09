import type { Metadata } from "next";
import { getPartneri } from "@/lib/data";
import type { TipPartnera } from "@/lib/types";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

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
    <>
      <EtnoHero
        slika={SLIKE.nagrade}
        natpis="podrška projektu"
        naslov="Partneri i pokrovitelji"
        opis="Projekat realizujemo uz podršku ključnih državnih institucija, strukovnih organizacija i nacionalnih medija."
      />
      <div className="container-page py-16">
        <div className="space-y-12">
        {SEKCIJE.map(({ tip, naslov }) => {
          const lista = partneri.filter((p) => p.tip === tip);
          if (!lista.length) return null;
          return (
            <section key={tip}>
              <h2 className="font-serif text-2xl font-bold text-crvena">
                {naslov}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center rounded-md border border-mastilo/20 bg-lan-svetli px-5 py-4"
                  >
                    <span className="font-medium text-mastilo">{p.naziv}</span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        </div>
      </div>
    </>
  );
}
