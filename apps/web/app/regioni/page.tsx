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
  { br: 1, naziv: "Bajina Bašta i Zapadna Srbija", fokus: true, opis: "Jedno od najprepoznatljivijih područja tradicionalne proizvodnje šljivovice. Bajina Bašta i Sokolski kraj čuvaju priče o porodičnim kazanima, šljivicima, generacijama proizvođača i destilerijama poznatim daleko izvan Srbije. Prvi fokus nacionalne izložbe „Rakija Srbije“." },
  { br: 2, naziv: "Šumadija i Pomoravlje", fokus: true, opis: "Bogata voćarska tradicija, porodična proizvodnja i savremeni razvoj destilerija. Šljiva i druge voćne vrste, tradicionalni načini i nova znanja čine osnovu rakijskog identiteta. Planirana kao naredni regionalni fokus projekta (2027)." },
  { br: 3, naziv: "Vojvodina", opis: "Posebna raznovrsnost voćnih rakija, porodičnih tradicija i proizvodnih iskustava. Panonska ravnica, voćarstvo i kulturna raznolikost oblikovali su specifičnu gastronomsku kulturu; tradicionalna znanja povezuju se sa savremenom tehnologijom i kvalitetom." },
  { br: 4, naziv: "Beograd", opis: "Povezuje tradiciju voćarstva i proizvodnje rakije u prigradskim i seoskim područjima sa velikim gradskim tržištem, ugostiteljstvom i savremenim navikama. Posebne mogućnosti su u predstavljanju rakije kroz gastronomiju, turizam i edukaciju." },
  { br: 5, naziv: "Mačvansko-kolubarski region", opis: "Mačva i Kolubara — područja sa dugom tradicijom voćarstva i proizvodnje rakije. Porodična domaćinstva, lokalni običaji i iskustva proizvođača važan su deo identiteta; savremene destilerije razvijaju kvalitet, plasman i turističko predstavljanje." },
  { br: 6, naziv: "Moravičko-raški region", opis: "Objedinjuje različite prirodne uslove, voćarske tradicije i porodična znanja. Proizvodnja rakije deo je života brojnih seoskih domaćinstava, a razvoj destilerija povezuje lokalno nasleđe, kvalitet i turističku ponudu." },
  { br: 7, naziv: "Rasinski okrug", opis: "Prepoznatljiv po razvijenoj poljoprivrednoj i gastronomskoj tradiciji. Uz vinogradarstvo i voćarstvo, proizvodnja voćnih rakija deo je nasleđa; povezivanje proizvođača, tradicionalnih znanja i savremenih standarda otvara prostor za razvoj." },
  { br: 8, naziv: "Južna Srbija", opis: "Raznovrsne tradicije proizvodnje rakije povezane sa porodičnim domaćinstvima, lokalnim voćnim vrstama i običajima. Različiti prirodni uslovi i kulturne osobenosti daju regionu poseban identitet." },
  { br: 9, naziv: "Istočna Srbija", opis: "Područja bogata prirodnim i kulturnim nasleđem, u kojima je proizvodnja rakije deo porodične i seoske tradicije. Lokalna znanja, voćarstvo i običaji osnova su autentičnog turističkog i gastronomskog iskustva." },
  { br: 10, naziv: "Kosovo i Metohija", opis: "Bogato kulturno i poljoprivredno nasleđe u kojem tradicionalna proizvodnja rakije zauzima svoje mesto. Projekat teži dokumentovanju i predstavljanju tog nasleđa kroz istraživanja, svedočanstva i priče proizvođača." },
];


export default function RegioniPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        <Slika src={LOKALNE.naslovna} fallback={SLIKE.pejzaz} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Rakijski krajevi Srbije</h1>
          <p className="mt-4 max-w-2xl text-lg text-sljiva-100/90">
            Deset regiona — mnoštvo tradicija — jedna priča o Srbiji.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-sljiva-700">
          <p>
            Rakija se proizvodi širom Srbije, ali svaki kraj ima svoje voćne
            vrste, prirodne uslove, znanja, običaje i porodične priče — od
            šljivika zapadne Srbije i Šumadije, preko voćnjaka Vojvodine i
            Pomoravlja, do brdskih i planinskih područja juga i istoka.
          </p>
          <p>
            Nacionalni projekat „Rakija Srbije“ predstavlja deset rakijskih
            regiona, njihove proizvođače, porodične tradicije, karakteristične
            proizvode i turističke potencijale, uz saradnju regionalnih udruženja
            u okviru Saveza proizvođača rakija Srbije.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {REGIONI.map((r, i) => (
            <div key={r.br} className="overflow-hidden rounded-2xl border border-sljiva-200 bg-white shadow-sm">
              <div className="relative h-40">
                <Slika src={REGION_SLIKE[i % REGION_SLIKE.length]} fallback={SLIKE.pejzaz} alt={r.naziv} className="h-full w-full object-cover" />
                {r.fokus && (
                  <span className="absolute left-3 top-3 rounded-full bg-bakar-600 px-3 py-1 text-xs font-semibold text-white">
                    Fokus projekta
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-sljiva-900">
                  <span className="text-bakar-600">{r.br}.</span> {r.naziv}
                </h2>
                <p className="mt-2 text-sm text-sljiva-600">{r.opis}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link href="/proizvodjaci" className="font-semibold text-bakar-700 hover:underline">
            Svi proizvođači →
          </Link>
        </p>
      </section>
    </>
  );
}
