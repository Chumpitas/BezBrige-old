import type { Metadata } from "next";
import { KATEGORIJE_INFO } from "@/lib/scoring";
import { PrijavaForm } from "./PrijavaForm";

export const metadata: Metadata = {
  title: "Prijava za učešće",
  description:
    "Prijavite svoju destileriju za učešće. Bodovanje po 6 kriterijuma i automatska kategorizacija.",
};

const KAT_REDOSLED = ["veliki_majstori", "cuvari_kvaliteta", "mladi_majstori"] as const;

export default function PrijavaPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">
        Prijava za učešće
      </h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Popunite podatke o destileriji — rezultat i kategorija se računaju
        trenutno, po zvaničnim kriterijumima projekta. Konačnu kategorizaciju
        potvrđuje komisija.
      </p>

      {/* Pregled kategorija */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {KAT_REDOSLED.map((k) => {
          const info = KATEGORIJE_INFO[k];
          return (
            <div
              key={k}
              className="rounded-2xl border border-sljiva-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-bakar-600">
                {info.raspon}
              </p>
              <h2 className="mt-1 font-serif text-lg font-bold text-sljiva-900">
                {info.naziv}
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-sljiva-600">
                {info.benefiti.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-bakar-500">•</span>
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
  );
}
