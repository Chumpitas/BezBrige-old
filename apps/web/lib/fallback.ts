/**
 * Statički fallback podaci — koriste se kad Supabase nije povezan,
 * da bi sajt bio funkcionalan u prikazu. Identično seed migraciji.
 */
import type {
  Nagrada,
  Partner,
  ProgramStavka,
  Proizvod,
  Proizvodjac,
} from "./types";

export const FALLBACK_PARTNERI: Partner[] = [
  { id: "1", naziv: "Ministarstvo kulture Republike Srbije", tip: "pokrovitelj", logo_url: null, sajt: null, redosled: 1 },
  { id: "2", naziv: "Ministarstvo turizma i omladine Republike Srbije", tip: "pokrovitelj", logo_url: null, sajt: null, redosled: 2 },
  { id: "3", naziv: "Ministarstvo poljoprivrede, šumarstva i vodoprivrede", tip: "pokrovitelj", logo_url: null, sajt: null, redosled: 3 },
  { id: "4", naziv: "Privredna komora Srbije", tip: "partner", logo_url: null, sajt: null, redosled: 10 },
  { id: "5", naziv: "Savez udruženja rakijaša Srbije", tip: "partner", logo_url: null, sajt: null, redosled: 11 },
  { id: "6", naziv: "Udruženje somelijera Srbije", tip: "partner", logo_url: null, sajt: null, redosled: 12 },
  { id: "7", naziv: "Radio-televizija Srbije (RTS)", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 20 },
  { id: "8", naziv: "TV Prva", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 21 },
  { id: "9", naziv: "TV Euronews", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 22 },
  { id: "10", naziv: "TV Newsmax Balkans", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 23 },
  { id: "11", naziv: "RTV Vojvodine", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 24 },
  { id: "12", naziv: "Tanjug", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 25 },
  { id: "13", naziv: "Beta", tip: "medijski_partner", logo_url: null, sajt: null, redosled: 26 },
];

export const FALLBACK_PROGRAM: ProgramStavka[] = [
  { id: "p1", nivo: "Izložba", naslov: "Glavna postavka", opis: "Eksponati iz Bajine Bašte i okoline; kampanja „Jedina i jedinstvena rakija”; velika mapa Sokolskog kraja sa porodičnom proizvodnjom i destilerijama.", lokacija: "Atrijum Etnografskog muzeja", datum: null, redosled: 1 },
  { id: "p2", nivo: "Izložba", naslov: "Eksponati visoke vrednosti", opis: "Video instalacije, projekcije naučnog istraživanja, izjave i novi video materijali iz Bajine Bašte.", lokacija: "Glavna sala Etnografskog muzeja", datum: null, redosled: 2 },
  { id: "p3", nivo: "Izložba", naslov: "Filmovi i video iz Zapadne Srbije", opis: "Materijali iz Valjeva, Kosjerića, Požege, Arilja, Ivanjice, Užica i Zlatiborskog okruga, te pozitivni primeri iz cele Srbije.", lokacija: "Bioskopska sala", datum: null, redosled: 3 },
  { id: "p4", nivo: "Rakija Summit", naslov: "Susret proizvođača, struke i medija", opis: "Paneli, promocije, degustacije, izbor najboljih, mladih i budućih rakijaša.", lokacija: "Bioskopska sala", datum: null, redosled: 10 },
  { id: "p5", nivo: "Tematski dani", naslov: "Antropologija i etnologija (Dani 1–3)", opis: "Paneli o tradiciji i porodičnim narativima.", lokacija: "Bioskopska sala", datum: null, redosled: 20 },
  { id: "p6", nivo: "Tematski dani", naslov: "Turizam i brendiranje (Dani 4–6)", opis: "Rakija kao deo turističkog brenda Bajine Bašte.", lokacija: "Bioskopska sala", datum: null, redosled: 21 },
  { id: "p7", nivo: "Tematski dani", naslov: "Poljoprivreda i proizvodnja (Dani 7–9)", opis: "Tehnologija proizvodnje; učešće tehnologa iz destilerija.", lokacija: "Bioskopska sala", datum: null, redosled: 22 },
  { id: "p8", nivo: "Tematski dani", naslov: "Porodični biznis (Dani 10–12)", opis: "Iskustva manjih destilerija i porodičnih firmi.", lokacija: "Bioskopska sala", datum: null, redosled: 23 },
  { id: "p9", nivo: "Tematski dani", naslov: "Umetnički aspekt rakije (Dani 13–15)", opis: "Likovna izložba, kratke priče, knjige.", lokacija: "Etnografski muzej", datum: null, redosled: 24 },
  { id: "p10", nivo: "Tematski dani", naslov: "Filmski festival „Rakija” (Dani 16–20)", opis: "Igrani i dokumentarni filmovi na temu rakije i običaja.", lokacija: "Bioskopska sala", datum: null, redosled: 25 },
  { id: "p11", nivo: "Medijska komponenta", naslov: "Medijska kampanja i događaji za medije", opis: "Kampanja deset dana pred izložbu, 10 medijskih događaja, gostovanja na TV i radiju, tekstovi i društvene mreže.", lokacija: "Nacionalni mediji", datum: null, redosled: 30 },
  { id: "p12", nivo: "Velika noć rakije", naslov: "Gala edutainment veče", opis: "Ekskluzivna večera za VIP zvanice sa uručenjem nagrada i povelja; uparivanje rakija sa jelima.", lokacija: "Etnografski muzej", datum: null, redosled: 40 },
];

