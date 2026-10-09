"use client";

import type { Lang } from "@/lib/i18n";

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  function set(next: Lang) {
    if (next === lang) return;
    document.cookie = `lang=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }
  const cell = "px-[9px] py-[2px] text-[14px] font-bold";
  return (
    <span className="inline-flex overflow-hidden rounded border border-plava-ivica font-sc">
      <button
        onClick={() => set("sr")}
        aria-pressed={lang === "sr"}
        className={lang === "sr" ? `${cell} bg-crvena text-krem` : `${cell} text-lan`}
      >
        SR
      </button>
      <button
        onClick={() => set("en")}
        aria-pressed={lang === "en"}
        className={lang === "en" ? `${cell} bg-crvena text-krem` : `${cell} text-lan`}
      >
        EN
      </button>
    </span>
  );
}
