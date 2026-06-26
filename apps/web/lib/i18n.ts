import { cookies } from "next/headers";

export type Lang = "sr" | "en";
export const LANG_COOKIE = "lang";

export async function getLang(): Promise<Lang> {
  const c = await cookies();
  return c.get(LANG_COOKIE)?.value === "en" ? "en" : "sr";
}

type Dict = Record<string, { sr: string; en: string }>;

export const DICT: Dict = {
  // Navigacija
  nav_o_projektu: { sr: "O projektu", en: "About" },
  nav_program: { sr: "Program", en: "Programme" },
  nav_summit: { sr: "Summit", en: "Summit" },
  nav_proizvodjaci: { sr: "Proizvođači", en: "Producers" },
  nav_galerija: { sr: "Galerija", en: "Gallery" },
  nav_vesti: { sr: "Vesti", en: "News" },
  nav_partneri: { sr: "Partneri", en: "Partners" },
  nav_kontakt: { sr: "Kontakt", en: "Contact" },
  nav_prijava: { sr: "Prijava", en: "Apply" },
  cta_prijavi: { sr: "Prijavi se", en: "Apply" },

  // Hero
  hero_eyebrow: { sr: "Etnografski muzej · Beograd", en: "Ethnographic Museum · Belgrade" },
  hero_naslov: { sr: "Rakija — kulturno dobro Srbije", en: "Rakija — a cultural treasure of Serbia" },
  hero_opis: {
    sr: "Nacionalni projekat i izložba o tradicionalnoj porodičnoj proizvodnji rakije u Srbiji i Bajinoj Bašti — kraju sa najstarijom tradicijom, gde skoro nema porodice koja ne peče svoju šljivu.",
    en: "A national project and exhibition on the traditional family production of rakija in Serbia and Bajina Bašta — the region with the oldest tradition, where almost every family distills its own plum brandy.",
  },
  hero_cta1: { sr: "Prijavi svoju destileriju", en: "Register your distillery" },
  hero_cta2: { sr: "Pogledaj program", en: "View the programme" },

  // Ciljevi
  ciljevi_naslov: { sr: "Ključni ciljevi projekta", en: "Key goals of the project" },
  cilj_kulturni_n: { sr: "Kulturni cilj", en: "Cultural goal" },
  cilj_kulturni_t: {
    sr: "Rakija kao bitan element nematerijalne kulturne baštine Srbije, posebno Bajine Bašte — kroz naučno istraživanje, eksponate i narative.",
    en: "Rakija as an important element of Serbia's intangible cultural heritage, especially of Bajina Bašta — through research, exhibits and narratives.",
  },
  cilj_ekonomski_n: { sr: "Ekonomski cilj", en: "Economic goal" },
  cilj_ekonomski_t: {
    sr: "Promocija malih destilerija u Bajinoj Bašti i Srbiji (1000+ destilerija) i predstavljanje kraja sa najjačom proizvodnjom rakije.",
    en: "Promotion of small distilleries in Bajina Bašta and Serbia (1000+ distilleries) and showcasing the region with the strongest rakija production.",
  },
  cilj_turisticki_n: { sr: "Turistički cilj", en: "Tourism goal" },
  cilj_turisticki_t: {
    sr: "Pozicioniranje Bajine Bašte kao „rakija destinacije” — ture u kojima su turisti aktivni učesnici proizvodnje i degustacije.",
    en: "Positioning Bajina Bašta as a “rakija destination” — tours where visitors actively take part in production and tasting.",
  },
  cilj_drustveni_n: { sr: "Društveni cilj", en: "Social goal" },
  cilj_drustveni_t: {
    sr: "Revalorizacija porodičnih vrednosti i tradicije — jake porodične veze koje nove generacije nastavljaju.",
    en: "Revaluing family values and tradition — strong family bonds carried on by new generations.",
  },

  // Struktura
  struktura_naslov: { sr: "Struktura događaja", en: "Event structure" },
  struktura_podnaslov: { sr: "Pet nivoa jednog jedinstvenog događaja.", en: "Five levels of one unique event." },
  detaljan_program: { sr: "Detaljan program →", en: "Full programme →" },

  // Proizvođači sekcija
  istaknuti_naslov: { sr: "Istaknuti proizvođači", en: "Featured producers" },
  istaknuti_podnaslov: { sr: "Početak baze proizvođača rakije iz cele Srbije.", en: "The start of a database of rakija producers from all of Serbia." },
  svi_proizvodjaci: { sr: "Svi proizvođači →", en: "All producers →" },

  // Pokrovitelji
  pod_pokroviteljstvom: { sr: "Pod pokroviteljstvom", en: "Under the patronage of" },
  svi_partneri: { sr: "Svi partneri i mediji →", en: "All partners & media →" },

  // CTA
  cta_naslov: { sr: "Vaša rakija zaslužuje svoje mesto", en: "Your rakija deserves its place" },
  cta_opis: {
    sr: "Prijavite svoju destileriju i saznajte u koju kategoriju ulazite — Veliki majstori, Čuvari kvaliteta ili Mladi majstori. Bodovanje je trenutno i transparentno.",
    en: "Register your distillery and discover your category — Grand Masters, Quality Keepers or Young Masters. Scoring is instant and transparent.",
  },
  cta_dugme: { sr: "Popuni prijavu", en: "Fill in the application" },

  // Footer
  footer_opis: { sr: "Tradicionalna porodična proizvodnja rakije u Srbiji i Bajinoj Bašti.", en: "Traditional family production of rakija in Serbia and Bajina Bašta." },
  footer_izlozba: { sr: "Izložba u Etnografskom muzeju u Beogradu.", en: "Exhibition at the Ethnographic Museum in Belgrade." },
  footer_navigacija: { sr: "Navigacija", en: "Navigation" },
  footer_kontakt: { sr: "Kontakt", en: "Contact" },
  footer_kontakt_t: { sr: "Za partnerstva i medijske upite pišite preko", en: "For partnerships and media inquiries, write via the" },
  footer_kontakt_link: { sr: "kontakt stranice", en: "contact page" },
};

export function tFactory(lang: Lang) {
  return (key: keyof typeof DICT) => DICT[key]?.[lang] ?? String(key);
}
