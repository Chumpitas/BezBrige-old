"use client";

import { useActionState } from "react";
import { uveziProizvodjace, type UvozRezultat } from "./actions";

const PRIMER = `naziv,porodica,godina_osnivanja,selo,grad,region,velicina,sajt,lat,lng,objavljen,prica
Primer Destilerija,Petrović,1975,Rogačica,Bajina Bašta,Sokolski kraj,srednja,https://primer.rs,43.95,19.60,da,"Kratka priča o destileriji."`;

export function UvozForm() {
  const [rez, action, pending] = useActionState<UvozRezultat | null, FormData>(
    uveziProizvodjace,
    null,
  );

  return (
    <form action={action} className="space-y-4">
      {rez && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            rez.ok
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {rez.poruka}
          {rez.ok && (
            <> Uvezeno: {rez.uvezeno}. Preskočeno: {rez.preskoceno ?? 0}.</>
          )}
        </div>
      )}
      <textarea
        name="csv"
        rows={14}
        placeholder={PRIMER}
        className="w-full rounded-xl border border-sljiva-200 p-4 font-mono text-xs outline-none focus:border-bakar-500"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white hover:bg-bakar-700 disabled:opacity-60"
        >
          {pending ? "Uvoz…" : "Uvezi"}
        </button>
        <span className="text-xs text-sljiva-500">
          Postojeći (po slug-u) se ažuriraju, novi se dodaju.
        </span>
      </div>
    </form>
  );
}
