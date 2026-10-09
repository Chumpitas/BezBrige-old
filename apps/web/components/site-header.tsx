import Link from "next/link";
import { getLang, getPismo, tFactory } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { BrandLogo } from "./brand-logo";

export async function SiteHeader() {
  const lang = await getLang();
  const pismo = await getPismo();
  // Meni je uvek na srpskom (ćirilica/latinica preko pisma); EN se ne koristi za navigaciju.
  const t = tFactory("sr");

  // Desktop (xl+) — mala slova (SC font ih prikazuje kao kapitelke)
  const NAV = [
    { href: "/o-projektu", label: t("nav_o_projektu") },
    { href: "/nacionalna-izlozba", label: t("nav_izlozba") },
    { href: "/forum", label: t("nav_forum") },
    { href: "/regioni", label: t("nav_regioni") },
    { href: "/proizvodjaci", label: t("nav_proizvodjaci") },
    { href: "/vesti", label: t("nav_vesti") },
  ];

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
    <div className="sticky top-0 z-40">
      {/* zupci traka iznad headera */}
      <div className="zupci-na-plavoj" aria-hidden="true" />
      <header className="bg-plava text-lan">
        <div className="container-page flex flex-wrap items-center justify-between gap-5 py-4">
          <Link href="/" className="flex items-center" aria-label="Rakija Srbije — početna">
            <BrandLogo className="h-[46px] w-auto" />
          </Link>

          <nav className="hidden items-center gap-5 font-sc text-[15px] tracking-[0.04em] xl:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-lan hover:text-bela">
                {n.label.toLowerCase()}
              </Link>
            ))}
            <LanguageSwitcher lang={lang} pismo={pismo} />
            <Link
              href="/partneri"
              className="rounded bg-bela px-4 py-[7px] font-bold text-mastilo hover:bg-krem"
            >
              postanite partner
            </Link>
          </nav>

          <div className="flex items-center gap-3 xl:hidden">
            <LanguageSwitcher lang={lang} pismo={pismo} />
            <MobileMenu items={NAV_MOBILE} />
          </div>
        </div>
      </header>
    </div>
  );
}
