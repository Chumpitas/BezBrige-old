import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Naučno istraživanje",
  description:
    "Naučno istraživanje Katedre za antropologiju i etnologiju: tradicionalna porodična proizvodnja šljivovice kao deo kulturnog identiteta Bajine Bašte.",
};

export default function NaucnoIstrazivanjePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        <Slika
          src={LOKALNE.stariKazan1}
          fallback={SLIKE.kazan}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bakar-200">
            Katedra za antropologiju i etnologiju · Filozofski fakultet
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Naučno istraživanje
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sljiva-100/90">
            Porodična proizvodnja rakije — deo kulturnog identiteta Bajine Bašte
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-sljiva-700">
          <p>
            U septembru i oktobru 2025. realizovan je terenski rad naučnog
            istraživanja naučnika i istraživača Katedre za antropologiju i
            etnologiju Filozofskog fakulteta —{" "}
            <em>
              „Tradicionalna porodična proizvodnja šljivovice, kao deo kulturnog
              identiteta Bajine Bašte“
            </em>
            . Glavni cilj istraživanja je da se, na naučnim temeljima, ispitaju
            činjenice o tome kada i kako je počeo da se razvija običaj
            proizvodnje šljivovice i rakije, i zašto je baš u kraju Bajine Bašte
            toliko razvijen.
          </p>
          <p>
            Istraživanje prati kako je proizvodnja rakije (pre svega šljivovice)
            postala običaj i porodična tradicija — kako su se znanja, veštine,
            umeće i porodične vrednosti prenosili sa generacije na generaciju, i
            kako je taj običaj rastao (a ponegde i nestajao) iz generacije u
            generaciju.
          </p>

          <div className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-bakar-600">
              Istraživači
            </p>
            <p className="mt-2">
              <strong>Dr Nevena Milanović Minić</strong> i{" "}
              <strong>dr Bogdan Dražeta</strong> (Katedra za antropologiju i
              etnologiju) istakli su da će ispitanici biti članovi porodica koje
              najduže proizvode rakiju, pre svega šljivovicu.
            </p>
            <blockquote className="mt-4 border-l-4 border-bakar-500 pl-4 italic text-sljiva-700">
              „Jedan od ciljeva istraživanja je da se antropološkim metodama
              zabeleže narativi i priče o starim predmetima koji su služili —
              možda i danas služe — u proizvodnji rakije.“
              <span className="mt-1 block text-sm not-italic text-sljiva-500">
                — dr Nevena Milanović Minić
              </span>
            </blockquote>
          </div>

          <div className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
            <blockquote className="border-l-4 border-bakar-500 pl-4 italic text-sljiva-700">
              „Ovo istraživanje je deo šireg projekta čiji je krajnji cilj
              izložba o tradicionalnoj proizvodnji rakije u Srbiji, u
              Etnografskom muzeju u oktobru 2026. Na izložbi ćemo predstaviti
              mnoge narative i priče koje pronađemo tokom istraživanja — za svaki
              stari predmet koji će biti izložen u Muzeju.“
              <span className="mt-1 block text-sm not-italic text-sljiva-500">
                — dr Predrag Vujović, direktor projekta (P.R.A.)
              </span>
            </blockquote>
          </div>

          <p>
            Iako je u istoriji Sokolskog kraja bilo još pokušaja da se sa
            porodične proizvodnje krene u osvajanje tržišta, porodica Bogdanović
            iz Krivaje i njihov brend <strong>Stara Sokolova</strong> otišli su
            najdalje. U trideset i jednoj godini postojanja osvojili su sve
            moguće nagrade — a pre manje od mesec dana i četiri najveće nagrade
            na američkom tržištu (USA Ratings 2025), uključujući nagradu za
            najbolju voćnu rakiju.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Link
            href="/proizvodjaci/stara-sokolova"
            className="font-semibold text-bakar-700 hover:underline"
          >
            Pročitajte priču o Staroj Sokolovi →
          </Link>
        </div>
      </section>
    </>
  );
}
