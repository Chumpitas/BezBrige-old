import type { Metadata } from "next";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = { title: "O projektu" };

export default function OProjektuPage() {
  return (
    <div className="container-page py-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SLIKE.kazan}
        alt="Tradicionalno pečenje rakije"
        className="mb-10 h-64 w-full rounded-2xl object-cover shadow-sm sm:h-80"
      />
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">O projektu</h1>
      <div className="prose prose-sljiva mt-8 max-w-3xl text-sljiva-700">
        <p className="text-lg">
          Izložba <strong>„Tradicionalna porodična proizvodnja rakije u Srbiji i Bajinoj Bašti”</strong> nacionalni je projekat koji rakiju
          pozicionira kao jedinstveni simbol srpske kulture, tradicije i
          porodičnog preduzetništva.
        </p>
        <p>
          Realizuje se u <strong>Etnografskom muzeju u Beogradu</strong>, uz
          podršku ključnih državnih institucija i nacionalnih medija. Na izložbi
          učestvuju ministarstva Vlade Srbije (pokrovitelji), mediji, Etnografski
          institut, Etnografski muzej, Katedra za antropologiju i etnologiju
          Filozofskog fakulteta, Savez udruženja rakijaša Srbije, Udruženje
          somelijera Srbije i izabrane destilerije.
        </p>
        <p>
          Projekat se oslanja na <strong>naučno istraživanje</strong> tradicionalne
          porodične proizvodnje šljivovice, sa fokusom na porodice sa najdužom
          tradicijom — i predstavlja Bajinu Baštu kao kraj sa najstarijom
          tradicijom, porodičnim narativima i običajima.
        </p>
      </div>

      <h2 className="mt-14 font-serif text-2xl font-bold text-sljiva-900">
        Naučni i institucionalni okvir
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          "Etnografski muzej u Beogradu",
          "Etnografski institut",
          "Katedra za antropologiju i etnologiju Filozofskog fakulteta",
          "Savez udruženja rakijaša Srbije",
          "Udruženje somelijera Srbije",
          "Privredna komora Srbije",
        ].map((i) => (
          <li
            key={i}
            className="rounded-xl border border-sljiva-200 bg-white px-4 py-3 text-sm font-medium text-sljiva-700"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
