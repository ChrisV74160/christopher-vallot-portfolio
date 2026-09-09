import { projects } from "@/data/projects";

/** Public pages and crawl priorities share a single registry with the proxy. */
export const pageRoutes = [
  { path: "/", changeFrequency: "monthly", priority: 1, indexable: true },
  { path: "/projets", changeFrequency: "monthly", priority: 0.9, indexable: true },
  { path: "/a-propos", changeFrequency: "yearly", priority: 0.7, indexable: true },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8, indexable: true },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3, indexable: false },
  { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.3, indexable: false },
  ...projects.map(({ slug }) => ({
    path: `/projets/${encodeURIComponent(slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    indexable: true,
  })),
] as const;

const pagePaths = new Set<string>(pageRoutes.map(({ path }) => path));

export function isKnownPagePath(path: string): boolean {
  return pagePaths.has(path);
}
