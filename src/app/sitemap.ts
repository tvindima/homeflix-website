import type { MetadataRoute } from "next";
import { publicRoutes } from "@/content/site";
import { empreendimentos } from "@/content/empreendimentos";
import { getSiteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = route === "/" ? "weekly" : "monthly";

    return {
      url: `${base}${route}`,
      lastModified,
      changeFrequency,
      priority: route === "/" ? 1 : 0.7,
    };
  });

  const projectEntries: MetadataRoute.Sitemap = empreendimentos.map((project) => ({
    url: `${base}/empreendimentos/${project.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...projectEntries];
}
