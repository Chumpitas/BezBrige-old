import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSveVestiSlugove, getVest } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugovi = await getSveVestiSlugove();
  return slugovi.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVest(slug);
  if (!v) return { title: "Vest nije pronađena" };
  return { title: v.naslov, description: v.sazetak ?? undefined };
}

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

export default async function VestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = await getVest(slug);
  if (!v) notFound();

  return (
    <article className="container-page max-w-3xl py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: v.naslov,
          description: v.sazetak ?? undefined,
          image: v.cover_url ?? undefined,
          datePublished: v.objavljeno_at ?? undefined,
          url: `${SITE_URL}/vesti/${v.slug}`,
        }}
      />
      <Link href="/vesti" className="text-sm font-medium text-bakar-700 hover:underline">
        ← Sve vesti
      </Link>
      {v.objavljeno_at && (
        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-bakar-600">
          {datum(v.objavljeno_at)}
        </p>
      )}
      <h1 className="mt-2 font-serif text-4xl font-bold text-sljiva-900">
        {v.naslov}
      </h1>
      {v.sazetak && (
        <p className="mt-4 text-lg text-sljiva-600">{v.sazetak}</p>
      )}
      {v.sadrzaj && (
        <div className="mt-8 whitespace-pre-line leading-relaxed text-sljiva-700">
          {v.sadrzaj}
        </div>
      )}
    </article>
  );
}
