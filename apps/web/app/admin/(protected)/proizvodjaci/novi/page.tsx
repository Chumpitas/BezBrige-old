import Link from "next/link";
import { isAdminConfigured } from "@/lib/supabase-admin";
import { ProizvodjacForm } from "../ProizvodjacForm";

export const metadata = { title: "Admin · Novi proizvođač", robots: { index: false } };

export default function NoviProizvodjac() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/proizvodjaci" className="text-sm text-bakar-700 hover:underline">
        ← Nazad
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-bold text-sljiva-900">
        Novi proizvođač
      </h1>
      {!isAdminConfigured() ? (
        <p className="mt-6 rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
          Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> da bi čuvao.
        </p>
      ) : (
        <div className="mt-6">
          <ProizvodjacForm />
        </div>
      )}
    </div>
  );
}