export const FALLBACK_PROIZVODJACI: Proizvodjac[] = [
  { id: "d1", naziv: "Stara Sokolova", slug: "stara-sokolova", porodica: "Bogdanović", generacija: 7, godina_osnivanja: 1830, selo: "Kostojevići", grad: "Bajina Bašta", region: "Sokolski kraj", velicina: "velika", prica: "Porodica Bogdanović, poreklom iz Krivaje, postavila je prve kazane još 1830. Danas u Kostojevićima proizvodi Staru Sokolovu — sa nizom domaćih i međunarodnih nagrada (USA Ratings 2025).", logo_url: null, foto_url: null, sajt: null, lat: 43.9305, lng: 19.6321, objavljen: true, istaknut: true },
  { id: "d2", naziv: "Stara Pesma", slug: "stara-pesma", porodica: "Ilić", generacija: null, godina_osnivanja: null, selo: "Pepelj", grad: "Bajina Bašta", region: "Sokolski kraj", velicina: "srednja", prica: "Vekovna tradicija familije Ilić u proizvodnji voćnih rakija vrhunskog kvaliteta po tradicionalnoj tehnologiji.", logo_url: null, foto_url: null, sajt: "https://starapesma.com", lat: 43.9182, lng: 19.6604, objavljen: true, istaknut: false },
  { id: "d3", naziv: "BB Kleka", slug: "bb-kleka", porodica: null, generacija: null, godina_osnivanja: null, selo: null, grad: "Bajina Bašta", region: "Sokolski kraj", velicina: "srednja", prica: "Prepoznatljiva klekovača iz Bajine Bašte.", logo_url: null, foto_url: null, sajt: null, lat: 43.9719, lng: 19.5681, objavljen: true, istaknut: false },
];

export const FALLBACK_PROIZVODI: Proizvod[] = [
  { id: "pr1", proizvodjac_id: "d1", naziv: "Stara Sokolova šljivovica", vrsta: "Šljivovica", sorta: "Crvena ranka", opis: "Vrhunska prepečenica od šljive, odležala u hrastovim bačvama.", foto_url: null },
  { id: "pr2", proizvodjac_id: "d1", naziv: "Stara Sokolova kajsija", vrsta: "Kajsijevača", sorta: null, opis: "Mekana i aromatična rakija od kajsije.", foto_url: null },
  { id: "pr3", proizvodjac_id: "d2", naziv: "Stara Pesma viljamovka", vrsta: "Kruškovača", sorta: "Viljamovka", opis: "Rakija od kruške viljamovke, intenzivnog mirisa.", foto_url: null },
  { id: "pr4", proizvodjac_id: "d3", naziv: "BB Klekovača", vrsta: "Klekovača", sorta: null, opis: "Tradicionalna klekovača sa bobicama kleke.", foto_url: null },
];

export const FALLBACK_NAGRADE: Nagrada[] = [
  { id: "n1", proizvodjac_id: "d1", naziv: "USA Ratings 2025 — najbolja voćna rakija", nivo: "zlato", medjunarodna: true, godina: 2025 },
];
