import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "O projektu",
  description:
    "Nacionalni projekat „Rakija Srbije“ — istraživanje, očuvanje, razvoj i promocija kulture rakije kao dela nacionalnog nasleđa Srbije.",
};

const PARTNERI = [
  "Savez proizvođača rakija Srbije",
  "Privredna komora Srbije",
  "Etnografski muzej u Beogradu",
  "Etnografski institut SANU",
  "Filozofski fakultet Univerziteta u Beogradu — Odeljenje za etnologiju i antropologiju",
  "Udruženje somelijera Srbije",
];

export default function OProjektuPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-white">
        <Slika src={LOKALNE.stariKazan1} fallback={SLIKE.kazan} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 to-plava/75" />
        <div className="container-page relative z-10 py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bela">
            Nacionalni projekat
          </p>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Rakija Srbije</h1>
          <p className="mt-4 max-w-2xl text-lg text-lan">Rakija je priča o Srbiji.</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-5 leading-relaxed text-mastilo-meko">
          <p>
            Nacionalni projekat{" "}
            <strong>
              „Rakija Srbije — Tradicionalna porodična proizvodnja rakije u
              Srbiji kao deo kulturnog identiteta Srbije“
            </strong>{" "}
            posvećen je istraživanju, očuvanju, razvoju i promociji kulture
            rakije kao važnog dela nacionalnog nasleđa.
          </p>
          <p>
            Rakija u Srbiji nije samo proizvod od voća. Ona je deo porodične
            tradicije, običaja, gostoprimstva, proslava i svakodnevnog života. U
            njenoj proizvodnji sačuvana su znanja koja se prenose generacijama, a
            u njenim pričama prepoznaju se ljudi, porodice i krajevi Srbije.
          </p>
          <p>
            Projekat povezuje kulturu, nauku, obrazovanje, poljoprivredu,
            proizvođače, privredu, turizam i savremene komunikacije. Cilj mu je
            da se kulturna vrednost tradicionalne proizvodnje rakije istraži i
            predstavi, a da se istovremeno doprinese razvoju kvaliteta, znanja,
            turističkih potencijala i međunarodne prepoznatljivosti srpske
            rakije.
          </p>
          <p>
            Program obuhvata nacionalne izložbe, celogodišnji Forum „Rakija
            Srbije“, naučna istraživanja, stručne i obrazovne programe,
            publikacije, digitalni arhiv, mobilnu aplikaciju, virtuelni muzej i
            međunarodnu saradnju.
          </p>
          <p>
            Prva nacionalna izložba, posvećena Bajinoj Bašti i Sokolskom kraju,
            planirana je u Etnografskom muzeju u Beogradu 2026. godine. U narednim
            godinama projekat će predstavljati i druge rakijske krajeve Srbije.
          </p>

          <div className="rounded-md border border-crvena bg-lan-svetli p-6">
            <p className="font-serif text-lg font-semibold text-mastilo">Naša vizija</p>
            <p className="mt-2 text-mastilo">
              Da srpska rakija, čuvajući svoje kulturno i porodično nasleđe,
              postane jedan od prepoznatljivih simbola Srbije u svetu.
            </p>
          </div>
        </div>

        {/* Partneri i pokrovitelji */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-mastilo">Partneri projekta</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PARTNERI.map((p) => (
              <div key={p} className="rounded-xl border border-mastilo/20 bg-lan-svetli px-4 py-3 text-sm text-mastilo-meko">
                {p}
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-serif text-2xl font-bold text-mastilo">Pokrovitelji</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl border border-crvena bg-lan-svetli px-4 py-3 text-mastilo">
              <span className="font-semibold">Noseći pokrovitelj:</span> Ministarstvo kulture Republike Srbije
            </div>
            <div className="rounded-xl border border-mastilo/20 bg-lan-svetli px-4 py-3 text-mastilo-meko">
              <span className="font-semibold">Pokrovitelji:</span> Ministarstvo poljoprivrede, šumarstva i vodoprivrede Republike Srbije · Ministarstvo turizma i omladine Republike Srbije
            </div>
          </div>

          <div className="mt-10 rounded-md border border-mastilo/20 bg-lan-svetli p-6 text-sm text-mastilo-meko">
            <p><span className="font-semibold text-mastilo">Nosilac projekta:</span> Udruženje za kulturu rakije „Rakija Srbije“</p>
            <p className="mt-1"><span className="font-semibold text-mastilo">Autor i direktor nacionalnog projekta:</span> prof. dr Predrag Vujović</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/nacionalna-izlozba" className="font-semibold text-crvena hover:underline">Nacionalna izložba →</Link>
            <Link href="/forum" className="font-semibold text-crvena hover:underline">Forum „Rakija Srbije“ →</Link>
            <Link href="/regioni" className="font-semibold text-crvena hover:underline">Rakijski krajevi Srbije →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
