const DIJAKRITIK: Record<string, string> = {
  č: "c", ć: "c", š: "s", ž: "z", đ: "dj",
  Č: "c", Ć: "c", Š: "s", Ž: "z", Đ: "dj",
};

export function slugify(s: string): string {
  return s
    .split("")
    .map((c) => DIJAKRITIK[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
