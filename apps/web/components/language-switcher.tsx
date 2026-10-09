"use client";

import type { Lang, Pismo } from "@/lib/i18n";

const YEAR = 60 * 60 * 24 * 365;

export function LanguageSwitcher({ lang, pismo }: { lang: Lang; pismo: Pismo }) {
  function go(nextLang: Lang, nextPismo: Pismo) {
    document.cookie = `lang=${nextLang};path=/;max-age=${YEAR}`;
    document.cookie = `pismo=${nextPismo};path=/;max-age=${YEAR}`;
    window.location.reload();
  }
  const cell = "px-[9px] py-[2px] text-[14px] font-bold";
  const on = `${cell} bg-crvena text-krem`;
  const off = `${cell} text-lan`;
  const cirActive = lang === "sr" && pismo === "cir";
  const latActive = lang === "sr" && pismo === "lat";
  const enActive = lang === "en";
  return (
    <span
      data-no-cyr
      className="inline-flex overflow-hidden rounded border border-plava-ivica font-sc"
    >
      <button onClick={() => go("sr", "cir")} aria-pressed={cirActive} className={cirActive ? on : off}>
        Ћир
      </button>
      <button onClick={() => go("sr", "lat")} aria-pressed={latActive} className={latActive ? on : off}>
        Lat
      </button>
      <button onClick={() => go("en", pismo)} aria-pressed={enActive} className={enActive ? on : off}>
        EN
      </button>
    </span>
  );
}
