import type { Metadata } from "next";
import { getProgram } from "@/lib/data";
import type { ProgramStavka } from "@/lib/types";

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
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">Program</h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Događaj je organizovan kroz pet nivoa — od stalne izložbene postavke do
        gala večeri „Velika noć rakije”.
      </p>

      <div className="mt-12 space-y-14">
        {nivoi.map((nivo) => (
          <section key={nivo}>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-bakar-700">
                {nivo}
              </h2>
              <span className="h-px flex-1 bg-sljiva-200" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {grupe.get(nivo)!.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-sljiva-900">{s.naslov}</h3>
                  {s.lokacija && (
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-bakar-600">
                      {s.lokacija}
                    </p>
                  )}
                  {s.opis && (
                    <p className="mt-3 text-sm text-sljiva-600">{s.opis}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
