import type { Metadata } from "next";
import Link from "next/link";
import { getVesti } from "@/lib/data";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE } from "@/lib/slike";

export const metadata: Metadata = {
  title: "Vesti",
  description: "Najnovije vesti o projektu i izložbi „Rakija – kulturno dobro Srbije”.",
};
export const revalidate = 60;

function datum(s: string | null): string {
  if (!s) return "";
  try {
    return new Intl.DateTimeFormat("sr-RS", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(s));
  } catch {
    return "";
  }
}

export default async function VestiPage() {
  const vesti = await getVesti();

  return (
    <>
      <EtnoHero
        slika={SLIKE.porodica}
        natpis="najave i priče"
        naslov="Vesti"
        opis="Pratite najave, izveštaje i priče vezane za projekat."
      />
      <div className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
        {vesti.map((v) => (
          <Link
            key={v.id}
            href={`/vesti/${v.slug}`}
            className="group flex flex-col rounded-md border border-mastilo/20 bg-lan-svetli p-6 transition hover:border-crvena "
          >
            {v.objavljeno_at && (
              <span className="text-xs font-medium uppercase tracking-wide text-crvena">
                {datum(v.objavljeno_at)}
              </span>
            )}
            <h2 className="mt-2 font-serif text-xl font-bold text-mastilo group-hover:text-crvena">
              {v.naslov}
            </h2>
            {v.sazetak && (
              <p className="mt-2 line-clamp-3 text-sm text-mastilo-meko">{v.sazetak}</p>
            )}
            <span className="mt-4 text-sm font-semibold text-crvena">
              Pročitaj →
            </span>
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}
