import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { VestForm } from "../../VestForm";

export const metadata = { title: "Admin · Izmena vesti", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function UrediVest({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isAdminConfigured()) {
    return (
      <p className="rounded-xl border border-bakar-200 bg-bakar-50 px-5 py-4 text-sm text-bakar-800">
        Podesi <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code>.
      </p>
    );
  }
  const sb = getSupabaseAdmin()!;
  const { data } = await sb.from("vesti").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/vesti" className="text-sm text-bakar-700 hover:underline">
        ← Nazad
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-bold text-sljiva-900">
        {(data as { naslov: string }).naslov}
      </h1>
      <div className="mt-6">
        <VestForm v={data as never} />
      </div>
    </div>
  );
}
