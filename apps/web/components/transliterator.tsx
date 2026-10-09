"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Srpska latinica → ćirilica (digrafi prvo). */
const DI: [string, string][] = [
  ["DŽ", "Џ"], ["Dž", "Џ"], ["dž", "џ"],
  ["LJ", "Љ"], ["Lj", "Љ"], ["lj", "љ"],
  ["NJ", "Њ"], ["Nj", "Њ"], ["nj", "њ"],
];
const SG: Record<string, string> = {
  A: "А", a: "а", B: "Б", b: "б", V: "В", v: "в", G: "Г", g: "г", D: "Д", d: "д",
  Đ: "Ђ", đ: "ђ", E: "Е", e: "е", Ž: "Ж", ž: "ж", Z: "З", z: "з", I: "И", i: "и",
  J: "Ј", j: "ј", K: "К", k: "к", L: "Л", l: "л", M: "М", m: "м", N: "Н", n: "н",
  O: "О", o: "о", P: "П", p: "п", R: "Р", r: "р", S: "С", s: "с", T: "Т", t: "т",
  Ć: "Ћ", ć: "ћ", U: "У", u: "у", F: "Ф", f: "ф", H: "Х", h: "х", C: "Ц", c: "ц",
  Č: "Ч", č: "ч", Š: "Ш", š: "ш",
};

function lat2cir(str: string): string {
  let s = str;
  for (const [a, b] of DI) s = s.split(a).join(b);
  let out = "";
  for (const ch of s) out += SG[ch] ?? ch;
  return out;
}

/* Strani nazivi/brendovi koji ostaju latinicom (match po celoj reči, bez obzira na velika/mala slova). */
const FOREIGN = new Set([
  "usa", "ratings", "rb", "global", "press", "kit",
  "wine", "vision", "expo", "summit",
]);

/* Transliteriše reč po reč — strane reči (FOREIGN) ostavlja latinicom. */
function smartCir(str: string): string {
  return str.replace(/[A-Za-zČĆŽŠĐčćžšđ]+/g, (w) =>
    FOREIGN.has(w.toLowerCase()) ? w : lat2cir(w),
  );
}

const SKIP = new Set([
  "SCRIPT", "STYLE", "CODE", "PRE", "KBD", "SAMP", "TEXTAREA", "SELECT", "NOSCRIPT",
]);

function skipEl(el: Element | null): boolean {
  let e = el;
  while (e) {
    if (SKIP.has(e.tagName)) return true;
    if ((e as HTMLElement).dataset && (e as HTMLElement).dataset.noCyr !== undefined) return true;
    if (e.getAttribute && e.getAttribute("lang") === "en") return true;
    e = e.parentElement;
  }
  return false;
}

function convText(t: Text) {
  const v = t.nodeValue;
  if (!v || v.trim() === "") return;
  // Preskoči URL-ove i mejlove da se ne pokvare.
  if (v.indexOf("://") >= 0 || v.indexOf("@") >= 0 || v.indexOf("www.") >= 0) return;
  if (skipEl(t.parentElement)) return;
  const c = smartCir(v);
  if (c !== v) t.nodeValue = c;
}

function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    convText(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = tw.nextNode())) nodes.push(n as Text);
  for (const t of nodes) convText(t);
  // Placeholder tekst u formama.
  (root as Element).querySelectorAll?.("input[placeholder],textarea[placeholder]").forEach((el) => {
    if (skipEl(el.parentElement)) return;
    const p = el.getAttribute("placeholder");
    if (p) {
      const c = smartCir(p);
      if (c !== p) el.setAttribute("placeholder", c);
    }
  });
}

export function Transliterator({ active }: { active: boolean }) {
  const path = usePathname();
  useEffect(() => {
    if (!active) return;
    walk(document.body);
    const obs = new MutationObserver((muts) => {
      obs.disconnect();
      for (const m of muts) {
        if (m.type === "childList") {
          m.addedNodes.forEach((nd) => walk(nd));
        } else if (m.type === "characterData") {
          if (m.target.nodeType === Node.TEXT_NODE) convText(m.target as Text);
        }
      }
      obs.observe(document.body, { subtree: true, childList: true, characterData: true });
    });
    obs.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => obs.disconnect();
  }, [active, path]);
  return null;
}
