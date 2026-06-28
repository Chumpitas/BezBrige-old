"use client";

import { useActionState, useState } from "react";
import { posaljiPredlog, type PredlogRezultat } from "./actions";
import { Uploader } from "@/components/uploader";

const inputCls =
  "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500";

export function PredlogForm() {
  const [tip, setTip] = useState<"foto" | "eksponat">("foto");
  const [rez, action, pending] = useActionState<PredlogRezultat | null, FormData>(
    posaljiPredlog,
    null,
  );

  return (
    <form action={action} className="space-y-5">
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

      {/* Tip predloga */}
      <input type="hidden" name="tip" value={tip} />
      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ["foto", "📷 Stara fotografija", "Podelite staru porodičnu fotografiju proizvodnje rakije."],
            ["eksponat", "🪵 Predlog eksponata", "Predložite stari predmet (kazan, alat…) za izložbu."],
          ] as const
        ).map(([val, naslov, opis]) => (
          <label
            key={val}
            className={`cursor-pointer rounded-xl border p-4 text-sm ${
              tip === val
                ? "border-bakar-500 bg-bakar-50"
                : "border-sljiva-200 bg-white"
            }`}
          >
            <input
              type="radio"
              name="tip_radio"
              className="sr-only"
              checked={tip === val}
              onChange={() => setTip(val)}
            />
            <span className="font-semibold text-sljiva-900">{naslov}</span>
            <p className="mt-1 text-sljiva-600">{opis}</p>
          </label>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-sljiva-600">Ime i prezime *</span>
          <input name="ime" required className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Mesto / kraj porekla</span>
          <input name="mesto" placeholder="npr. Bajina Bašta, Užice…" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Email</span>
          <input name="email" type="email" className={inputCls} />
        </label>
        <label className="block text-sm">
          <span className="text-sljiva-600">Telefon</span>
          <input name="telefon" className={inputCls} />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-sljiva-600">
          {tip === "eksponat" ? "Opis predmeta (šta je, koliko star, koji kraj, tip kazana…) *" : "Opis fotografije (ko je na slici, gde, kada…) *"}
        </span>
        <textarea name="opis" rows={4} required className={inputCls} />
      </label>

      <Uploader
        name="foto_url"
        folder="predlozi"
        endpoint="/api/predlog-upload"
        label={tip === "eksponat" ? "Fotografija predmeta (opciono)" : "Fotografija (opciono)"}
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white transition hover:bg-bakar-700 disabled:opacity-60"
      >
        {pending ? "Slanje…" : "Pošalji predlog"}
      </button>
    </form>
  );
}
