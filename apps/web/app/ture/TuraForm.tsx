"use client";

import { useActionState } from "react";
import { posaljiRezervaciju, type TuraRezultat } from "./actions";

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500";

export function TuraForm({ destilerije }: { destilerije: string[] }) {
  const [rez, action, pending] = useActionState<TuraRezultat | null, FormData>(
    posaljiRezervaciju,
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
          <span className="text-sljiva-600">Željeni datum</span>
          <input name="datum" type="date" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Broj osoba</span>
          <input name="broj_osoba" type="number" min={1} defaultValue={2} className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Destilerija / regija</span>
          <input name="destilerija" list="destilerije-lista" placeholder="bilo koja / izaberite" className={inputCls} />
          <datalist id="destilerije-lista">
            {destilerije.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-sljiva-600">Poruka</span>
        <textarea name="poruka" rows={3} className={inputCls} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white transition hover:bg-bakar-700 disabled:opacity-60"
      >
        {pending ? "Slanje…" : "Rezerviši turu"}
      </button>
    </form>
  );
}
