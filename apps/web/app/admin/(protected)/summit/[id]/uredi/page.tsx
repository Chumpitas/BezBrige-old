import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin, isAdminConfigured } from "@/lib/supabase-admin";
import { PanelForm } from "../../PanelForm";
import type { Panel } from "@/lib/types";

export const metadata = { title: "Admin · Izmena panela", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function UrediPanel({
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
  const { data } = await sb.from("paneli").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/summit" className="text-sm text-bakar-700 hover:underline">
        ← Nazad
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-bold text-sljiva-900">
        {(data as Panel).naslov}
      </h1>
      <div className="mt-6">
        <PanelForm p={data as Panel} />
      </div>
    </div>
  );
}
