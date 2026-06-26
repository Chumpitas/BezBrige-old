import Link from "next/link";
import { getPartneri, getProizvodjaci } from "@/lib/data";
import { getLang, tFactory } from "@/lib/i18n";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { SLIKE, fotoZaProizvodjaca } from "@/lib/slike";

export const revalidate = 60;

export default async function HomePage() {
  const lang = await getLang();
  const t = tFactory(lang);

  const [proizvodjaci, partneri] = await Promise.all([
    getProizvodjaci(),
    getPartneri(),
  ]);
  const istaknuti = proizvodjaci.filter((p) => p.istaknut).slice(0, 3);
  const prikazani = (istaknuti.length ? istaknuti : proizvodjaci).slice(0, 3);
  const pokrovitelji = partneri.filter((p) => p.tip === "pokrovitelj");

  const CILJEVI = [
    { ikona: "🏛️", naslov: t("cilj_kulturni_n"), tekst: t("cilj_kulturni_t") },
    { ikona: "🏭", naslov: t("cilj_ekonomski_n"), tekst: t("cilj_ekonomski_t") },
    { ikona: "🧭", naslov: t("cilj_turisticki_n"), tekst: t("cilj_turisticki_t") },
    { ikona: "👪", naslov: t("cilj_drustveni_n"), tekst: t("cilj_drustveni_t") },
  ];

  const NIVOI = [
    { broj: "1", naziv: "Izložba", opis: "Stalna postavka u Atrijumu, Glavnoj i Bioskopskoj sali Etnografskog muzeja." },
    { broj: "2", naziv: "Rakija Summit", opis: "Paneli, promocije, degustacije i izbor najboljih rakijaša." },
    { broj: "3", naziv: "Tematski dani", opis: "Antropologija, turizam, proizvodnja, porodični biznis, umetnost i filmski festival." },
    { broj: "4", naziv: "Medijska komponenta", opis: "Nacionalna kampanja, događaji za medije i gostovanja." },
    { broj: "5", naziv: "Velika noć rakije", opis: "Gala edutainment veče sa uručenjem nagrada i uparivanjem rakija sa jelima." },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Rakija – kulturno dobro Srbije",
          description:
            "Nacionalna izložba o tradicionalnoj porodičnoj proizvodnji rakije u Srbiji i Bajinoj Bašti.",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Etnografski muzej u Beogradu",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Beograd",
              addressCountry: "RS",
            },
          },
          organizer: { "@type": "Organization", name: "Etnografski muzej u Beogradu" },
          url: SITE_URL,
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-sljiva-900 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SLIKE.sljive}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sljiva-900/90 via-sljiva-900/80 to-bakar-900/80" />
        <div className="container-page relative z-10 py-24 sm:py-32">
          <p className="mb-4 inline-block rounded-full border border-bakar-300/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-bakar-200">
            {t("hero_eyebrow")}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
            {t("hero_naslov")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sljiva-100/90">{t("hero_opis")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/prijava"
              className="rounded-full bg-bakar-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-bakar-400"
            >
              {t("hero_cta1")}
            </Link>
            <Link
              href="/program"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {t("hero_cta2")}
            </Link>
          </div>
        </div>
      </section>

      {/* CILJEVI */}
      <section className="container-page py-20">
        <h2 className="font-serif text-3xl font-bold text-sljiva-900">{t("ciljevi_naslov")}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CILJEVI.map((c) => (
            <div key={c.naslov} className="rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
              <div className="text-3xl">{c.ikona}</div>
              <h3 className="mt-4 font-semibold text-sljiva-900">{c.naslov}</h3>
              <p className="mt-2 text-sm text-sljiva-600">{c.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRUKTURA */}
      <section className="bg-sljiva-100/60 py-20">
        <div className="container-page">
          <h2 className="font-serif text-3xl font-bold text-sljiva-900">{t("struktura_naslov")}</h2>
          <p className="mt-2 text-sljiva-600">{t("struktura_podnaslov")}</p>
          <div className="mt-10 space-y-4">
            {NIVOI.map((n) => (
              <div key={n.broj} className="flex items-start gap-5 rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bakar-600 font-serif text-xl font-bold text-white">
                  {n.broj}
                </span>
                <div>
                  <h3 className="font-semibold text-sljiva-900">{n.naziv}</h3>
                  <p className="mt-1 text-sm text-sljiva-600">{n.opis}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/program" className="font-semibold text-bakar-700 hover:underline">
              {t("detaljan_program")}
            </Link>
          </div>
        </div>
      </section>

      {/* BAND — pejzaž */}
      <section className="relative h-56 sm:h-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SLIKE.pejzaz} alt="Bajina Bašta i Drina" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-sljiva-950/40">
          <p className="container-page text-center font-serif text-2xl font-bold text-white sm:text-3xl">
            Bajina Bašta — kraj najstarije tradicije rakije
          </p>
        </div>
      </section>

      {/* ISTAKNUTI PROIZVOĐAČI */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-sljiva-900">{t("istaknuti_naslov")}</h2>
            <p className="mt-2 text-sljiva-600">{t("istaknuti_podnaslov")}</p>
          </div>
          <Link href="/proizvodjaci" className="hidden font-semibold text-bakar-700 hover:underline sm:block">
            {t("svi_proizvodjaci")}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prikazani.map((p) => (
            <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fotoZaProizvodjaca(p.slug ?? p.naziv, p.foto_url)}
                alt={p.naziv}
                className="-mx-6 -mt-6 mb-4 h-40 w-[calc(100%+3rem)] max-w-none object-cover"
              />
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-sljiva-900">{p.naziv}</h3>
                {p.godina_osnivanja && (
                  <span className="rounded-full bg-bakar-100 px-3 py-1 text-xs font-semibold text-bakar-700">
                    od {p.godina_osnivanja}.
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-sljiva-500">
                {[p.porodica && `Porodica ${p.porodica}`, p.selo || p.grad].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-3 line-clamp-4 text-sm text-sljiva-600">{p.prica}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POKROVITELJI */}
      <section className="bg-sljiva-100/60 py-16">
        <div className="container-page">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-sljiva-500">
            {t("pod_pokroviteljstvom")}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {pokrovitelji.map((p) => (
              <span key={p.id} className="text-center text-sm font-medium text-sljiva-700">
                {p.naziv}
              </span>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/partneri" className="font-semibold text-bakar-700 hover:underline">
              {t("svi_partneri")}
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-3xl bg-gradient-to-r from-bakar-600 to-sljiva-700 p-10 text-center text-white sm:p-16">
          <h2 className="font-serif text-3xl font-bold">{t("cta_naslov")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{t("cta_opis")}</p>
          <Link
            href="/prijava"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-bakar-700 shadow-lg transition hover:bg-sljiva-50"
          >
            {t("cta_dugme")}
          </Link>
        </div>
      </section>
    </>
  );
}
