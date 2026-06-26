import type { Metadata } from "next";
import { VnrForm } from "./VnrForm";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = {
  title: "Velika noć rakije",
  description:
    "Gala edutainment veče sa uručenjem nagrada i uparivanjem rakija sa jelima. Prijava gostiju.",
};

export default function VelikaNocRakijePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SLIKE.gala} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 via-sljiva-900/80 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bakar-200">
            Gala veče · Etnografski muzej
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            Velika noć rakije
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-sljiva-100/90">
            Ekskluzivno edutainment veče sa uručenjem nagrada i povelja, uz
            uparivanje rakija sa predjelima, glavnim jelima i kolačima.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-bold text-sljiva-900">
            Prijava gostiju
          </h2>
          <p className="mt-2 text-sljiva-600">
            Popunite prijavu — kontaktiraćemo vas sa detaljima i potvrdom.
          </p>
          <div className="mt-8">
            <VnrForm />
          </div>
        </div>
      </section>
    </>
  );
}
