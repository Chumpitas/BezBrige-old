import Link from "next/link";

const NAV = [
  { href: "/o-projektu", label: "O projektu" },
  { href: "/program", label: "Program" },
  { href: "/proizvodjaci", label: "Proizvođači" },
  { href: "/partneri", label: "Partneri" },
  { href: "/prijava", label: "Prijava" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sljiva-200/60 bg-sljiva-50/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥃</span>
          <span className="font-serif text-lg font-bold leading-tight text-sljiva-900">
            RAKIJA
            <span className="block text-[10px] font-sans font-medium uppercase tracking-widest text-bakar-600">
              kulturno dobro Srbije
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
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
        <Link
          href="/prijava"
          className="rounded-full bg-bakar-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-bakar-700 md:hidden"
        >
          Prijavi se
        </Link>
      </div>
    </header>
  );
}
