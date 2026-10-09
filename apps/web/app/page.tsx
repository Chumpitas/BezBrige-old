import Link from "next/link";
import { getProizvodjaci, getVesti } from "@/lib/data";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { SLIKE, LOKALNE, fotoZaProizvodjaca, lokalnaFotoProizvodjaca } from "@/lib/slike";
import { Slika } from "@/components/slika";
import { vrsteLabel } from "@/lib/vrste";

export const revalidate = 60;

const STUBOVI = [
  { br: "I", naslov: "Nacionalna izložba", opis: "Kazani, burad, alat i fotografije iz porodičnih podruma." },
  { br: "II", naslov: "Naučno istraživanje", opis: "Terenski zapisi i etnografska građa o tradicionalnim postupcima." },
  { br: "III", naslov: "Forum i Velika noć rakije", opis: "Susreti proizvođača, stručnjaka i javnosti." },
];

const PARTNERI_LINKOVI = [
  { href: "/partneri", naslov: "Partnerstvo", opis: "institucije, opštine, kompanije" },
  { href: "/galerija", naslov: "Press kit", opis: "saopštenja, fotografije, logotipi" },
  { href: "/kontakt", naslov: "Akreditacija", opis: "otvaranje, Forum, Velika noć" },
];

export default async function HomePage() {
  const [proizvodjaci, vesti] = await Promise.all([getProizvodjaci(), getVesti()]);
  const istaknuti = proizvodjaci.filter((p) => p.istaknut);
  const featured = [...istaknuti, ...proizvodjaci.filter((p) => !p.istaknut)].slice(0, 4);
  const poslednjeVesti = vesti.slice(0, 3);

  const datum = (s: string | null) => {
    if (!s) return "vest";
    try {
      return new Intl.DateTimeFormat("sr-RS", { day: "numeric", month: "long" }).format(new Date(s));
    } catch {
      return "vest";
    }
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Rakija Srbije — Nacionalna izložba",
          description: "Nacionalna izložba o tradicionalnoj porodičnoj proizvodnji rakije u Srbiji.",
          location: { "@type": "Place", name: "Etnografski muzej u Beogradu", address: { "@type": "PostalAddress", addressLocality: "Beograd", addressCountry: "RS" } },
          url: SITE_URL,
        }}
      />

      {/* a) HERO */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "min(86vh, 760px)" }}>
        <div className="absolute inset-0 bg-mastilo-meko">
          <Slika src={LOKALNE.naslovna} fallback={SLIKE.sljive} alt="" className="h-full w-full object-cover" />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(43,29,20,0.78) 0%, rgba(43,29,20,0.5) 60%, rgba(43,29,20,0.15) 100%)" }}
          aria-hidden="true"
        />
        <div className="container-page relative flex flex-col items-center gap-6 py-24 text-center text-krem">
          <div className="flex items-center gap-3.5 font-sc text-[15px] font-bold tracking-[0.08em] text-bela">
            <span className="h-2.5 w-2.5 rotate-45 bg-bela" aria-hidden="true" />
            nacionalna izložba 2026
            <span className="h-2.5 w-2.5 rotate-45 bg-bela" aria-hidden="true" />
          </div>
          <h1 className="max-w-[14ch] font-serif text-[clamp(48px,7vw,96px)] font-extrabold leading-[0.98] tracking-[-0.01em]">
            Rakija iz kućnog kazana
          </h1>
          <p className="font-serif text-[26px] italic text-bela">
            Bajina Bašta i Sokolski kraj — Etnografski muzej u Beogradu
          </p>
          <p className="max-w-[56ch] text-[19px] text-lan">
            Prva nacionalna izložba o tradicionalnoj porodičnoj proizvodnji rakije: zanat, alat i
            običaji koji se prenose s kolena na koleno.
          </p>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            <Link href="/nacionalna-izlozba" className="rounded bg-crvena px-[26px] py-[14px] font-bold text-krem hover:bg-[#a12932]">
              Pogledajte izložbu
            </Link>
            <Link href="/forum" className="rounded border-2 border-krem px-6 py-3 font-bold text-krem hover:bg-krem/10">
              Program Foruma
            </Link>
          </div>
        </div>
      </section>
      <div className="zupci-plava" aria-hidden="true" />

      {/* b) KOLAŽ */}
      <section className="container-page pb-20 pt-14">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
          <div className="relative min-h-[480px] border-2 border-mastilo bg-lan-tamni [grid-column:span_2]" style={{ outline: "2px dashed #B8303A", outlineOffset: "-10px" }}>
            <Slika src={LOKALNE.stariKazan2} fallback={SLIKE.kazan} alt="Domaćin uz kazan" className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-4 sm:grid-cols-1 sm:grid-rows-2">
            <div className="relative min-h-[180px] border-2 border-mastilo bg-lan-tamni">
              <Slika src={LOKALNE.podrumBurad} fallback={SLIKE.burad} alt="Burad u podrumu" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-1.5 border-2 border-mastilo bg-plava p-5 text-lan sm:p-[22px]">
              <span className="font-serif text-[clamp(28px,8vw,40px)] font-extrabold leading-none">15 događaja</span>
              <span className="text-[15px] sm:text-base">Forum uz izložbu: predavanja, degustacije, radionice pečenja.</span>
            </div>
          </div>
        </div>
      </section>

      {/* c) TRAKA — vez (lanac rombova) */}
      <div aria-hidden="true">
        <div className="h-1.5 bg-crvena" />
        <div className="vez-traka" />
      </div>

      {/* d) O PROJEKTU */}
      <section className="bg-lan-svetli">
        <div className="container-page grid items-center gap-14 py-[88px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="flex flex-col gap-[18px]">
            <span className="font-sc font-bold tracking-[0.08em] text-crvena">o projektu</span>
            <h2 className="font-serif text-[46px] font-extrabold leading-[1.05]">Zanat koji pamti kraj iz kog dolazi</h2>
            <p className="text-[19px] text-mastilo-meko">
              „Rakija Srbije“ je nacionalni projekat koji beleži porodičnu proizvodnju rakije — od berbe
              šljive do odležavanja u buradi. Svaka izložba posvećena je jednom kraju i ljudima koji u
              njemu i danas peku rakiju.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            {STUBOVI.map((s) => (
              <div key={s.br} className="flex gap-[18px] rounded-md border border-dashed border-crvena bg-lan p-5">
                <span className="font-serif text-[32px] font-extrabold leading-none text-crvena">{s.br}</span>
                <div className="flex flex-col">
                  <b className="font-serif text-[22px]">{s.naslov}</b>
                  <span className="text-mastilo-meko">{s.opis}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* e) PORODIČNI PODRUMI */}
      <section className="container-page flex flex-col gap-9 py-[88px]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-sc font-bold tracking-[0.08em] text-crvena">domaćini</span>
            <h2 className="font-serif text-[46px] font-extrabold leading-[1.05]">Porodični podrumi</h2>
          </div>
          <Link href="/proizvodjaci" className="rounded bg-plava px-[22px] py-3 font-bold text-lan hover:bg-[#0a3763]">
            Svi proizvođači
          </Link>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {featured.map((p) => (
            <Link
              key={p.id}
              href={p.slug ? `/proizvodjaci/${p.slug}` : "/proizvodjaci"}
              className="group flex flex-col overflow-hidden rounded-md border-2 border-mastilo bg-lan-svetli transition hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] border-b-2 border-mastilo bg-lan-tamni">
                <Slika
                  src={p.foto_url ?? lokalnaFotoProizvodjaca(p.slug) ?? fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
                  fallback={fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
                  alt={p.naziv}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1.5 p-[18px]">
                <span className="font-sc text-[14px] font-bold text-plava">
                  {[p.selo || p.grad, p.godina_osnivanja && `od ${p.godina_osnivanja}.`].filter(Boolean).join(" · ")}
                </span>
                <span className="font-serif text-[24px] font-extrabold leading-[1.1]">{p.naziv}</span>
                <span className="text-[15px] font-medium text-crvena">{vrsteLabel(p)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* f) ZA PARTNERE I MEDIJE */}
      <section className="bg-crvena text-krem">
        <div className="container-page grid gap-10 py-20" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
          <div className="flex flex-col gap-3.5">
            <span className="font-sc font-bold tracking-[0.08em] text-bela">za partnere i medije</span>
            <h2 className="font-serif text-[44px] font-extrabold leading-[1.05]">Budite deo priče o srpskoj rakiji</h2>
          </div>
          <div className="flex flex-col gap-3">
            {PARTNERI_LINKOVI.map((l) => (
              <Link
                key={l.naslov}
                href={l.href}
                className="flex items-center justify-between gap-4 border-b border-dashed border-bela py-4 text-[19px] text-krem hover:text-bela"
              >
                <span>
                  <b>{l.naslov}</b> — {l.opis}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* g) VESTI */}
      <section className="container-page flex flex-col gap-7 py-[88px]">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-[40px] font-extrabold">Vesti</h2>
          <Link href="/vesti" className="etno-link font-sc text-[15px] tracking-[0.04em]">
            sve vesti →
          </Link>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {poslednjeVesti.map((v) => (
            <Link key={v.id} href={`/vesti/${v.slug}`} className="flex flex-col gap-2 border-t-[3px] border-mastilo pt-4">
              <span className="font-sc font-bold text-crvena">{datum(v.objavljeno_at)}</span>
              <span className="font-serif text-[22px] font-bold leading-[1.2]">{v.naslov}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
