import "server-only";
import fs from "node:fs";
import path from "node:path";
import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  author: string;
  category: string;
  coverImage: string | null;
  coverAlt: string;
  readingMinutes: number;
};

function minutes(text: string) {
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const entries = await reader.collections.posts.all();
  const posts = await Promise.all(
    entries.map(async ({ slug, entry }) => {
      let text = "";
      try {
        text = fs.readFileSync(path.join(process.cwd(), "content/blog", `${slug}.mdoc`), "utf8");
      } catch {}
      return {
        slug,
        title: entry.title,
        description: entry.description,
        date: entry.date || "",
        updated: entry.updated || null,
        author: entry.author || "MHEC Admissions Team",
        category: entry.category,
        coverImage: entry.coverImage || null,
        coverAlt: entry.coverAlt || "",
        readingMinutes: minutes(text.replace(/^---[\s\S]*?---/, "")),
      };
    })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;
  const { node } = await entry.content();
  const errors = Markdoc.validate(node);
  if (errors.length) console.error("Markdoc errors in", slug, errors);
  const renderable = Markdoc.transform(node);
  const meta = (await getAllPosts()).find((p) => p.slug === slug)!;
  return {
    ...meta,
    keyTakeaways: entry.keyTakeaways.filter(Boolean),
    faqs: entry.faqs.filter((f) => f.q && f.a),
    renderable,
  };
}

export function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
