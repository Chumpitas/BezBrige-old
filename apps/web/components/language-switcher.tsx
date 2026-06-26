"use client";

import type { Lang } from "@/lib/i18n";

export function LanguageSwitcher({ lang }: { lang: Lang }) {
  function set(next: Lang) {
    if (next === lang) return;
    document.cookie = `lang=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }
  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      <button
        onClick={() => set("sr")}
        className={lang === "sr" ? "text-bakar-700" : "text-sljiva-400 hover:text-sljiva-600"}
        aria-pressed={lang === "sr"}
      >
        SR
      </button>
      <span className="text-sljiva-300">/</span>
      <button
        onClick={() => set("en")}
        className={lang === "en" ? "text-bakar-700" : "text-sljiva-400 hover:text-sljiva-600"}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
