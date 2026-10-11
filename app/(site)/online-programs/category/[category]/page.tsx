import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProgramExplorer from "@/components/ProgramExplorer";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { courses, courseCategories, categorySlug, categoryIntro, type CourseCategory } from "@/lib/programs";
import { courseListSchema } from "@/lib/schema";
import type { PhotoKey } from "@/lib/media";

type Props = { params: Promise<{ category: string }> };

const photo: Record<CourseCategory, PhotoKey> = {
  AI: "skills",
  "Accounting & Finance": "workshop",
  "Business & Data Analytics": "online",
  "Digital Marketing & Design": "skills",
  "Exam Preparation": "library",
  "Languages & Communication": "mentoring",
  "Kids Programme": "mentoring",
  "Soft Skills & Leadership": "training",
  Management: "training",
  "BIM & CAD": "online",
};

const find = (slug: string) => courseCategories.find((c) => categorySlug(c) === slug);

export function generateStaticParams() {
  return courseCategories.map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = find(category);
  if (!cat) return {};
  const n = courses.filter((c) => c.category === cat).length;
  return {
    title: `${cat} Courses Online in Oman`,
    description: `${n} ${cat} programmes taught online through MHEC. ${categoryIntro[cat]}`,
    alternates: { canonical: `/online-programs/category/${category}` },
    openGraph: { title: `${cat} online | MHEC Muscat`, url: `/online-programs/category/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = find(category);
  if (!cat) notFound();
  const list = courses.filter((c) => c.category === cat);
  const others = courseCategories.filter((c) => c !== cat);

  return (
    <>
      <JsonLd data={courseListSchema(list.map((c) => ({ name: c.title, path: `/online-programs/${c.slug}`, description: c.summary })))} />
      <PageHero
        image={photo[cat]}
        title={`${cat} programmes`}
        intro={categoryIntro[cat]}
        crumbs={[
          { name: "Online Programmes", path: "/online-programs" },
          { name: cat, path: `/online-programs/category/${category}` },
        ]}
      >
        <a href="#list" className="btn btn-primary">See {list.length} programmes</a>
        <a href="#inquiry" className="btn btn-outline">Ask an advisor</a>
      </PageHero>

      <section id="list" className="scroll-mt-28 bg-mist/60 py-16">
        <div className="container-x">
          <ProgramExplorer category={cat} showFilters={false} showSearch={list.length > 8} />
        </div>
      </section>

      <section className="py-14">
        <div className="container-x">
          <h2 className="font-display text-2xl font-semibold">Other subject areas</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o}>
                <Link href={`/online-programs/category/${categorySlug(o)}`} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line hover:ring-sky">
                  {o} <span className="text-stone">{courses.filter((c) => c.category === o).length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-28 bg-mist py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">Ask about {cat} courses</h2>
            <p className="mt-4 text-lg text-stone">We&apos;ll send batch dates, timings and fees.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm section="online" title="Ask an advisor" />
          </div>
        </div>
      </section>
    </>
  );
}
