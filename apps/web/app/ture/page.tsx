import type { Metadata } from "next";
import { getProizvodjaci } from "@/lib/data";
import { SLIKE } from "@/lib/slike";
import { Slika } from "@/components/slika";
import { LOKALNE } from "@/lib/slike";
import { TuraForm } from "./TuraForm";

export const metadata: Metadata = {
  title: "Degustacijske ture",
  description:
    "Rezervišite degustacijsku turu rakije u Bajinoj Bašti i Zapadnoj Srbiji — obiđite destilerije i postanite deo procesa proizvodnje.",
};
export const revalidate = 60;

const KORACI = [
  { ikona: "🚐", naslov: "Obilazak destilerija", opis: "Posetite porodične destilerije i upoznajte majstore rakije." },
  { ikona: "🔥", naslov: "Proces proizvodnje", opis: "Pogledajte pečenje rakije na tradicionalnom kazanu." },
  { ikona: "🥃", naslov: "Degustacija", opis: "Probajte vrhunske rakije uz uparivanje sa domaćom hranom." },
];

export default async function TurePage() {
  const proizvodjaci = await getProizvodjaci();
  const destilerije = proizvodjaci.map((p) => p.naziv);

  return (
    <>
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        <Slika src={LOKALNE.podrumBurad} fallback={SLIKE.burad} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bakar-200">
            Turistički doživljaj · Bajina Bašta i Zapadna Srbija
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            Degustacijske ture rakije
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sljiva-100/90">
            Budite aktivni učesnik u proizvodnji i degustaciji rakije — obiđite
            destilerije, upoznajte porodice i njihovu tradiciju, probajte
            nagrađivane rakije uz domaće specijalitete.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {KORACI.map((k) => (
            <div key={k.naslov} className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">{k.ikona}</div>
              <h3 className="mt-3 font-semibold text-sljiva-900">{k.naslov}</h3>
              <p className="mt-1 text-sm text-sljiva-600">{k.opis}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-sljiva-900">Rezervacija ture</h2>
            <p className="mt-2 text-sljiva-600">
              Pošaljite upit — kontaktiraćemo vas sa terminima, cenom i detaljima ture.
            </p>
            <div className="mt-6">
              <TuraForm destilerije={destilerije} />
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-sljiva-200 bg-white shadow-sm">
              <Slika src={LOKALNE.staraSokolovaCasa} fallback={SLIKE.case} alt="Degustacija rakije" className="h-44 w-full object-cover" />
              <div className="p-5 text-sm text-sljiva-600">
                <p className="font-semibold text-sljiva-900">Šta je uključeno</p>
                <ul className="mt-2 space-y-1">
                  <li>• Stručni vodič i prevoz po dogovoru</li>
                  <li>• Poseta 1–3 destilerije</li>
                  <li>• Degustacija i uparivanje sa hranom</li>
                  <li>• Priča o tradiciji i porodicama</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
