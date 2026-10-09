import type { Metadata } from "next";
import { getProgram } from "@/lib/data";
import type { ProgramStavka } from "@/lib/types";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = { title: "Program" };
export const revalidate = 60;

const REDOSLED_NIVOA = [
  "Izložba",
  "Rakija Summit",
  "Tematski dani",
  "Medijska komponenta",
  "Velika noć rakije",
];

export default async function ProgramPage() {
  const stavke = await getProgram();
  const grupe = new Map<string, ProgramStavka[]>();
  for (const s of stavke) {
    const k = s.nivo ?? "Ostalo";
    if (!grupe.has(k)) grupe.set(k, []);
    grupe.get(k)!.push(s);
  }
  const nivoi = [...grupe.keys()].sort(
    (a, b) => REDOSLED_NIVOA.indexOf(a) - REDOSLED_NIVOA.indexOf(b),
  );

  return (
    <>
      <EtnoHero
        slika={SLIKE.izlozba}
        natpis="pet nivoa događaja"
        naslov="Program"
        opis="Događaj je organizovan kroz pet nivoa — od stalne izložbene postavke do gala večeri „Velika noć rakije”."
      />
      <div className="container-page py-16 space-y-14">
        {nivoi.map((nivo) => (
          <section key={nivo}>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-crvena">
                {nivo}
              </h2>
              <span className="h-px flex-1 bg-mastilo/20" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {grupe.get(nivo)!.map((s) => (
                <div
                  key={s.id}
                  className="rounded-md border border-mastilo/20 bg-lan-svetli p-6"
                >
                  <h3 className="font-semibold text-mastilo">{s.naslov}</h3>
                  {s.lokacija && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-crvena">
                      {s.lokacija}
                    </p>
                  )}
                  {s.opis && (
                    <p className="mt-3 text-sm text-mastilo-meko">{s.opis}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
