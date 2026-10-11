import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { sections, courses, pathways, courseCategories, categorySlug } from "@/lib/programs";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...sections.map((s) => ({ url: absoluteUrl(s.href), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...pathways.map((p) => ({ url: absoluteUrl(`/pathway-programs/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...courseCategories.map((c) => ({ url: absoluteUrl(`/online-programs/category/${categorySlug(c)}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...courses.map((c) => ({ url: absoluteUrl(`/online-programs/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.updated || p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
