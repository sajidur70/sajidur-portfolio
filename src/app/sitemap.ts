import type { MetadataRoute } from "next";
import { personal } from "@/data/portfolio";

// Creates /sitemap.xml: a list of my site's pages for search engines.
// My portfolio is one page (sections like #about are parts of it, not pages),
// so the list has one URL. Add more objects here if I add pages later.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.siteUrl,
      changeFrequency: "monthly", // how often the page usually changes
      priority: 1, // most important page (scale 0.0 – 1.0)
    },
  ];
}
