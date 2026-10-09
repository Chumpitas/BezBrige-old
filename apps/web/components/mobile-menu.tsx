"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Otvori meni"
        className="flex h-10 w-10 items-center justify-center rounded text-lan hover:bg-white/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-mastilo/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <nav className="absolute right-0 top-0 flex h-full w-72 max-w-[82%] flex-col overflow-y-auto bg-plava p-5 text-lan">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-serif text-lg font-extrabold text-lan">Rakija Srbije</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Zatvori meni"
                className="flex h-9 w-9 items-center justify-center rounded text-lan hover:bg-white/10"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col font-sc text-[15px] tracking-[0.04em]">
              {items.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-3 text-lan hover:bg-white/10"
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
