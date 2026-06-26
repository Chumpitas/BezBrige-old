"use client";

import Link from "next/link";
import { obrisiPanel, sacuvajPanel } from "./crud";
import type { Panel } from "@/lib/types";

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 text-sm outline-none focus:border-bakar-500";

export function PanelForm({ p }: { p?: Panel }) {
  return (
    <form action={sacuvajPanel} className="space-y-5">
      {p?.id && <input type="hidden" name="id" value={p.id} />}

      <label className="block text-sm">
        <span className="text-sljiva-600">Naslov panela *</span>
        <input name="naslov" defaultValue={p?.naslov ?? ""} className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Opis</span>
        <textarea name="opis" rows={4} defaultValue={p?.opis ?? ""} className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Govornici</span>
        <input name="govornici" defaultValue={p?.govornici ?? ""} placeholder="Ime Prezime, Ime Prezime…" className={inputCls} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-sljiva-600">Sala</span>
          <input name="sala" defaultValue={p?.sala ?? ""} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Datum</span>
          <input name="datum" type="date" defaultValue={p?.datum ?? ""} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Vreme od</span>
          <input name="vreme_od" type="time" defaultValue={p?.vreme_od?.slice(0, 5) ?? ""} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Vreme do</span>
          <input name="vreme_do" type="time" defaultValue={p?.vreme_do?.slice(0, 5) ?? ""} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Redosled</span>
          <input name="redosled" type="number" defaultValue={p?.redosled ?? 0} className={inputCls} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="objavljen" defaultChecked={p?.id ? true : true} className="h-4 w-4 accent-bakar-600" />
        <span className="text-sljiva-700">Objavljen</span>
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white hover:bg-bakar-700">
          Sačuvaj
        </button>
        <Link href="/admin/summit" className="text-sm font-medium text-sljiva-500 hover:text-sljiva-700">
          Otkaži
        </Link>
        {p?.id && (
          <button formAction={obrisiPanel} className="ml-auto text-sm font-medium text-red-600 hover:underline">
            Obriši
          </button>
        )}
      </div>
    </form>
  );
}
