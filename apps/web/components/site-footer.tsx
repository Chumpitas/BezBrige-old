import Link from "next/link";
import { tFactory } from "@/lib/i18n";
import { BrandLogo } from "./brand-logo";

export async function SiteFooter() {
  const t = tFactory("sr");

  const LINKOVI = [
    { href: "/o-projektu", label: t("nav_o_projektu") },
    { href: "/nacionalna-izlozba", label: "Nacionalna izložba" },
    { href: "/bajina-basta", label: t("nav_bajina") },
    { href: "/naucno-istrazivanje", label: t("nav_istrazivanje") },
    { href: "/forum", label: "Forum" },
    { href: "/regioni", label: "Regioni" },
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
    <footer className="mt-20 bg-plava text-lan-tamni">
      <div className="vez-traka" aria-hidden="true" />
      <div className="zupci-crvena" aria-hidden="true" />
      <div className="container-page py-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-sm">
            <BrandLogo className="h-[44px] w-auto" />
            <p className="mt-3 text-[15px]">
              Nacionalna izložba 2026 · Etnografski muzej u Beogradu
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 font-sc text-[14px] tracking-[0.04em] sm:grid-cols-3">
            {LINKOVI.map((l) => (
              <Link key={l.href} href={l.href} className="text-lan-tamni hover:text-lan">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-plava-ivica/60 py-4">
        <p className="container-page text-[13px] text-lan-tamni/80">
          © {new Date().getFullYear()} Rakija Srbije.
        </p>
      </div>
    </footer>
  );
}
