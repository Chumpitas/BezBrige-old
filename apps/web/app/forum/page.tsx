import type { Metadata } from "next";
import Link from "next/link";
import { SLIKE, LOKALNE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Forum „Rakija Srbije“",
  description:
    "Forum „Rakija Srbije“ — 15 programskih događaja tokom 12 meseci: nacionalna konferencija, tematski forumi, međunarodni dijalozi i regionalni programi.",
};

const OBLASTI = [
  { n: "Kultura i identitet", o: "Tradicija, običaji, porodica, etnologija, antropologija i kulturno nasleđe." },
  { n: "Proizvodnja i kvalitet", o: "Voćarstvo, tehnologija, standardizacija, geografsko poreklo i savremena znanja." },
  { n: "Turizam", o: "Rakijske rute, destilerije, gastronomija, lokalni razvoj i turistički doživljaji." },
  { n: "Privreda i međunarodno tržište", o: "Brendiranje, distribucija, izvoz i internacionalizacija." },
  { n: "Međunarodna iskustva", o: "Modeli zemalja koje su svoja tradicionalna pića uspešno predstavile svetu." },
];

interface Dogadjaj {
  br: number;
  naslov: string;
  podnaslov?: string;
  opis: string;
  ucesnici?: string;
  kickoff?: boolean;
}

