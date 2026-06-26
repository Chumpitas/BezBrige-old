"use client";

import { useActionState } from "react";
import { posaljiVnrPrijavu, type VnrRezultat } from "./actions";

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500";

export function VnrForm() {
  const [rez, action, pending] = useActionState<VnrRezultat | null, FormData>(
    posaljiVnrPrijavu,
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
        </div>
      )}
      <input type="text" name="vebsajt" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-sljiva-600">Ime i prezime *</span>
          <input name="ime" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Email *</span>
          <input name="email" type="email" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Telefon</span>
          <input name="telefon" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Organizacija / kompanija</span>
          <input name="organizacija" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Broj osoba</span>
          <input name="broj_osoba" type="number" min={1} defaultValue={1} className={inputCls} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-sljiva-600">Napomena</span>
        <textarea name="napomena" rows={3} className={inputCls} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white transition hover:bg-bakar-700 disabled:opacity-60"
      >
        {pending ? "Slanje…" : "Pošalji prijavu"}
      </button>
    </form>
  );
}
