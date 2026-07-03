/**
 * Override teksta „Priča" za pojedine proizvođače — prikazuje se bez obzira na
 * stanje baze (dok se sadržaj ne prebaci u bazu/admin). Ključ je slug.
 */
export const PRICA_OVERRIDE: Record<string, string> = {
  "stara-sokolova":
    "Od porodične tradicije do svetskog brenda\n\n" +
    "Jedan od značajnijih nalaza naučnog istraživanja istraživača sa Katedre za antropologiju i etnologiju Filozofskog fakulteta u Beogradu jeste da porodica Bogdanović, poreklom iz Krivaje, a koja danas u Kostojevićima proizvodi Staru Sokolovu, najduže proizvodi rakiju. Iako je u istoriji Sokolskog kraja bilo još pokušaja da se sa porodične proizvodnje krene u osvajanje tržišta, Stara Sokolova je otišla najdalje. U trideset godina svog postojanja osvojili su sve moguće nagrade, a pre manje od mesec dana i četiri najveće nagrade na američkom tržištu (USA Ratings 2025), uključujući nagradu za najbolju voćnu rakiju.\n\n" +
    "„Sokolski kraj i sela Bajine Bašte su bogom dani za proizvodnju šljivovice i rakije“, rekao je Radisav Bogdanović, osnivač i predsednik RB Global / Stara Sokolova — čovek koji je, nakon šest generacija svojih predaka, odlučio da napravi izvozni proizvod Srbije, Staru Sokolovu. „U Sokolskom kraju raste najbolja šljiva za rakiju, ali tu žive i potomci onih koji su početkom 19. veka krenuli da sade šljivu i proizvode rakiju. Tako je i moj navrh deda Savo Bogdanović to započeo, a nakon njega to je činilo još šest generacija Bogdanovića“, istakao je Radisav Bogdanović, čija Stara Sokolova ove godine slavi 30 godina od početka rada.",
};

export function primeniPricaOverride<T extends { slug?: string | null; prica?: string | null }>(
  p: T,
): T {
  if (p.slug && PRICA_OVERRIDE[p.slug]) {
    return { ...p, prica: PRICA_OVERRIDE[p.slug] };
  }
  return p;
}
