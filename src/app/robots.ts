import type { MetadataRoute } from "next";
import { personal } from "@/data/portfolio";

// Creates /robots.txt: tells search engines (Google, Bing...) what they may crawl,
// and where my sitemap is.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // all search engines
      allow: "/", // may visit every page
    },
    sitemap: `${personal.siteUrl}/sitemap.xml`,
  };
}
