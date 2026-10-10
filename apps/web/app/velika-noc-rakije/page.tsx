import type { Metadata } from "next";
import { VnrForm } from "./VnrForm";
import { SLIKE } from "@/lib/slike";
import { Slika } from "@/components/slika";

export const metadata: Metadata = {
  title: "Velika noć rakije",
  description:
    "Veče tradicije, znanja, gastronomije i priznanja najboljima — gala edutainment veče nacionalnog projekta „Rakija Srbije”.",
};

export default function VelikaNocRakijePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-plava text-krem">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SLIKE.velikaNoc} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-plava/90 via-plava/85 to-plava/75" />
        <div className="container-page relative z-10 py-20">
          <div className="mb-3 flex items-center gap-3 font-sc text-sm font-bold tracking-[0.08em] text-bela">
            <span className="romb-marker" aria-hidden="true" />
            Gala veče · Etnografski muzej
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-bold sm:text-5xl">
            Velika noć rakije
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-xl italic text-bela">
            Veče tradicije, znanja, gastronomije i priznanja najboljima
          </p>
        </div>
      </section>
      <div aria-hidden="true">
        <div className="h-1.5 bg-crvena" />
        <div className="vez-traka" />
      </div>

      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-serif text-2xl font-semibold leading-snug text-mastilo">
            Rakija je priča o Srbiji. A ovo je veče posvećeno ljudima koji tu
            priču stvaraju.
          </p>
          <div className="mt-5 space-y-4 leading-relaxed text-mastilo-meko">
            <p>
              „Velika noć rakije“ je svečani društveni, kulturni i gastronomski
              događaj nacionalnog projekta „Rakija Srbije“, osmišljen kao
              jedinstveno veče koje povezuje tradiciju, savremenu kulturu rakije,
              vrhunsku gastronomiju i zabavu.
            </p>
            <p>
              Koncept večeri zasniva se na edutejnmentu (edutainment) – spoju
              edukacije i zabave, kroz koji gosti na zanimljiv i neposredan način
              upoznaju bogatstvo srpske rakije, njene proizvođače, porodične
              tradicije i kulturni značaj.
            </p>
          </div>

          {/* Šest gastronomskih doživljaja */}
          <div className="mt-12 flex items-center gap-3">
            <span className="romb-marker text-crvena" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-mastilo">
              Šest gastronomskih doživljaja – šest rakija
            </h2>
          </div>
          <figure className="mt-5 overflow-hidden rounded-md border-2 border-mastilo">
            <Slika src={SLIKE.nazdravlje} fallback={SLIKE.case} alt="Uparivanje rakije i hrane" className="h-60 w-full object-cover sm:h-72" />
          </figure>
          <div className="mt-5 space-y-4 leading-relaxed text-mastilo-meko">
            <p>
              Poseban deo programa čini jedinstveno gastronomsko iskustvo: šest
              pažljivo osmišljenih sledova hrane, od predjela do deserta, uparenih
              sa šest odabranih srpskih rakija.
            </p>
            <p>
              Kroz svako posluženje gosti će otkrivati kako se različite vrste i
              stilovi rakije mogu kombinovati sa hranom, na koji način njihove
              arome i ukusi dopunjuju gastronomski doživljaj i zašto srpska rakija
              zaslužuje značajnije mesto u savremenoj gastronomiji.
            </p>
            <p>
              Uparivanje će biti predstavljeno uz stručna objašnjenja o
              karakteristikama rakija, načinu proizvodnje, poreklu i kulturi
              degustacije.
            </p>
          </div>

          {/* Veče koje spaja ljude */}
          <div className="mt-12 flex items-center gap-3">
            <span className="romb-marker text-crvena" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-mastilo">
              Veče koje spaja ljude
            </h2>
          </div>
          <div className="mt-5 space-y-4 leading-relaxed text-mastilo-meko">
            <p>
              „Velika noć rakije“ okupiće vlasnike i rukovodioce vodećih
              destilerija, predstavnike državnih institucija i pokrovitelja
              projekta, ministre, direktore partnerskih organizacija,
              predstavnike naučne i akademske zajednice, profesore, istraživače,
              stručnjake za proizvodnju i kulturu rakije, kao i urednike i
              novinare najznačajnijih medija.
            </p>
            <p>
              Program će voditi dvoje poznatih glumaca koji su i sami proizvođači
              rakije, povezujući umetnost, preduzetništvo, porodičnu tradiciju i
              kulturu rakije.
            </p>
            <p>
              Kroz razgovore, kratke priče, filmske priloge i predstavljanje
              ljudi koji stoje iza poznatih rakija, gosti će upoznati ne samo
              proizvode već i vrednosti, znanja i iskustva koja ih čine posebnim.
            </p>
          </div>

          {/* Nagrade i priznanja */}
          <div className="mt-12 flex items-center gap-3">
            <span className="romb-marker text-crvena" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-mastilo">
              Nagrade i priznanja „Rakija Srbije“
            </h2>
          </div>
          <figure className="mt-5 overflow-hidden rounded-md border-2 border-mastilo">
            <Slika src={SLIKE.nagrade} fallback={SLIKE.gala} alt="Nagrade i priznanja" className="h-60 w-full object-cover sm:h-72" />
          </figure>
          <div className="mt-5 space-y-4 leading-relaxed text-mastilo-meko">
            <p>
              Jedan od centralnih trenutaka večeri biće svečana dodela nagrada i
              priznanja za izuzetan doprinos očuvanju, razvoju i promociji srpske
              rakije.
            </p>
            <p>
              Priznanja će biti dodeljena u šest kategorija, uz posebna specijalna
              priznanja za pojedince, porodice, destilerije i organizacije koje su
              ostavile značajan trag u istoriji i savremenom razvoju rakijske
              proizvodnje.
            </p>
            <p>
              Posebno mesto imaće priznanja najstarijim destilerijama, čuvarima
              porodične tradicije i legendama srpske rakije – ljudima koji su
              svojim znanjem, radom, vizijom i preduzetništvom postavili temelje
              današnje proizvodnje.
            </p>
            <p>
              Ovo neće biti samo nagrade za poslovne rezultate, već i priznanja za
              životno delo, nasleđe, znanje i doprinos kulturnom identitetu Srbije.
            </p>
          </div>

          {/* Više od svečanosti */}
          <div className="mt-12 flex items-center gap-3">
            <span className="romb-marker text-crvena" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-mastilo">
              Više od svečanosti
            </h2>
          </div>
          <div className="mt-5 space-y-4 leading-relaxed text-mastilo-meko">
            <p>
              „Velika noć rakije“ zamišljena je kao mesto susreta generacija,
              proizvođača, naučnika, umetnika, privrednika i predstavnika
              institucija.
            </p>
            <p>
              To je prilika da se oda priznanje prošlosti, predstave dostignuća
              sadašnjosti i podstakne zajednička vizija budućnosti srpske rakije.
            </p>
          </div>

          <div className="mt-8 rounded-md border border-crvena bg-lan-svetli p-6">
            <p className="font-serif text-lg font-semibold text-mastilo">
              Velika noć rakije – veče u kojem slavimo tradiciju, znanje, ljude i
              budućnost srpske rakije.
            </p>
          </div>
        </div>
      </section>

      {/* Prijava gostiju */}
      <section className="bg-lan-svetli">
        <div className="container-page py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl font-bold text-mastilo">
                Prijava gostiju
              </h2>
              <p className="mt-2 text-mastilo-meko">
                Popunite prijavu — kontaktiraćemo vas sa detaljima i potvrdom.
              </p>
              <div className="mt-8">
                <VnrForm />
              </div>
            </div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="overflow-hidden rounded-md border-2 border-mastilo bg-lan">
                <Slika src={SLIKE.velikaNoc} fallback={SLIKE.gala} alt="Gala veče" className="h-44 w-full object-cover" />
                <div className="p-5 text-sm text-mastilo-meko">
                  <p className="font-semibold text-mastilo">Šta vas čeka</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Šest sledova hrane uparenih sa šest rakija</li>
                    <li>• Dodela nagrada i priznanja u šest kategorija</li>
                    <li>• Gala atmosfera u Etnografskom muzeju</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
