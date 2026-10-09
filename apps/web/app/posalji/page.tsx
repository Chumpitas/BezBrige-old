import type { Metadata } from "next";
import { PredlogForm } from "./PredlogForm";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = {
  title: "Pošaljite staru fotografiju ili predlog eksponata",
  description:
    "Pozivamo rakijaše, porodice i sve ljubitelje tradicije da podele stare fotografije i predlože stare predmete (kazane, alat) za izložbu o rakiji.",
};

export default function PosaljiPage() {
  return (
    <>
      <EtnoHero
        slika={SLIKE.muzej}
        natpis="poziv zajednici"
        naslov="Sačuvajmo zajedno priču o rakiji"
        opis="Podelite stare fotografije proizvodnje rakije i predložite stare predmete za izložbu — kazane, alat, posude. Svaki kraj Srbije ima svoj tip kazana i svoju priču; zajedno pravimo najpotpuniju sliku tradicije."
      />

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <PredlogForm />
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-mastilo/20 bg-lan-svetli p-6">
              <h2 className="font-serif text-lg font-bold text-mastilo">
                Zašto je ovo važno
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-mastilo-meko">
                <li>• Stare fotografije čuvaju nematerijalnu baštinu.</li>
                <li>• Izabrani predmeti mogu postati eksponati na izložbi.</li>
                <li>• Beležimo različite tipove kazana iz raznih krajeva Srbije.</li>
                <li>• Najbolji prilozi biće posebno istaknuti i potpisani.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
