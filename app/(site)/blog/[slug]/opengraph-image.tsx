import { ogImage, ogSize } from "@/lib/og";
import { getAllPosts } from "@/lib/blog";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "MHEC blog article";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getAllPosts()).find((p) => p.slug === slug);
  return ogImage({ kicker: post?.category || "MHEC Blog", title: post?.title || "Guides for students in Oman" });
}
