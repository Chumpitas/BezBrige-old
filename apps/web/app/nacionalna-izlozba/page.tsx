import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Nacionalna izložba",
  description:
    "Nacionalna izložba „Rakija Srbije“ — Bajina Bašta i Sokolski kraj, Etnografski muzej u Beogradu 2026.",
};

export default function NacionalnaIzlozbaPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-krem">
        <Slika src={LOKALNE.podrumBurad} fallback={SLIKE.burad} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/85 to-plava/75" />
        <div className="container-page relative z-10 py-20">
          <div className="mb-3 flex items-center gap-3 font-sc text-sm font-bold tracking-[0.08em] text-bela">
            <span className="romb-marker" aria-hidden="true" />
            Etnografski muzej · Beograd · 2026.
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Nacionalna izložba „Rakija Srbije“
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-lan">
            Bajina Bašta i Sokolski kraj – 2026.
          </p>
        </div>
      </section>
      <div aria-hidden="true">
        <div className="h-1.5 bg-crvena" />
        <div className="vez-traka" />
      </div>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-5 leading-relaxed text-mastilo-meko">
          <p>
            Prva nacionalna izložba „Rakija Srbije“, u Etnografskom muzeju u
            Beogradu, posvećena je tradicionalnoj porodičnoj proizvodnji rakije u
            Bajinoj Bašti i Sokolskom kraju.
          </p>
          <p>
            Izložba predstavlja rakiju kao deo kulturnog identiteta Srbije —
            kroz predmete, fotografije, dokumente, porodične priče, običaje i
            znanja koja se prenose sa generacije na generaciju.
          </p>
          <p>
            Posebna pažnja posvećena je ulozi rakije u porodičnom i društvenom
            životu, tradicionalnim načinima proizvodnje, gostoprimstvu i
            običajima, ali i razvoju poznatih proizvođača ovog kraja.
          </p>
          <p>
            U okviru izložbe biće predstavljene i priče o porodici Bogdanović i
            Staroj Sokolovoj, BB Klekovači, kao i drugim proizvođačima i
            porodicama koje su doprinele razvoju rakijske tradicije Bajine Bašte.
            Izložba se oslanja i na naučna terenska istraživanja tradicionalne
            porodične proizvodnje rakije.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { s: LOKALNE.stariKazan1, f: SLIKE.kazan, c: "Kazani" },
              { s: LOKALNE.podrumBurad, f: SLIKE.burad, c: "Burad i podrum" },
              { s: SLIKE.muzej, f: SLIKE.izlozba, c: "Eksponati" },
              { s: LOKALNE.staraSokolovaCasa, f: SLIKE.case, c: "Rakija" },
            ].map((g) => (
              <figure key={g.c} className="overflow-hidden rounded-md border-2 border-mastilo bg-lan-tamni">
                <Slika src={g.s} fallback={g.f} alt={g.c} className="aspect-square w-full object-cover" />
                <figcaption className="border-t-2 border-mastilo bg-lan-svetli px-2 py-1.5 text-center text-xs font-semibold text-mastilo-meko">
                  {g.c}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="rounded-md border border-crvena bg-lan-svetli p-6 text-mastilo">
            Bajina Bašta je prvi korak u višegodišnjem predstavljanju rakijskih
            krajeva Srbije. Rakija je priča o zemlji, porodici, znanju, običajima
            i vremenu. <strong>To je priča o Srbiji.</strong>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
            <Link href="/bajina-basta" className="font-semibold text-crvena hover:underline">O Bajinoj Bašti →</Link>
            <Link href="/naucno-istrazivanje" className="font-semibold text-crvena hover:underline">Naučno istraživanje →</Link>
            <Link href="/proizvodjaci" className="font-semibold text-crvena hover:underline">Proizvođači →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
