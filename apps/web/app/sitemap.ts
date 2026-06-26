import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSveVestiSlugove, getSviSlugovi } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticne = [
    "",
    "/o-projektu",
    "/program",
    "/proizvodjaci",
    "/vesti",
    "/partneri",
    "/kontakt",
    "/prijava",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const [slugovi, vesti] = await Promise.all([
    getSviSlugovi(),
    getSveVestiSlugove(),
  ]);

  const proizvodjaci = slugovi.map((s) => ({
    url: `${SITE_URL}/proizvodjaci/${s}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const vestiUrls = vesti.map((s) => ({
    url: `${SITE_URL}/vesti/${s}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticne, ...proizvodjaci, ...vestiUrls];
}