const CELINE: { oznaka: string; naslov: string; opis?: string; dogadjaji: Dogadjaj[] }[] = [
  {
    oznaka: "A",
    naslov: "Privredna komora Srbije — nacionalni i međunarodni deo",
    dogadjaji: [
      {
        br: 1,
        naslov: "Nacionalna konferencija „Rakija Srbije“",
        podnaslov: "Rakija kao nacionalna vrednost Srbije",
        opis: "Poludnevni centralni događaj i zvanično otvaranje Foruma. Uvodna obraćanja, dva panela („Rakija kao deo kulturnog identiteta Srbije“ i „Rakija Srbije — od tradicije do nacionalnog brenda“) i degustacija vodećih 10 rakija.",
        ucesnici: "Ministri kulture, poljoprivrede i turizma, predsednik PKS, direktor Etnografskog muzeja, direktor projekta, Savez proizvođača rakija Srbije.",
        kickoff: true,
      },
      { br: 2, naslov: "Kulturni forum", podnaslov: "Rakija kao kulturno nasleđe i identitet Srbije", opis: "Etnologija, antropologija, istorija, običaji, porodična tradicija, gostoprimstvo, rituali, nematerijalno kulturno nasleđe i UNESKO. Segment „Priča majstora“ — jedna porodica, jedna destilerija, jedna priča.", ucesnici: "Ministarstvo kulture, Etnografski muzej, Etnografski institut SANU, Filozofski fakultet." },
      { br: 3, naslov: "Stručni forum", podnaslov: "Od voćnjaka do vrhunske rakije", opis: "Voćarstvo, sirovina, fermentacija, destilacija, odležavanje, tehnologija, kvalitet, kontrola, standardizacija i budućnost proizvodnje.", ucesnici: "Ministarstvo poljoprivrede, fakulteti, tehnolozi, Savez i proizvođači. Uvodničar: dr Ivan Urošević." },
      { br: 4, naslov: "Turistički forum", podnaslov: "Rakija kao doživljaj Srbije", opis: "Rakijske rute, degustacioni centri, ruralni, gastronomski i kulturni turizam, posete destilerijama i povezivanje rakije sa drugim turističkim proizvodima Srbije.", ucesnici: "Ministarstvo turizma, Turistička organizacija Srbije, lokalne TO i destilerije." },
      { br: 5, naslov: "Poslovni forum", podnaslov: "Srpska rakija na svetskom tržištu", opis: "Tržište, izvoz, distribucija, HoReCa, pozicioniranje premium rakija, cena, ambalaža, brending i međunarodni sajmovi — kako od kvalitetnog proizvoda napraviti prepoznatljiv brend.", ucesnici: "PKS, Razvojna agencija Srbije, Fond za razvoj, destilerije, eksperti izvoznog marketinga." },
    ],
  },
  {
    oznaka: "B",
    naslov: "Međunarodni program „Svetska iskustva — srpska rakija“",
    dogadjaji: [
      { br: 6, naslov: "Francuski dijalog", podnaslov: "Od porekla do svetskog brenda: iskustva konjaka i armanjaka", opis: "Geografsko poreklo, apelacije, standardi, kontrola kvaliteta, međuprofesionalne organizacije, promocija i izvoz.", ucesnici: "Ambasada Francuske, PKS, INAO, BNIC, BNIA, Chambre de Commerce de Paris." },
      { br: 7, naslov: "Italijanski dijalog", podnaslov: "Tradicionalni proizvod kao deo gastronomije, turizma i identiteta", opis: "Grappa i drugi tradicionalni proizvodi: poreklo, dizajn, premiumizacija, porodični proizvođači, gastronomija, turizam i međunarodni marketing.", ucesnici: "Ambasada Italije, PKS, Camera di Commercio Italo-Serba, Confindustria." },
      { br: 8, naslov: "Svetski dijalog", podnaslov: "Kako nacionalno piće postaje globalni simbol zemlje", opis: "Irska/Škotska (viski), Meksiko (tekila/mezcal), Japan (sake / japanski viski) — šta Srbija može da nauči od zemalja koje su svoje piće pretvorile u globalni brend.", ucesnici: "Diplomatski i privredni predstavnici, specijalisti za viski, tekilu i sake." },
    ],
  },
  {
    oznaka: "C",
    naslov: "Etnografski muzej — „Rakija i njeni krajevi“",
    opis: "Manje državne politike, više ljudi, porodica, krajeva, istraživanja i priča.",
    dogadjaji: [
      { br: 9, naslov: "Bajina Bašta — Sokolski kraj", podnaslov: "Tradicija najduže porodične proizvodnje rakije", opis: "Istorija, porodice, običaji, šljiva, kulturni identitet kraja.", ucesnici: "Predsednik opštine Bajina Bašta, Radisav Bogdanović (Stara Sokolova), dr Nevena Milanović Minić." },
      { br: 10, naslov: "Bajina Bašta — Veliki majstori rakije", podnaslov: "Porodice koje su stvarale tradiciju", opis: "Porodične priče: generacije, znanje, nasleđe, razvoj. BB Klekovača, Stara Sokolova, Stara Pesma i druge destilerije.", ucesnici: "Direktor TO Tara-Drina, prvi ljudi destilerija, dr Bogdan Dražeta." },
      { br: 11, naslov: "Bajina Bašta — Rakija kao razvojna šansa", podnaslov: "Turizam, privreda, poljoprivreda i lokalna zajednica", opis: "Strategija, planovi i ulaganja Opštine i TO Tara-Drina.", ucesnici: "TO Tara-Drina, BB Klekovača, dr Predrag Vujović." },
      { br: 12, naslov: "Nauka o rakiji", podnaslov: "Šta nam govori terensko istraživanje?", opis: "Predstavljanje rezultata istraživanja tradicionalne porodične proizvodnje rakije u Bajinoj Bašti i diskusija antropologa, etnologa i proizvođača.", ucesnici: "Etnografski institut, dr Nevena Milanović Minić, dr Bogdan Dražeta, gosti iz inostranstva." },
      { br: 13, naslov: "Šumadija — Rakija u srcu Srbije", podnaslov: "Najava fokusa projekta za 2027.", opis: "Tradicija Šumadije, proizvođači, turistički potencijali i mogućnost da naredna nacionalna izložba bude posvećena Šumadiji." },
    ],
  },
  {
    oznaka: "D",
    naslov: "Rakija u budućnosti — završni događaji",
    dogadjaji: [
      { br: 14, naslov: "Porodica i generacije", podnaslov: "Ko će praviti srpsku rakiju 2050. godine?", opis: "Prenošenje znanja, porodično preduzetništvo, profesionalizacija, odnos tradicije i nove generacije.", ucesnici: "PKS, Savez proizvođača rakija, osnivači destilerija i njihovi naslednici." },
      { br: 15, naslov: "Završni forum", podnaslov: "Rakija Srbije 2030: od nacionalnog proizvoda do nacionalnog brenda", opis: "Iz završnog panela nastaje „Deklaracija Rakija Srbije 2030“ sa prioritetima: kvalitet, poreklo, nauka, turizam, izvoz, obrazovanje, kultura, digitalizacija, međunarodna promocija i održivost." },
    ],
  },
];

