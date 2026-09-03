import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christopher Vallot — Consultant Data & BI Freelance",
    short_name: "Data & BI",
    description:
      "Intégration et fiabilisation des données, automatisation de traitements, Data Quality, Python, SQL et Power BI.",
    start_url: "/",
    display: "standalone",
    background_color: "#020812",
    theme_color: "#020812",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
