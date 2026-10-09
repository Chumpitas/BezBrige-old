import type { Metadata } from "next";
import { VnrForm } from "./VnrForm";
import { SLIKE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Velika noć rakije",
  description:
    "Gala edutainment veče sa uručenjem nagrada i uparivanjem rakija sa jelima. Prijava gostiju.",
};

export default function VelikaNocRakijePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-krem">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SLIKE.velikaNoc} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/85 to-plava/75" />
        <div className="container-page relative z-10 py-20">
          <div className="mb-3 flex items-center gap-3 font-sc text-sm font-bold tracking-[0.08em] text-bela">
            <span className="romb-marker" aria-hidden="true" />
            Gala veče · Etnografski muzej
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            Velika noć rakije
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-lan">
            Ekskluzivno edutainment veče sa uručenjem nagrada i povelja, uz
            uparivanje rakija sa predjelima, glavnim jelima i kolačima.
          </p>
        </div>
      </section>
      <div aria-hidden="true">
        <div className="h-1.5 bg-crvena" />
        <div className="vez-traka" />
      </div>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-mastilo">
              Prijava gostiju
            </h2>
            <p className="mt-2 text-mastilo-meko">
              Popunite prijavu — kontaktiraćemo vas sa detaljima i potvrdom.
            </p>
            <div className="mt-8">
              <VnrForm />
            </div>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-md border-2 border-mastilo bg-lan-svetli">
              <Slika src={SLIKE.velikaNoc} fallback={SLIKE.gala} alt="Gala veče" className="h-44 w-full object-cover" />
              <div className="p-5 text-sm text-mastilo-meko">
                <p className="font-semibold text-mastilo">Šta vas čeka</p>
                <ul className="mt-2 space-y-1">
                  <li>• Uručenje nagrada i povelja</li>
                  <li>• Uparivanje rakija sa jelima</li>
                  <li>• Gala atmosfera u Etnografskom muzeju</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
