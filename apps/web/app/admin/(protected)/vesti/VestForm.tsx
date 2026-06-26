"use client";

import Link from "next/link";
import { obrisiVest, sacuvajVest } from "./crud";

interface VestRed {
  id?: string;
  slug?: string | null;
  naslov?: string | null;
  sazetak?: string | null;
  sadrzaj?: string | null;
  cover_url?: string | null;
  objavljen?: boolean;
  objavljeno_at?: string | null;
}

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 text-sm outline-none focus:border-bakar-500";

export function VestForm({ v }: { v?: VestRed }) {
  const datumVal = v?.objavljeno_at ? v.objavljeno_at.slice(0, 10) : "";
  return (
    <form action={sacuvajVest} className="space-y-5">
      {v?.id && <input type="hidden" name="id" value={v.id} />}

      <label className="block text-sm">
        <span className="text-sljiva-600">Naslov *</span>
        <input name="naslov" defaultValue={v?.naslov ?? ""} className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Slug (opciono)</span>
        <input name="slug" defaultValue={v?.slug ?? ""} placeholder="generiše se iz naslova" className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Sažetak</span>
        <textarea name="sazetak" rows={2} defaultValue={v?.sazetak ?? ""} className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Sadržaj</span>
        <textarea name="sadrzaj" rows={10} defaultValue={v?.sadrzaj ?? ""} className={inputCls} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-sljiva-600">Cover URL (slika)</span>
          <input name="cover_url" defaultValue={v?.cover_url ?? ""} placeholder="https://" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Datum objave</span>
          <input name="objavljeno_at" type="date" defaultValue={datumVal} className={inputCls} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="objavljen" defaultChecked={v?.objavljen ?? false} className="h-4 w-4 accent-bakar-600" />
        <span className="text-sljiva-700">Objavljeno</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white hover:bg-bakar-700">
          Sačuvaj
        </button>
        <Link href="/admin/vesti" className="text-sm font-medium text-sljiva-500 hover:text-sljiva-700">
          Otkaži
        </Link>
        {v?.id && (
          <button formAction={obrisiVest} className="ml-auto text-sm font-medium text-red-600 hover:underline">
            Obriši
          </button>
        )}
      </div>
    </form>
  );
}
