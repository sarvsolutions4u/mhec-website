import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Guides to University, Pathways and Online Study in Oman",
  description:
    "Practical guides for students and professionals in Oman: choosing a university, open schooling, English tests, online learning and career skills.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "MHEC Blog", url: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        title="Guides for students in Oman"
        intro="Straight answers about universities, pathways, English tests and online study — written by our admissions team."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="py-16">
        <div className="container-x">
          {!lead ? (
            <p className="text-stone">The first articles are on their way. In the meantime, ask an advisor anything.</p>
          ) : (
            <>
              <Link href={`/blog/${lead.slug}`} className="group grid gap-6 rounded-panel bg-mist p-7 md:p-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="text-sm text-sky-deep font-semibold">{lead.category}</p>
                  <h2 className="mt-2 text-h2 group-hover:underline underline-offset-4">{lead.title}</h2>
                  <p className="mt-3 text-lg text-stone max-w-[60ch]">{lead.description}</p>
                </div>
                <p className="lg:col-span-4 lg:self-end lg:text-right text-stone">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  <br />
                  {lead.readingMinutes} min read
                </p>
              </Link>
              <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block border-t border-line pt-5">
                      <p className="text-sm text-sky-deep font-semibold">{p.category}</p>
                      <h2 className="mt-2 font-display text-xl font-semibold leading-snug group-hover:underline underline-offset-4">{p.title}</h2>
                      <p className="mt-2 text-stone text-[0.975rem]">{p.description}</p>
                      <p className="mt-3 text-sm text-stone">
                        <time dateTime={p.date}>{formatDate(p.date)}</time>, {p.readingMinutes} min read
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
