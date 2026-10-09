import type { Metadata } from "next";
import Link from "next/link";
import { getVesti } from "@/lib/data";
import { EtnoHero } from "@/components/etno-hero";
import { SLIKE, slikaZaVest } from "@/lib/slike";
import { Slika } from "@/components/slika";

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
            className="group flex flex-col overflow-hidden rounded-md border border-mastilo/20 bg-lan-svetli transition hover:border-crvena"
          >
            <div className="aspect-[16/9] overflow-hidden border-b border-mastilo/20 bg-lan-tamni">
              <Slika
                src={slikaZaVest(v.slug ?? v.id, v.cover_url)}
                fallback={SLIKE.izlozba}
                alt={v.naslov}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col p-6">
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
              <span className="mt-4 text-sm font-semibold text-crvena">Pročitaj →</span>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </>
  );
}
