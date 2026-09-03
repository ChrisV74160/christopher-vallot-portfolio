import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-config";

const staticRoutes: Array<{
  path: string;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/projets", changeFrequency: "monthly", priority: 0.9 },
  { path: "/a-propos", changeFrequency: "yearly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const pages = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));

  const projectPages = projects.map(({ slug }) => ({
    url: `${baseUrl}/projets/${encodeURIComponent(slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...projectPages];
}
