import type { Metadata } from "next";
import { PredlogForm } from "./PredlogForm";

export const metadata: Metadata = {
  title: "Pošaljite staru fotografiju ili predlog eksponata",
  description:
    "Pozivamo rakijaše, porodice i sve ljubitelje tradicije da podele stare fotografije i predlože stare predmete (kazane, alat) za izložbu o rakiji.",
};

export default function PosaljiPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sljiva-900 to-bakar-900 text-white">
        <div className="container-page py-16">
          <h1 className="max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            Sačuvajmo zajedno priču o rakiji
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sljiva-100/90">
            Pozivamo rakijaše, porodice i sve ljubitelje tradicije da podele{" "}
            <strong>stare fotografije</strong> proizvodnje rakije i predlože{" "}
            <strong>stare predmete za izložbu</strong> — kazane, alat, posude.
            Svaki kraj Srbije ima svoj tip kazana i svoju priču; zajedno pravimo
            najpotpuniju sliku tradicije.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <PredlogForm />
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-sljiva-900">
                Zašto je ovo važno
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-sljiva-600">
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
