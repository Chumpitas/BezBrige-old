import type { Metadata } from "next";
import { adminLozinkaPodesena } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin prijava", robots: { index: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ od?: string }>;
}) {
  const { od } = await searchParams;
  const podesena = adminLozinkaPodesena();

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border border-sljiva-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-sljiva-900">
          Admin panel
        </h1>
        <p className="mt-1 text-sm text-sljiva-500">Rakija – kulturno dobro Srbije</p>
        <div className="mt-6">
          {podesena ? (
            <LoginForm od={od ?? "/admin"} />
          ) : (
            <div className="rounded-lg border border-bakar-200 bg-bakar-50 px-4 py-3 text-sm text-bakar-800">
              Admin lozinka još nije podešena. Dodaj env varijablu{" "}
              <code className="font-mono">ADMIN_LOZINKA</code> (i{" "}
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>) pa
              osveži stranicu.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