export default function ForumPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        <Slika src={LOKALNE.staraSokolovaCasa} fallback={SLIKE.case} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 to-bakar-900/80" />
        <div className="container-page relative z-10 py-20">
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">Forum „Rakija Srbije“</h1>
          <p className="mt-4 max-w-2xl text-lg text-sljiva-100/90">
            Znanje • Tradicija • Kvalitet • Identitet • Svet
          </p>
          <p className="mt-3 max-w-2xl text-sljiva-100/80">
            Centralni stručni i razvojni program projekta — 15 događaja tokom 12
            meseci, koji okupljaju institucije, nauku, proizvođače, privredu,
            turizam i međunarodne stručnjake.
          </p>
        </div>
      </section>

      {/* Programske oblasti */}
      <section className="container-page py-16">
        <h2 className="font-serif text-2xl font-bold text-sljiva-900">Pet programskih oblasti</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBLASTI.map((o) => (
            <div key={o.n} className="rounded-2xl border border-sljiva-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-bakar-700">{o.n}</h3>
              <p className="mt-1 text-sm text-sljiva-600">{o.o}</p>
            </div>
          ))}
        </div>

        {/* Program — 15 događaja */}
        <h2 className="mt-14 font-serif text-2xl font-bold text-sljiva-900">Program — 15 događaja</h2>
        <div className="mt-8 space-y-12">
          {CELINE.map((c) => (
            <section key={c.oznaka}>
              <div className="flex items-baseline gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sljiva-900 font-serif text-sm font-bold text-bakar-200">
                  {c.oznaka}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-sljiva-900">{c.naslov}</h3>
                  {c.opis && <p className="text-sm text-sljiva-500">{c.opis}</p>}
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {c.dogadjaji.map((d) => (
                  <div
                    key={d.br}
                    className={`rounded-2xl border bg-white p-6 shadow-sm ${d.kickoff ? "border-bakar-300 ring-1 ring-bakar-200" : "border-sljiva-200"}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bakar-100 font-serif text-lg font-bold text-bakar-700">
                        {d.br}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold text-sljiva-900">{d.naslov}</h4>
                          {d.kickoff && (
                            <span className="rounded-full bg-bakar-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              Prvi događaj · PKS
                            </span>
                          )}
                        </div>
                        {d.podnaslov && <p className="text-sm font-medium text-bakar-600">{d.podnaslov}</p>}
                        <p className="mt-2 text-sm text-sljiva-600">{d.opis}</p>
                        {d.ucesnici && (
                          <p className="mt-2 text-xs text-sljiva-500">
                            <span className="font-semibold text-sljiva-600">Učesnici:</span> {d.ucesnici}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-sljiva-500">
          Napomena: termini pojedinačnih događaja biće objavljeni naknadno. Za sada
          je potvrđen prvi događaj — Nacionalna konferencija u Privrednoj komori Srbije.
        </p>

        <div className="mt-6">
          <Link href="/prijava" className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white hover:bg-bakar-700">
            Prijavite svoju destileriju
          </Link>
        </div>
      </section>
    </>
  );
}
