import Link from "next/link";
import { redirect } from "next/navigation";
import { jeAdmin } from "@/lib/admin-auth";
import { odjaviSe } from "../login/actions";

const NAV = [
  { href: "/admin", label: "Pregled" },
  { href: "/admin/prijave", label: "Prijave" },
  { href: "/admin/vnr", label: "Velika noć" },
  { href: "/admin/proizvodjaci", label: "Proizvođači" },
  { href: "/admin/summit", label: "Summit" },
  { href: "/admin/vesti", label: "Vesti" },
  { href: "/admin/galerija", label: "Galerija" },
  { href: "/admin/uvoz", label: "Uvoz" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await jeAdmin())) redirect("/admin/login");

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sljiva-200 pb-4">
        <div className="flex items-center gap-6">
          <span className="font-serif text-lg font-bold text-sljiva-900">
            Admin
          </span>
          <nav className="flex flex-wrap gap-4 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-medium text-sljiva-600 hover:text-bakar-700"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={odjaviSe}>
          <button className="text-sm font-medium text-sljiva-500 hover:text-red-600">
            Odjava
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
