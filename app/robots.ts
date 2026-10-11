import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // AI search crawlers (GPTBot, PerplexityBot, Google-Extended, ClaudeBot…) are allowed so MHEC can be cited in AI answers.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/keystatic"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
