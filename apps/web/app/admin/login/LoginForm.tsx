"use client";

import { useActionState } from "react";
import { prijaviSe } from "./actions";

export function LoginForm({ od }: { od: string }) {
  const [greska, action, pending] = useActionState(prijaviSe, null);
  const inputCls =
    "mt-1 w-full rounded-lg border border-sljiva-200 px-3 py-2 outline-none focus:border-bakar-500";
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="od" value={od} />
      <label className="block text-sm">
        <span className="text-sljiva-600">Email</span>
        <input name="email" type="email" autoFocus required className={inputCls} />
      </label>
      <label className="block text-sm">
        <span className="text-sljiva-600">Lozinka</span>
        <input name="lozinka" type="password" required className={inputCls} />
      </label>
      {greska && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {greska}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-bakar-600 px-6 py-3 font-semibold text-white transition hover:bg-bakar-700 disabled:opacity-60"
      >
        {pending ? "Prijava…" : "Prijavi se"}
      </button>
    </form>
  );
}
