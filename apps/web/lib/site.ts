/** Bazni URL sajta — postavi NEXT_PUBLIC_SITE_URL u produkciji. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rakija.example"
).replace(/\/$/, "");

export const SITE_NAME = "Rakija – kulturno dobro Srbije";
