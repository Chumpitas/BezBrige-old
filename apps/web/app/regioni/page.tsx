import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE, REGION_SLIKE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Rakijski krajevi Srbije",
  description:
    "Deset rakijskih regiona Srbije — tradicije, proizvođači, porodične priče i turistički potencijali.",
};

const REGIONI = [
  { br: 1, naziv: "Bajina Bašta i Zapadna Srbija", fokus: true, opis: "Zapadna Srbija jedno je od najprepoznatljivijih područja tradicionalne proizvodnje šljivovice. Bajina Bašta i Sokolski kraj čuvaju priče o porodičnim kazanima, šljivicima, generacijama proizvođača i destilerijama koje su lokalnu tradiciju učinile poznatom daleko izvan Srbije. Ovaj kraj je prvi fokus nacionalne izložbe „Rakija Srbije“." },
  { br: 2, naziv: "Šumadija i Pomoravlje", fokus: true, opis: "Šumadija i Pomoravlje povezuju bogatu voćarsku tradiciju, porodičnu proizvodnju i savremeni razvoj destilerija. Šljiva i druge voćne vrste, tradicionalni načini proizvodnje i nova znanja čine osnovu rakijskog identiteta ovog kraja. Šumadija je planirana kao naredni regionalni fokus projekta." },
  { br: 3, naziv: "Vojvodina", opis: "Vojvodina donosi posebnu raznovrsnost voćnih rakija, porodičnih tradicija i proizvodnih iskustava. Panonska ravnica, voćarstvo i kulturna raznolikost stanovništva oblikovali su specifičnu gastronomsku kulturu. Danas se tradicionalna znanja povezuju sa savremenom tehnologijom, kvalitetom i novim pristupima tržištu." },
  { br: 4, naziv: "Beograd", opis: "Beogradski region povezuje tradiciju voćarstva i proizvodnje rakije u prigradskim i seoskim područjima sa velikim gradskim tržištem, ugostiteljstvom i savremenim potrošačkim navikama. Posebne mogućnosti ovog regiona nalaze se u predstavljanju rakije kroz gastronomiju, turizam, edukaciju i savremene oblike promocije." },
  { br: 5, naziv: "Mačvansko-kolubarski region", opis: "Mačva i Kolubara pripadaju područjima sa dugom tradicijom voćarstva i proizvodnje rakije. Porodična domaćinstva, lokalni običaji i iskustva proizvođača predstavljaju važan deo identiteta ovog kraja. Savremene destilerije nastavljaju tradiciju i razvijaju nove mogućnosti za kvalitet, plasman i turističko predstavljanje." },
  { br: 6, naziv: "Moravičko-raški region", opis: "Moravičko-raški region objedinjuje različite prirodne uslove, voćarske tradicije i porodična znanja. Proizvodnja rakije deo je života brojnih seoskih domaćinstava, a razvoj savremenih destilerija stvara mogućnosti za povezivanje lokalnog nasleđa, kvaliteta proizvoda i turističke ponude." },
  { br: 7, naziv: "Rasinski okrug", opis: "Rasinski okrug prepoznatljiv je po razvijenoj poljoprivrednoj i gastronomskoj tradiciji. Uz vinogradarstvo i voćarstvo, proizvodnja voćnih rakija predstavlja deo nasleđa ovog kraja. Povezivanje proizvođača, tradicionalnih znanja i savremenih standarda otvara prostor za dalji razvoj rakijske proizvodnje." },
  { br: 8, naziv: "Južna Srbija", opis: "Južna Srbija čuva raznovrsne tradicije proizvodnje rakije, povezane sa porodičnim domaćinstvima, lokalnim voćnim vrstama i običajima. Različiti prirodni uslovi i kulturne osobenosti daju ovom regionu poseban identitet, dok savremeni proizvođači doprinose razvoju kvaliteta i prepoznatljivosti lokalnih proizvoda." },
  { br: 9, naziv: "Istočna Srbija", opis: "Istočna Srbija obuhvata područja bogata prirodnim i kulturnim nasleđem, u kojima je proizvodnja rakije deo porodične i seoske tradicije. Lokalna znanja, voćarstvo i običaji pružaju osnovu za predstavljanje rakije kao dela autentičnog turističkog i gastronomskog iskustva." },
  { br: 10, naziv: "Kosovo i Metohija", opis: "Kosovo i Metohija imaju bogato kulturno i poljoprivredno nasleđe, u kojem tradicionalna proizvodnja rakije zauzima svoje mesto. Porodični običaji, voćarstvo i lokalna znanja predstavljaju važan deo priče o ovom regionu. Projekat teži dokumentovanju i predstavljanju tog nasleđa kroz istraživanja, svedočanstva i priče proizvođača." },
];

export default function RegioniPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-krem">
        <Slika src={LOKALNE.naslovna} fallback={SLIKE.pejzaz} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/85 to-plava/75" />
        <div className="container-page relative z-10 py-20">
          <div className="mb-3 flex items-center gap-3 font-sc text-sm font-bold tracking-[0.08em] text-bela">
            <span className="romb-marker" aria-hidden="true" />
            rakijski krajevi
          </div>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Rakijski krajevi Srbije</h1>
          <p className="mt-4 max-w-2xl text-lg text-lan">
            Deset regiona – mnoštvo tradicija – jedna priča o Srbiji.
          </p>
        </div>
      </section>
      <div aria-hidden="true">
        <div className="h-1.5 bg-crvena" />
        <div className="vez-traka" />
      </div>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-mastilo-meko">
          <p>
            Rakija se proizvodi širom Srbije, ali svaki kraj ima svoje voćne
            vrste, prirodne uslove, znanja, običaje i porodične priče.
          </p>
          <p>
            Od šljivika zapadne Srbije i Šumadije, preko voćnjaka Vojvodine i
            Pomoravlja, do brdskih i planinskih područja južne i istočne Srbije,
            tradicija proizvodnje rakije deo je lokalnog kulturnog i privrednog
            identiteta.
          </p>
          <p>
            Nacionalni projekat „Rakija Srbije“ predstavlja deset rakijskih
            regiona, njihove proizvođače, porodične tradicije, karakteristične
            proizvode i turističke potencijale.
          </p>
          <p>
            Posebna pažnja posvećena je regionalnim udruženjima proizvođača i
            njihovoj saradnji u okviru Saveza proizvođača rakija Srbije.
          </p>
          <p>
            Cilj je da svaki region dobije svoj prostor za predstavljanje, a da
            zajedno pokažu bogatstvo i raznovrsnost srpske rakije.
          </p>
          <p className="font-serif text-xl italic text-mastilo">
            Rakija je priča o Srbiji – ali i o svakom njenom kraju.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {REGIONI.map((r, i) => (
            <div key={r.br} className="overflow-hidden rounded-md border border-mastilo/20 bg-lan-svetli">
              <div className="relative h-40">
                <Slika src={REGION_SLIKE[i % REGION_SLIKE.length]} fallback={SLIKE.pejzaz} alt={r.naziv} className="h-full w-full object-cover" />
                {r.fokus && (
                  <span className="absolute left-3 top-3 rounded-full bg-crvena px-3 py-1 text-xs font-semibold text-krem">
                    Fokus projekta
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-mastilo">
                  <span className="text-crvena">{r.br}.</span> {r.naziv}
                </h2>
                <p className="mt-2 text-sm text-mastilo-meko">{r.opis}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/proizvodjaci" className="font-semibold text-crvena hover:underline">
            Svi proizvođači →
          </Link>
        </p>
      </section>
    </>
  );
}
