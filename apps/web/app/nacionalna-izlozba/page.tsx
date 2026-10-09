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
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        <Slika src={LOKALNE.podrumBurad} fallback={SLIKE.burad} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bakar-200">
            Etnografski muzej · Beograd · 2026.
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Nacionalna izložba „Rakija Srbije“
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sljiva-100/90">
            Bajina Bašta i Sokolski kraj
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-5 leading-relaxed text-sljiva-700">
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

          <div className="rounded-2xl border border-bakar-200 bg-bakar-50 p-6 text-sljiva-800">
            Bajina Bašta je prvi korak u višegodišnjem predstavljanju rakijskih
            krajeva Srbije. Rakija je priča o zemlji, porodici, znanju, običajima
            i vremenu. <strong>To je priča o Srbiji.</strong>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
            <Link href="/bajina-basta" className="font-semibold text-bakar-700 hover:underline">O Bajinoj Bašti →</Link>
            <Link href="/naucno-istrazivanje" className="font-semibold text-bakar-700 hover:underline">Naučno istraživanje →</Link>
            <Link href="/proizvodjaci" className="font-semibold text-bakar-700 hover:underline">Proizvođači →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
