"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Proizvodjac } from "@/lib/types";

const VELICINA_LABEL: Record<string, string> = {
  mala: "Mala destilerija",
  srednja: "Srednja destilerija",
  velika: "Velika destilerija",
};

export function Direktorijum({ proizvodjaci }: { proizvodjaci: Proizvodjac[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [velicina, setVelicina] = useState("");

  const regioni = useMemo(
    () =>
      [...new Set(proizvodjaci.map((p) => p.region).filter(Boolean))].sort() as string[],
    [proizvodjaci],
  );

  const filtrirani = useMemo(() => {
    const tekst = q.trim().toLowerCase();
    return proizvodjaci.filter((p) => {
      if (region && p.region !== region) return false;
      if (velicina && p.velicina !== velicina) return false;
      if (tekst) {
        const haystack = [p.naziv, p.porodica, p.selo, p.grad, p.region]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(tekst)) return false;
      }
      return true;
    });
  }, [proizvodjaci, q, region, velicina]);

  const inputCls =
    "rounded-lg border border-sljiva-200 px-3 py-2 text-sm outline-none focus:border-bakar-500";

  return (
    <div>
      {/* Filteri */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pretraži destileriju, porodicu, mesto…"
          className={`${inputCls} min-w-[240px] flex-1`}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={inputCls}>
          <option value="">Sve regije</option>
          {regioni.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select value={velicina} onChange={(e) => setVelicina(e.target.value)} className={inputCls}>
          <option value="">Sve veličine</option>
          <option value="mala">Mala</option>
          <option value="srednja">Srednja</option>
          <option value="velika">Velika</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-sljiva-500">
        Prikazano {filtrirani.length} od {proizvodjaci.length} proizvođača.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtrirani.map((p) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-xl font-bold text-sljiva-900">
                  {p.naziv}
                </h2>
                {p.istaknut && (
                  <span className="rounded-full bg-sljiva-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-bakar-200">
                    istaknuto
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-sljiva-500">
                {[p.porodica && `Porodica ${p.porodica}`, p.selo || p.grad, p.region]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.godina_osnivanja && (
                  <span className="rounded-full bg-bakar-100 px-3 py-1 text-xs font-semibold text-bakar-700">
                    od {p.godina_osnivanja}.
                  </span>
                )}
                {p.generacija && (
                  <span className="rounded-full bg-sljiva-100 px-3 py-1 text-xs font-semibold text-sljiva-700">
                    {p.generacija}. generacija
                  </span>
                )}
                {p.velicina && (
                  <span className="rounded-full bg-sljiva-100 px-3 py-1 text-xs font-semibold text-sljiva-700">
                    {VELICINA_LABEL[p.velicina]}
                  </span>
                )}
              </div>
              {p.prica && (
                <p className="mt-4 line-clamp-4 text-sm text-sljiva-600">{p.prica}</p>
              )}
              {p.slug && (
                <span className="mt-4 text-sm font-semibold text-bakar-700 group-hover:underline">
                  Pogledaj profil →
                </span>
              )}
            </>
          );

          return p.slug ? (
            <Link
              key={p.id}
              href={`/proizvodjaci/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm transition hover:border-bakar-300 hover:shadow-md"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={p.id}
              className="flex flex-col rounded-2xl border border-sljiva-200 bg-white p-6 shadow-sm"
            >
              {inner}
            </div>
          );
        })}
      </div>

      {filtrirani.length === 0 && (
        <p className="mt-10 rounded-xl border border-sljiva-200 bg-white px-5 py-8 text-center text-sljiva-500">
          Nema rezultata za zadate filtere.
        </p>
      )}
    </div>
  );
}
