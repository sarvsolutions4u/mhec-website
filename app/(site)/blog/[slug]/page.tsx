import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import InquiryForm from "@/components/InquiryForm";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      ...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.coverAlt }] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const more = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({ ...post, updated: post.updated || undefined }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <article>
        <header className="bg-mist">
          <div className="container-x py-14 md:py-20 max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-sm text-stone">
              <Link href="/blog" className="hover:underline underline-offset-4">Blog</Link>
              <span aria-hidden="true"> / </span>
              <span>{post.category}</span>
            </nav>
            <h1 className="mt-5 text-h1">{post.title}</h1>
            <p className="mt-5 text-lg text-stone max-w-[60ch]">{post.description}</p>
            <p className="mt-6 text-sm text-stone">
              {post.author}, <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  {" "}(updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>)
                </>
              )}
              , {post.readingMinutes} min read
            </p>
          </div>
        </header>

        {post.coverImage && (
          <div className="container-x max-w-4xl -mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.coverAlt} className="w-full rounded-panel" />
          </div>
        )}

        <div className="container-x max-w-4xl py-12">
          {post.keyTakeaways.length > 0 && (
            <aside className="mb-10 rounded-panel border-l-4 border-sky bg-mist/60 p-6" aria-labelledby="takeaways">
              <h2 id="takeaways" className="font-display text-xl font-semibold">Key takeaways</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {post.keyTakeaways.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </aside>
          )}
          <div className="prose-mhec">{Markdoc.renderers.react(post.renderable, React)}</div>
        </div>
      </article>

      {post.faqs.length > 0 && (
        <div className="border-t border-line">
          <Faq items={post.faqs} title="Frequently asked" />
        </div>
      )}

      <section className="bg-mist py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Have a question about your situation?</h2>
            <p className="mt-4 text-lg text-stone">Ask an MHEC advisor — free and without obligation.</p>
            {more.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-lg font-semibold">Read next</h3>
                <ul className="mt-3 space-y-2">
                  {more.map((p) => (
                    <li key={p.slug}><Link href={`/blog/${p.slug}`} className="link">{p.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
