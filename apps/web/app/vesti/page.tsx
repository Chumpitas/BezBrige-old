import type { Metadata } from "next";
import Link from "next/link";
import { getVesti } from "@/lib/data";

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
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl font-bold text-sljiva-900">Vesti</h1>
      <p className="mt-3 max-w-2xl text-sljiva-600">
        Pratite najave, izveštaje i priče vezane za projekat.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {vesti.map((v) => (
          <Link
            key={v.id}
            href={`/vesti/${v.slug}`}
            className="group flex flex-col rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm transition hover:border-bakar-300 hover:shadow-md"
          >
            {v.objavljeno_at && (
              <span className="text-xs font-medium uppercase tracking-wide text-bakar-600">
                {datum(v.objavljeno_at)}
              </span>
            )}
            <h2 className="mt-2 font-serif text-xl font-bold text-sljiva-900 group-hover:text-bakar-700">
              {v.naslov}
            </h2>
            {v.sazetak && (
              <p className="mt-2 line-clamp-3 text-sm text-sljiva-600">{v.sazetak}</p>
            )}
            <span className="mt-4 text-sm font-semibold text-bakar-700">
              Pročitaj →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
