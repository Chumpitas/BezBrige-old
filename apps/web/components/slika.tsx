"use client";

import { useState } from "react";

/**
 * <img> sa fallback-om: ako primarni izvor ne postoji (404), prebacuje na
 * fallback. Tako prave (lokalne) slike rade čim se dodaju, a do tada se vidi
 * mockup — bez „polomljenih" slika.
 */
export function Slika({
  src,
  fallback,
  alt,
  className,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [trenutni, setTrenutni] = useState(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={trenutni}
      alt={alt}
      className={className}
      onError={() => {
        if (trenutni !== fallback) setTrenutni(fallback);
      }}
    />
  );
}
