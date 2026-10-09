import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProizvodjac, getSviSlugovi } from "@/lib/data";
import { MapaDestilerija } from "@/components/mapa-destilerija";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { fotoZaProizvodjaca, lokalnaFotoProizvodjaca } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const revalidate = 60;

const VELICINA_LABEL: Record<string, string> = {
  mala: "Mala destilerija",
  srednja: "Srednja destilerija",
  velika: "Velika destilerija",
};

export async function generateStaticParams() {
  const slugovi = await getSviSlugovi();
  return slugovi.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProizvodjac(slug);
  if (!p) return { title: "Proizvođač nije pronađen" };
  return {
    title: p.naziv,
    description: p.prica?.slice(0, 160) ?? `Profil destilerije ${p.naziv}.`,
  };
}

export default async function ProizvodjacPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProizvodjac(slug);
  if (!p) notFound();

  const lokacija = [p.selo, p.grad, p.region].filter(Boolean).join(", ");

  return (
    <div className="container-page py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FoodEstablishment",
          name: p.naziv,
          description: p.prica ?? undefined,
          url: p.slug ? `${SITE_URL}/proizvodjaci/${p.slug}` : undefined,
          image: p.foto_url ?? p.logo_url ?? undefined,
          address: {
            "@type": "PostalAddress",
            addressLocality: [p.selo, p.grad].filter(Boolean).join(", ") || undefined,
            addressRegion: p.region ?? undefined,
            addressCountry: "RS",
          },
          geo:
            typeof p.lat === "number" && typeof p.lng === "number"
              ? { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng }
              : undefined,
        }}
      />
      <Link
        href="/proizvodjaci"
        className="text-sm font-medium text-crvena hover:underline"
      >
        ← Svi proizvođači
      </Link>

      <Slika
        src={p.foto_url ?? lokalnaFotoProizvodjaca(p.slug) ?? fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
        fallback={fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
        alt={p.naziv}
        className="mt-6 h-64 w-full rounded-md border border-mastilo/20 object-cover sm:h-80"
      />

      {/* Header */}
      <header className="mt-6 border-b border-mastilo/20 pb-8">
        <div className="flex items-center gap-4">
          {p.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.logo_url}
              alt=""
              className="h-16 w-16 rounded-xl border border-mastilo/20 object-contain"
            />
          )}
          <h1 className="font-serif text-4xl font-bold text-mastilo">{p.naziv}</h1>
        </div>
        {lokacija && <p className="mt-3 text-mastilo-meko">{lokacija}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.porodica && (
            <span className="rounded-full bg-lan-svetli px-3 py-1 text-xs font-semibold text-mastilo-meko">
              Porodica {p.porodica}
            </span>
          )}
          {p.godina_osnivanja && (
            <span className="rounded-full bg-lan-tamni px-3 py-1 text-xs font-semibold text-crvena">
              Tradicija od {p.godina_osnivanja}.
            </span>
          )}
          {p.generacija && (
            <span className="rounded-full bg-lan-svetli px-3 py-1 text-xs font-semibold text-mastilo-meko">
              {p.generacija}. generacija
            </span>
          )}
          {p.velicina && (
            <span className="rounded-full bg-lan-svetli px-3 py-1 text-xs font-semibold text-mastilo-meko">
              {VELICINA_LABEL[p.velicina]}
            </span>
          )}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Priča */}
          {p.prica && (
            <section>
              <h2 className="font-serif text-2xl font-bold text-mastilo">Priča</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-mastilo-meko">
                {p.prica}
              </p>
            </section>
          )}

          {/* Proizvodi */}
          {p.proizvodi.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-bold text-mastilo">Rakije</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {p.proizvodi.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-md border border-mastilo/20 bg-lan-svetli p-5"
                  >
                    <h3 className="font-semibold text-mastilo">{r.naziv}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-crvena">
                      {[r.vrsta, r.sorta].filter(Boolean).join(" · ")}
                    </p>
                    {r.opis && (
                      <p className="mt-2 text-sm text-mastilo-meko">{r.opis}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nagrade */}
          {p.nagrade.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl font-bold text-mastilo">Nagrade</h2>
              <ul className="mt-4 space-y-2">
                {p.nagrade.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-center gap-3 rounded-xl border border-mastilo/20 bg-lan-svetli px-4 py-3 text-sm"
                  >
                    <span className="text-lg">
                      {n.nivo === "zlato" ? "🥇" : n.nivo === "srebro" ? "🥈" : "🥉"}
                    </span>
                    <span className="text-mastilo">
                      {n.naziv}
                      {n.godina ? ` (${n.godina})` : ""}
                      {n.medjunarodna ? " · međunarodna" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Bočna kolona */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {(p.sajt || p.grad) && (
            <div className="rounded-md border border-mastilo/20 bg-lan-svetli p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-mastilo-meko">
                Informacije
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {lokacija && (
                  <div>
                    <dt className="text-mastilo-meko">Lokacija</dt>
                    <dd className="font-medium text-mastilo">{lokacija}</dd>
                  </div>
                )}
                {p.sajt && (
                  <div>
                    <dt className="text-mastilo-meko">Sajt</dt>
                    <dd>
                      <a
                        href={p.sajt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-crvena hover:underline"
                      >
                        {p.sajt.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {typeof p.lat === "number" && typeof p.lng === "number" && (
            <MapaDestilerija proizvodjaci={[p]} />
          )}
        </aside>
      </div>
    </div>
  );
}
