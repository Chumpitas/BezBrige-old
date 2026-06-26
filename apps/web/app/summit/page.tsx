import type { Metadata } from "next";
import { getPaneli } from "@/lib/data";
import type { Panel } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rakija Summit",
  description:
    "Program panela Rakija Summita — susret proizvođača, struke, medija i javnosti.",
};
export const revalidate = 60;

function datumLabel(s: string | null): string {
  if (!s) return "Raspored uskoro";
  try {
    return new Intl.DateTimeFormat("sr-RS", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date(s));
  } catch {
    return s;
  }
}

function vreme(od: string | null, doo: string | null): string {
  const f = (t: string | null) => (t ? t.slice(0, 5) : "");
  return [f(od), f(doo)].filter(Boolean).join("–");
}

export default async function SummitPage() {
  const paneli = await getPaneli();

  const grupe = new Map<string, Panel[]>();
  for (const p of paneli) {
    const k = p.datum ?? "tbd";
    if (!grupe.has(k)) grupe.set(k, []);
    grupe.get(k)!.push(p);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-sljiva-900 to-bakar-900 text-white">
        <div className="container-page py-16">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Rakija Summit</h1>
          <p className="mt-4 max-w-2xl text-lg text-sljiva-100/90">
            Centralno mesto susreta proizvođača, stručnjaka, medija i šire
            javnosti — paneli, promocije i degustacije.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {paneli.length === 0 ? (
          <p className="rounded-xl border border-sljiva-200 bg-white px-5 py-10 text-center text-sljiva-500">
            Program panela će uskoro biti objavljen.
          </p>
        ) : (
          <div className="space-y-12">
            {[...grupe.entries()].map(([datum, lista]) => (
              <section key={datum}>
                <h2 className="font-serif text-2xl font-bold text-bakar-700">
                  {datumLabel(datum === "tbd" ? null : datum)}
                </h2>
                <div className="mt-5 space-y-4">
                  {lista.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-sljiva-900">{p.naslov}</h3>
                        <span className="text-sm font-medium text-bakar-600">
                          {[vreme(p.vreme_od, p.vreme_do), p.sala].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                      {p.opis && <p className="mt-2 text-sm text-sljiva-600">{p.opis}</p>}
                      {p.govornici && (
                        <p className="mt-3 text-sm text-sljiva-500">
                          <span className="font-medium text-sljiva-700">Govornici:</span>{" "}
                          {p.govornici}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
