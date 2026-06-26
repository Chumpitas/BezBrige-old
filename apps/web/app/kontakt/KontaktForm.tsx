"use client";

import { useActionState } from "react";
import { posaljiPoruku, type KontaktRezultat } from "./actions";

export function KontaktForm() {
  const [rez, action, pending] = useActionState<KontaktRezultat | null, FormData>(
    posaljiPoruku,
    null,
  );

  const inputCls =
    "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500";

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
      {/* honeypot */}
      <input
        type="text"
        name="vebsajt"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="block text-sm">
        <span className="text-sljiva-600">Ime i prezime *</span>
        <input name="ime" required className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Email *</span>
        <input name="email" type="email" required className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Poruka *</span>
        <textarea name="poruka" rows={5} required className={inputCls} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white transition hover:bg-bakar-700 disabled:opacity-60"
      >
        {pending ? "Slanje…" : "Pošalji poruku"}
      </button>
    </form>
  );
}
