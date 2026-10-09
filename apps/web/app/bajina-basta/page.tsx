import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Bajina Bašta",
  description:
    "Bajina Bašta — kraj najstarije tradicije rakije. Sokolski kraj, porodična proizvodnja šljivovice i rakija kao kulturno dobro.",
};

const DESTILERIJE = [
  { slug: "bb-kleka", naziv: "BB Kleka", oznaka: "Najstariji proizvođač rakije u Srbiji" },
  { slug: "stara-sokolova", naziv: "Stara Sokolova", oznaka: "Svetski brend i najveći izvoznik" },
  { slug: "stara-pesma", naziv: "Stara Pesma", oznaka: "Vrhunska porodična rakija" },
];

export default function BajinaBastaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-plava text-white">
        <Slika
          src={LOKALNE.naslovna}
          fallback={SLIKE.pejzaz}
          alt="Bajina Bašta"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/75 to-plava/75" />
        <div className="container-page relative z-10 py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bela">
            Sokolski kraj · Zapadna Srbija
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Bajina Bašta — kraj najstarije tradicije rakije
          </h1>
        </div>
      </section>

      {/* TEKST */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-mastilo-meko">
            U Sokolskom kraju raste najbolja šljiva za rakiju, ali tu žive i
            potomci onih koji su još početkom 19. veka krenuli da sade šljivu i
            proizvode rakiju. Danas, praktično, u selima oko Bajine Bašte nema
            porodice koja ne proizvodi svoju rakiju. To je postalo deo
            najznačajnijih porodičnih i kulturnih vrednosti.
          </p>

          {/* UNESCO callout */}
          <div className="mt-8 rounded-md border border-crvena bg-lan-svetli p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-crvena">
              Svetsko nasleđe
            </p>
            <p className="mt-2 leading-relaxed text-mastilo">
              UNESCO je pre nešto više od dve i po godine proglasio tradicionalnu
              proizvodnju rakije svetskim nematerijalnim kulturnim nasleđem — pa
              danas možemo da kažemo da je rakija <strong>kulturno dobro</strong>,
              a ne samo voćna rakija.
            </p>
          </div>

          {/* Citat */}
          <figure className="mt-10 border-l-4 border-crvena pl-6">
            <blockquote className="space-y-4 leading-relaxed text-mastilo-meko">
              <p>
                „Proizvodnja rakije je deo kulturnog identiteta Bajine Bašte,
                zato su Opština i Turistička organizacija Tara-Drina nosioci više
                aktivnosti u promociji ove kulturne vrednosti. Pripremili smo i
                kampanju <em>„Jedina i jedinstvena rakija“</em>, jer smo svesni
                da će taj naš običaj — porodična i kulturna vrednost — privući
                turiste da vide gde se proizvodi najbolja rakija.
              </p>
              <p>
                Srećom, danas imamo desetak vrlo značajnih destilerija u i oko
                Bajine Bašte. BB Kleka je najstariji proizvođač rakije u Srbiji.
                Stara Sokolova je danas svetski brend, ubedljivo najveći izvoznik
                rakije iz Srbije. Tu je i Stara Pesma, jednako kvalitetna rakija,
                ali i svi drugi proizvođači koji danas uspešno privređuju. I zato
                ne čudi da je naš kraj — a sada to pokazuje i ovo naučno
                istraživanje — kraj najduže porodične proizvodnje najkvalitetnije
                rakije u Srbiji.“
              </p>
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-mastilo">
              Milenko Ordagić
              <span className="block font-normal text-mastilo-meko">
                predsednik Opštine Bajina Bašta
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Destilerije */}
        <div className="mx-auto mt-14 max-w-4xl">
          <h2 className="text-center font-serif text-2xl font-bold text-mastilo">
            Destilerije Bajine Bašte
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {DESTILERIJE.map((d) => (
              <Link
                key={d.slug}
                href={`/proizvodjaci/${d.slug}`}
                className="rounded-md border border-mastilo/20 bg-lan-svetli p-5 text-center transition hover:border-crvena"
              >
                <p className="font-serif text-lg font-bold text-mastilo">{d.naziv}</p>
                <p className="mt-1 text-sm text-mastilo-meko">{d.oznaka}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-center">
            <Link href="/naucno-istrazivanje" className="font-semibold text-crvena hover:underline">
              Naučno istraživanje →
            </Link>
            <Link href="/proizvodjaci" className="font-semibold text-crvena hover:underline">
              Svi proizvođači →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
