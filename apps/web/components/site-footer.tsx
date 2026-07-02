import Link from "next/link";
import { getLang, tFactory } from "@/lib/i18n";

export async function SiteFooter() {
  const lang = await getLang();
  const t = tFactory(lang);

  return (
    <footer className="mt-24 border-t border-sljiva-200 bg-sljiva-900 text-sljiva-100">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold">RAKIJA</p>
          <p className="mt-1 text-sm text-sljiva-300">{t("footer_opis")}</p>
          <p className="mt-3 text-xs text-sljiva-400">{t("footer_izlozba")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bakar-300">
            {t("footer_navigacija")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/o-projektu" className="hover:text-bakar-300">{t("nav_o_projektu")}</Link></li>
            <li><Link href="/bajina-basta" className="hover:text-bakar-300">{t("nav_bajina")}</Link></li>
            <li><Link href="/program" className="hover:text-bakar-300">{t("nav_program")}</Link></li>
            <li><Link href="/summit" className="hover:text-bakar-300">{t("nav_summit")}</Link></li>
            <li><Link href="/proizvodjaci" className="hover:text-bakar-300">{t("nav_proizvodjaci")}</Link></li>
            <li><Link href="/ture" className="hover:text-bakar-300">{t("nav_ture")}</Link></li>
            <li><Link href="/galerija" className="hover:text-bakar-300">{t("nav_galerija")}</Link></li>
            <li><Link href="/velika-noc-rakije" className="hover:text-bakar-300">Velika noć rakije</Link></li>
            <li><Link href="/vesti" className="hover:text-bakar-300">{t("nav_vesti")}</Link></li>
            <li><Link href="/posalji" className="hover:text-bakar-300">{t("nav_doprinesi")}</Link></li>
            <li><Link href="/kontakt" className="hover:text-bakar-300">{t("nav_kontakt")}</Link></li>
            <li><Link href="/prijava" className="hover:text-bakar-300">{t("nav_prijava")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bakar-300">
            {t("footer_kontakt")}
          </p>
          <p className="mt-3 text-sm text-sljiva-300">
            {t("footer_kontakt_t")}{" "}
            <Link href="/kontakt" className="underline hover:text-bakar-300">
              {t("footer_kontakt_link")}
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-sljiva-800 py-4">
        <p className="container-page text-xs text-sljiva-400">
          © {new Date().getFullYear()} Rakija – kulturno dobro Srbije.
        </p>
      </div>
    </footer>
  );
}
