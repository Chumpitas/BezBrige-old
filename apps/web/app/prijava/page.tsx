import type { Metadata } from "next";
import { KATEGORIJE_INFO } from "@/lib/scoring";
import { PrijavaForm } from "./PrijavaForm";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = {
  title: "Prijava za učešće",
  description:
    "Prijavite svoju destileriju za učešće. Bodovanje po 6 kriterijuma i automatska kategorizacija.",
};

const KAT_REDOSLED = ["veliki_majstori", "cuvari_kvaliteta", "mladi_majstori"] as const;

export default function PrijavaPage() {
  return (
    <>
      <EtnoHero
        slika={SLIKE.majstor}
        natpis="prijava destilerije"
        naslov="Prijava za učešće"
        opis="Popunite podatke o destileriji — rezultat i kategorija se računaju trenutno, po zvaničnim kriterijumima projekta. Konačnu kategorizaciju potvrđuje komisija."
      />
      <div className="container-page py-16">
      {/* Pregled kategorija */}
      <div className="grid gap-4 md:grid-cols-3">
        {KAT_REDOSLED.map((k) => {
          const info = KATEGORIJE_INFO[k];
          return (
            <div
              key={k}
              className="rounded-md border border-mastilo/20 bg-lan-svetli p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-crvena">
                {info.raspon}
              </p>
              <h2 className="mt-1 font-serif text-lg font-bold text-mastilo">
                {info.naziv}
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-mastilo-meko">
                {info.benefiti.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-crvena">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <PrijavaForm />
      </div>
      </div>
    </>
  );
}
