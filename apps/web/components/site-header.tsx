import Link from "next/link";
import { getLang, tFactory } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export async function SiteHeader() {
  const lang = await getLang();
  const t = tFactory(lang);

  // Desktop (xl+) — kraći nazivi da sve stane u jedan red
  const NAV = [
    { href: "/o-projektu", label: t("nav_o_projektu") },
    { href: "/nacionalna-izlozba", label: t("nav_izlozba") },
    { href: "/forum", label: t("nav_forum") },
    { href: "/regioni", label: t("nav_regioni") },
    { href: "/proizvodjaci", label: t("nav_proizvodjaci") },
    { href: "/ture", label: t("nav_ture") },
    { href: "/galerija", label: t("nav_galerija") },
    { href: "/vesti", label: t("nav_vesti") },
    { href: "/prijava", label: t("nav_prijava") },
  ];

  // Mobilni meni — kompletan spisak (puni nazivi)
  const NAV_MOBILE = [
    { href: "/o-projektu", label: t("nav_o_projektu") },
    { href: "/nacionalna-izlozba", label: "Nacionalna izložba" },
    { href: "/bajina-basta", label: t("nav_bajina") },
    { href: "/naucno-istrazivanje", label: t("nav_istrazivanje") },
    { href: "/forum", label: "Forum „Rakija Srbije“" },
    { href: "/regioni", label: "Rakijski krajevi Srbije" },
    { href: "/proizvodjaci", label: t("nav_proizvodjaci") },
    { href: "/ture", label: t("nav_ture") },
    { href: "/galerija", label: t("nav_galerija") },
    { href: "/velika-noc-rakije", label: "Velika noć rakije" },
    { href: "/vesti", label: t("nav_vesti") },
    { href: "/partneri", label: t("nav_partneri") },
    { href: "/posalji", label: t("nav_doprinesi") },
    { href: "/kontakt", label: t("nav_kontakt") },
    { href: "/prijava", label: t("nav_prijava") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sljiva-200/60 bg-sljiva-50/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥃</span>
          <span className="font-serif text-lg font-bold leading-tight text-sljiva-900">
            RAKIJA
            <span className="block text-[10px] font-sans font-medium uppercase tracking-widest text-bakar-600">
              kulturno dobro Srbije
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-sljiva-700 transition-colors hover:text-bakar-600"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <Link
            href="/prijava"
            className="hidden rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-bakar-700 sm:inline-block xl:hidden"
          >
            {t("cta_prijavi")}
          </Link>
          <MobileMenu items={NAV_MOBILE} />
        </div>
      </div>
    </header>
  );
}
