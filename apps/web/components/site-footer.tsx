import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-sljiva-200 bg-sljiva-900 text-sljiva-100">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold">RAKIJA</p>
          <p className="mt-1 text-sm text-sljiva-300">
            Tradicionalna porodična proizvodnja rakije u Srbiji i Bajinoj Bašti.
          </p>
          <p className="mt-3 text-xs text-sljiva-400">
            Izložba u Etnografskom muzeju u Beogradu.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bakar-300">
            Navigacija
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/o-projektu" className="hover:text-bakar-300">O projektu</Link></li>
            <li><Link href="/program" className="hover:text-bakar-300">Program</Link></li>
            <li><Link href="/proizvodjaci" className="hover:text-bakar-300">Proizvođači</Link></li>
            <li><Link href="/galerija" className="hover:text-bakar-300">Galerija</Link></li>
            <li><Link href="/vesti" className="hover:text-bakar-300">Vesti</Link></li>
            <li><Link href="/kontakt" className="hover:text-bakar-300">Kontakt</Link></li>
            <li><Link href="/prijava" className="hover:text-bakar-300">Prijava za učešće</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-bakar-300">
            Kontakt
          </p>
          <p className="mt-3 text-sm text-sljiva-300">
            Za partnerstva i medijske upite pišite preko{" "}
            <Link href="/kontakt" className="underline hover:text-bakar-300">
              kontakt stranice
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-sljiva-800 py-4">
        <p className="container-page text-xs text-sljiva-400">
          © {new Date().getFullYear()} Rakija – kulturno dobro Srbije. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}
