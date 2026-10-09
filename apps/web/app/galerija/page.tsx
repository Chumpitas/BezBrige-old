import type { Metadata } from "next";
import Link from "next/link";
import { getGalerija } from "@/lib/data";
import { videoEmbedUrl } from "@/lib/embed";
import { GALERIJA_PRAVE, SLIKE } from "@/lib/slike";
import { Slika } from "@/components/slika";
import { EtnoHero } from "@/components/etno-hero";

export const metadata: Metadata = {
  title: "Galerija",
  description: "Slike i video sa projekta „Rakija – kulturno dobro Srbije”.",
};
export const revalidate = 60;

export default async function GalerijaPage() {
  const mediji = await getGalerija();

  return (
    <>
      <EtnoHero
        slika={SLIKE.muzej}
        natpis="slike i video"
        naslov="Galerija"
        opis="Slike i video zapisi sa izložbe, panela i iz destilerija."
      />
      <div className="container-page py-16">
      {/* Poziv na akciju */}
      <div className="mt-8 flex flex-col items-start gap-4 rounded-md bg-crvena p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold">Imate staru fotografiju ili kazan?</h2>
          <p className="mt-1 text-sm text-white/90">
            Pošaljite nam stare fotografije proizvodnje rakije ili predložite stari predmet za izložbu.
          </p>
        </div>
        <Link
          href="/posalji"
          className="shrink-0 rounded-full bg-lan-svetli px-5 py-2.5 font-semibold text-crvena hover:bg-lan"
        >
          Pošalji predlog →
        </Link>
      </div>

      {mediji.length === 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALERIJA_PRAVE.map((m) => (
            <figure
              key={m.id}
              className="overflow-hidden rounded-md border border-mastilo/20 bg-lan-svetli"
            >
              <Slika
                src={m.src}
                fallback={m.fallback}
                alt={m.naslov}
                className="aspect-video w-full object-cover"
              />
              <figcaption className="p-4">
                <p className="font-semibold text-mastilo">{m.naslov}</p>
                <p className="mt-1 text-sm text-mastilo-meko">{m.opis}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediji.map((m) => {
            const embed = m.tip === "video" ? videoEmbedUrl(m.url) : null;
            return (
              <figure
                key={m.id}
                className="overflow-hidden rounded-md border border-mastilo/20 bg-lan-svetli"
              >
                {m.tip === "video" ? (
                  embed ? (
                    <div className="aspect-video">
                      <iframe
                        src={embed}
                        title={m.naslov ?? "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <video controls className="aspect-video w-full bg-black">
                      <source src={m.url} />
                    </video>
                  )
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.url}
                    alt={m.naslov ?? "Slika"}
                    className="aspect-video w-full object-cover"
                  />
                )}
                {(m.naslov || m.opis) && (
                  <figcaption className="p-4">
                    {m.naslov && (
                      <p className="font-semibold text-mastilo">{m.naslov}</p>
                    )}
                    {m.opis && (
                      <p className="mt-1 text-sm text-mastilo-meko">{m.opis}</p>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}
      </div>
    </>
  );
}
