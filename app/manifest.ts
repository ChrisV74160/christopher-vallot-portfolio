import type { MetadataRoute } from "next";

import icon from "./icon.png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christopher Vallot — Consultant Data & BI Freelance",
    short_name: "Data & BI",
    description:
      "Intégration et fiabilisation des données, automatisation de traitements, Data Quality, Python, SQL et Power BI.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003f5c",
    lang: "fr",
    icons: [
      {
        src: icon.src,
        sizes: `${icon.width}x${icon.height}`,
        type: "image/png",
      },
    ],
  };
}
