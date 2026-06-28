import Link from "next/link";
import { getLang, tFactory } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

export async function SiteHeader() {
  const lang = await getLang();
  const t = tFactory(lang);

  const NAV = [
    { href: "/o-projektu", label: t("nav_o_projektu") },
    { href: "/program", label: t("nav_program") },
    { href: "/summit", label: t("nav_summit") },
    { href: "/proizvodjaci", label: t("nav_proizvodjaci") },
    { href: "/ture", label: t("nav_ture") },
    { href: "/galerija", label: t("nav_galerija") },
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
        <nav className="hidden items-center gap-5 lg:flex">
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
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <Link
            href="/prijava"
            className="rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-bakar-700 lg:hidden"
          >
            {t("cta_prijavi")}
          </Link>
        </div>
      </div>
    </header>
  );
}
