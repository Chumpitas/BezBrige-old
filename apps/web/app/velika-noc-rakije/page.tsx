import type { Metadata } from "next";
import { VnrForm } from "./VnrForm";

export const metadata: Metadata = {
  title: "Velika noć rakije",
  description:
    "Gala edutainment veče sa uručenjem nagrada i uparivanjem rakija sa jelima. Prijava gostiju.",
};

export default function VelikaNocRakijePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sljiva-900 via-sljiva-800 to-bakar-900 text-white">
        <div className="container-page py-20">
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
