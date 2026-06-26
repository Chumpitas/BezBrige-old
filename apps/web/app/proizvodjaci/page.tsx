import type { Metadata } from "next";
import { getProizvodjaci } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Direktorijum } from "@/components/direktorijum";
import { MapaDestilerija } from "@/components/mapa-destilerija";

export const metadata: Metadata = {
  title: "Proizvođači",
  description:
    "Direktorijum proizvođača rakije u Srbiji — destilerije, porodice i njihove priče.",
};

export const revalidate = 60;

export default async function ProizvodjaciPage() {
  const proizvodjaci = await getProizvodjaci();
  const povezano = isSupabaseConfigured();

  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">
        Proizvođači rakije
      </h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Direktorijum destilerija i porodica iz cele Srbije. Baza se postepeno
        proširuje ka cilju od preko 1000 proizvođača.
      </p>

      {!povezano && (
        <div className="mt-6 rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
          Prikazani su demo podaci. Nakon povezivanja baze, ovde se prikazuju svi
          objavljeni proizvođači iz direktorijuma.
        </div>
      )}

      {/* Mapa destilerija */}
      <section className="mt-10">
        <h2 className="mb-4 font-serif text-2xl font-bold text-sljiva-900">
          Mapa destilerija
        </h2>
        <MapaDestilerija proizvodjaci={proizvodjaci} />
      </section>

      {/* Direktorijum sa filterima */}
      <section className="mt-12">
        <Direktorijum proizvodjaci={proizvodjaci} />
      </section>
    </div>
  );
}
